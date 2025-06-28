'use server';

import { db } from '@/lib/db';
import { decks, cards } from '@/lib/db/schema';
import type { Card as CardType, Rating, DeckListItem } from '@/types';
import { eq, lte, sql, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { calculateNextReview } from '@/lib/srs';
import { generateCardsFromMarkdown } from '@/ai/flows/generate-cards-from-markdown';
import { shuffle } from '@/lib/utils';
import { z } from 'zod';

type ActionResponse = {
  success: boolean;
  error?: string;
}

export async function getDecksWithCounts(): Promise<DeckListItem[]> {
  const today = new Date();
  const deckList = await db.select({
    id: decks.id,
    name: decks.name,
    cardCount: sql<number>`count(${cards.id})`.mapWith(Number),
    dueCount: sql<number>`count(CASE WHEN ${cards.dueDate} <= ${today} THEN 1 END)`.mapWith(Number),
  })
  .from(decks)
  .leftJoin(cards, eq(decks.id, cards.deckId))
  .groupBy(decks.id)
  .orderBy(decks.createdAt);
  
  return deckList;
}

export async function getDeck(deckId: string) {
  const deck = await db.query.decks.findFirst({
    where: eq(decks.id, deckId),
    with: {
      cards: {
        orderBy: (cards, { asc }) => [asc(cards.createdAt)],
      },
    },
  });

  if (!deck) return null;

  return {
    ...deck,
    cards: deck.cards.map(card => ({
      ...card,
      dueDate: card.dueDate.toISOString(),
    })),
  };
}

export async function createDeckFromMarkdown(data: { topic: string; markdown: string }): Promise<ActionResponse> {
  try {
    const aiResult = await generateCardsFromMarkdown(data);

    if (!aiResult.cards || aiResult.cards.length === 0) {
      return { success: false, error: "The AI could not generate any cards from the provided text." };
    }

    const shuffledCards = shuffle(aiResult.cards);

    await db.transaction(async (tx) => {
      const [newDeck] = await tx.insert(decks).values({ name: data.topic }).returning();
      if (shuffledCards.length > 0) {
        await tx.insert(cards).values(shuffledCards.map(card => ({
          deckId: newDeck.id,
          question: card.question,
          answer: card.answer,
        })));
      }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create deck from Markdown." };
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
        await tx.insert(cards).values(importedCards.map(card => ({
          deckId: newDeck.id,
          question: card.question,
          answer: card.answer,
          interval: card.interval,
          easeFactor: card.easeFactor,
          dueDate: card.dueDate ? new Date(card.dueDate) : new Date(),
        })));
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

export async function reviewCard({ cardId, rating }: { cardId: string, rating: Rating }): Promise<ActionResponse> {
  try {
    const card = await db.query.cards.findFirst({ where: eq(cards.id, cardId) });
    if (!card) {
      return { success: false, error: "Card not found." };
    }

    const updatedCard = calculateNextReview(
      { ...card, dueDate: card.dueDate.toISOString() }, 
      rating
    );

    await db.update(cards).set({
      easeFactor: updatedCard.easeFactor,
      interval: updatedCard.interval,
      dueDate: new Date(updatedCard.dueDate),
    }).where(eq(cards.id, cardId));
    
    // No revalidation needed here as it doesn't affect list views immediately
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
    await db.insert(cards).values({ deckId, question, answer });
    revalidatePath(`/deck/${deckId}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add card." };
  }
}

export async function updateCard({ cardId, question, answer }: { cardId: string, question: string, answer: string }): Promise<ActionResponse> {
  try {
    const card = await db.query.cards.findFirst({ where: eq(cards.id, cardId) });
    if (!card) return { success: false, error: "Card not found" };

    await db.update(cards).set({ question, answer }).where(eq(cards.id, cardId));
    revalidatePath(`/deck/${card.deckId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update card." };
  }
}

export async function deleteCard(cardId: string): Promise<ActionResponse> {
  try {
    const card = await db.query.cards.findFirst({ where: eq(cards.id, cardId) });
    if (!card) return { success: false, error: "Card not found" };

    await db.delete(cards).where(eq(cards.id, cardId));
    revalidatePath(`/deck/${card.deckId}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete card." };
  }
}