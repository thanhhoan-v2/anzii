'use server';

import { db } from '@/db';
import { cards, decks } from '@/db/schema';
import { eq, and, lte, sql, asc, count } from 'drizzle-orm';
import type { Rating, DeckListItem, Deck as DeckType, Card as CardType } from '@/types';
import { revalidatePath } from 'next/cache';
import { calculateNextReview } from '@/lib/srs';
import { generateCardsFromMarkdown } from '@/ai/flows/generate-cards-from-markdown';
import { generateDeckFromTopic } from '@/ai/flows/generate-deck-from-topic';
import { shuffle } from '@/lib/utils';
import { z } from 'zod';

type ActionResponse = {
  success: boolean;
  error?: string;
};

const convertCardTimestamps = (cardData: any): CardType => ({
  ...cardData,
  dueDate: cardData.dueDate.toISOString(),
  createdAt: cardData.createdAt?.toISOString(),
});

export async function getDecksWithCounts(): Promise<DeckListItem[]> {
  const cardCountSubquery = db.$with('card_count_sq').as(
    db.select({
      deckId: cards.deckId,
      count: sql<number>`count(${cards.id})`.as('count')
    }).from(cards).groupBy(cards.deckId)
  );

  const dueCountSubquery = db.$with('due_count_sq').as(
    db.select({
      deckId: cards.deckId,
      count: sql<number>`count(${cards.id})`.as('count')
    }).from(cards).where(lte(cards.dueDate, new Date())).groupBy(cards.deckId)
  );

  const result = await db.with(cardCountSubquery, dueCountSubquery).select({
    id: decks.id,
    name: decks.name,
    cardCount: sql<number>`coalesce(${cardCountSubquery.count}, 0)`.mapWith(Number),
    dueCount: sql<number>`coalesce(${dueCountSubquery.count}, 0)`.mapWith(Number),
  })
    .from(decks)
    .leftJoin(cardCountSubquery, eq(decks.id, cardCountSubquery.deckId))
    .leftJoin(dueCountSubquery, eq(decks.id, dueCountSubquery.deckId))
    .orderBy(asc(decks.createdAt));

  return result;
}

export async function getDeck(deckId: string): Promise<DeckType | null> {
  const deckData = await db.query.decks.findFirst({
    where: eq(decks.id, deckId),
    with: {
      cards: {
        orderBy: asc(cards.createdAt),
      },
    },
  });

  if (!deckData) {
    return null;
  }
  
  return {
    ...deckData,
    createdAt: deckData.createdAt.toISOString(),
    cards: deckData.cards.map(convertCardTimestamps),
  };
}

export async function createDeckFromMarkdown(data: { topic: string; markdown: string }): Promise<ActionResponse> {
  try {
    const aiResult = await generateCardsFromMarkdown(data);
    if (!aiResult.cards || aiResult.cards.length === 0) {
      return { success: false, error: "The AI could not generate any cards from the provided text." };
    }

    await db.transaction(async (tx) => {
      const [newDeck] = await tx.insert(decks).values({ name: data.topic }).returning();
      
      if (aiResult.cards.length > 0) {
        const shuffledCards = shuffle(aiResult.cards);
        await tx.insert(cards).values(
          shuffledCards.map(card => ({
            deckId: newDeck.id,
            question: card.question,
            answer: card.answer,
          }))
        );
      }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('permission denied') || error.message.includes('API_KEY_INVALID'))) {
      return { success: false, error: "AI configuration error. Please ensure your GEMINI_API_KEY or GOOGLE_API_KEY is set correctly in your .env file and is valid." };
    }
    return { success: false, error: "Failed to create deck from Markdown. The AI may have returned an unexpected response." };
  }
}

const ImportCardSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  answer: z.string(),
  interval: z.number().optional(),
  easeFactor: z.number().optional(),
  dueDate: z.string().datetime().optional(),
});

const ImportDeckSchema = z.object({
  name: z.string().min(1),
  cards: z.array(ImportCardSchema),
});

export async function createDeckFromImport(data: unknown): Promise<ActionResponse> {
  const validation = ImportDeckSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid deck format." };
  }
  
  const { name, cards: importedCards } = validation.data;
  
  try {
    await db.transaction(async (tx) => {
      const [newDeck] = await tx.insert(decks).values({ name }).returning();

      if (importedCards.length > 0) {
        await tx.insert(cards).values(
          importedCards.map(card => ({
            deckId: newDeck.id,
            question: card.question,
            answer: card.answer,
            interval: card.interval ?? 0,
            easeFactor: card.easeFactor ?? 2.5,
            dueDate: card.dueDate ? new Date(card.dueDate) : new Date(),
          }))
        );
      }
    });
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not save imported deck to database." };
  }
}

export async function deleteDeck(deckId: string): Promise<ActionResponse> {
  try {
    await db.delete(decks).where(eq(decks.id, deckId));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete deck." };
  }
}

export async function reviewCard({ cardId, deckId, rating }: { cardId: string, deckId: string, rating: Rating }): Promise<ActionResponse> {
  try {
    const cardData = await db.query.cards.findFirst({
      where: eq(cards.id, cardId),
    });

    if (!cardData) {
      return { success: false, error: "Card not found." };
    }

    const card: CardType = {
        ...cardData,
        dueDate: cardData.dueDate.toISOString(),
        createdAt: cardData.createdAt.toISOString()
    };
    
    const updatedCard = calculateNextReview(card, rating);

    await db.update(cards).set({
      easeFactor: updatedCard.easeFactor,
      interval: updatedCard.interval,
      dueDate: new Date(updatedCard.dueDate),
    }).where(eq(cards.id, cardId));
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to review card." };
  }
}

export async function updateDeckName({ deckId, name }: { deckId: string, name: string }): Promise<ActionResponse> {
  try {
    await db.update(decks).set({ name }).where(eq(decks.id, deckId));
    revalidatePath('/');
    revalidatePath(`/deck/${deckId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update deck name." };
  }
}

export async function addCard({ deckId, question, answer }: { deckId: string, question: string, answer: string }): Promise<ActionResponse> {
  try {
    await db.insert(cards).values({
      deckId,
      question,
      answer,
    });
    revalidatePath(`/deck/${deckId}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add card." };
  }
}

export async function updateCard({ cardId, deckId, question, answer }: { cardId: string, deckId: string, question: string, answer: string }): Promise<ActionResponse> {
  try {
    await db.update(cards).set({ question, answer }).where(eq(cards.id, cardId));
    revalidatePath(`/deck/${deckId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update card." };
  }
}

export async function createDeckFromAi(data: { topic: string }): Promise<ActionResponse> {
  try {
    const aiResult = await generateDeckFromTopic(data);
    if (!aiResult.cards || aiResult.cards.length === 0) {
      return { success: false, error: "The AI could not generate any cards for the provided topic." };
    }
    
    await db.transaction(async (tx) => {
      const [newDeck] = await tx.insert(decks).values({ name: data.topic }).returning();
      if (aiResult.cards.length > 0) {
        const shuffledCards = shuffle(aiResult.cards);
        await tx.insert(cards).values(
          shuffledCards.map(card => ({
            deckId: newDeck.id,
            question: card.question,
            answer: card.answer,
          }))
        );
      }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('permission denied') || error.message.includes('API_KEY_INVALID'))) {
      return { success: false, error: "AI configuration error. Please ensure your GEMINI_API_KEY or GOOGLE_API_KEY is set correctly in your .env file and is valid." };
    }
    return { success: false, error: "Failed to create AI-generated deck. The AI may have returned an unexpected response." };
  }
}

export async function deleteCard({ cardId, deckId }: { cardId: string; deckId: string }): Promise<ActionResponse> {
  try {
    await db.delete(cards).where(eq(cards.id, cardId));
    revalidatePath(`/deck/${deckId}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete card." };
  }
}

export async function resetDeckProgress(deckId: string): Promise<ActionResponse> {
  try {
    await db.update(cards)
      .set({
        interval: 0,
        easeFactor: 2.5,
        dueDate: new Date(),
      })
      .where(eq(cards.deckId, deckId));
      
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to reset deck progress." };
  }
}
