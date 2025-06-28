'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore';
import type { Card as CardType, Rating, DeckListItem } from '@/types';
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

// Helper to convert Firestore Timestamps in cards to strings
const convertCardTimestamps = (cardData: any): CardType => {
  const data = cardData as any;
  return {
    ...data,
    dueDate: (data.dueDate as Timestamp)?.toDate().toISOString(),
    createdAt: (data.createdAt as Timestamp)?.toDate().toISOString(),
  } as CardType;
};

export async function getDecksWithCounts(): Promise<DeckListItem[]> {
  const decksCol = collection(db, 'decks');
  const decksQuery = query(decksCol, orderBy('createdAt', 'asc'));
  const deckSnapshot = await getDocs(decksQuery);
  
  const deckList: DeckListItem[] = [];

  for (const deckDoc of deckSnapshot.docs) {
    const deckData = deckDoc.data();
    const cardsCol = collection(db, 'decks', deckDoc.id, 'cards');
    
    // Get total card count
    const cardSnapshot = await getDocs(cardsCol);
    const cardCount = cardSnapshot.size;

    // Get due card count
    const dueQuery = query(cardsCol, where('dueDate', '<=', Timestamp.now()));
    const dueSnapshot = await getDocs(dueQuery);
    const dueCount = dueSnapshot.size;

    deckList.push({
      id: deckDoc.id,
      name: deckData.name,
      cardCount,
      dueCount,
    });
  }
  
  return deckList;
}

export async function getDeck(deckId: string) {
  const deckRef = doc(db, 'decks', deckId);
  const deckDoc = await getDoc(deckRef);

  if (!deckDoc.exists()) {
    return null;
  }

  const cardsCol = collection(db, 'decks', deckId, 'cards');
  const cardsQuery = query(cardsCol, orderBy('createdAt', 'asc'));
  const cardSnapshot = await getDocs(cardsQuery);

  const cards = cardSnapshot.docs.map(doc => convertCardTimestamps({ id: doc.id, ...doc.data() }));

  return {
    id: deckDoc.id,
    name: deckDoc.data().name,
    cards,
    createdAt: (deckDoc.data().createdAt as Timestamp)?.toDate().toISOString(),
  };
}

export async function createDeckFromMarkdown(data: { topic: string; markdown: string }): Promise<ActionResponse> {
  try {
    const aiResult = await generateCardsFromMarkdown(data);

    if (!aiResult.cards || aiResult.cards.length === 0) {
      return { success: false, error: "The AI could not generate any cards from the provided text." };
    }
    
    const newDeckRef = await addDoc(collection(db, 'decks'), {
        name: data.topic,
        createdAt: Timestamp.now(),
    });

    const shuffledCards = shuffle(aiResult.cards);
    
    // Firestore batch writes have a limit of 500 operations.
    const BATCH_SIZE = 499;
    for (let i = 0; i < shuffledCards.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = shuffledCards.slice(i, i + BATCH_SIZE);
        chunk.forEach(card => {
            const cardRef = doc(collection(db, 'decks', newDeckRef.id, 'cards'));
            batch.set(cardRef, {
                question: card.question,
                answer: card.answer,
                interval: 0,
                easeFactor: 2.5,
                dueDate: Timestamp.now(),
                createdAt: Timestamp.now(),
            });
        });
        await batch.commit();
    }

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
    const newDeckRef = await addDoc(collection(db, 'decks'), {
        name: name,
        createdAt: Timestamp.now(),
    });

    // Firestore batch writes have a limit of 500 operations.
    const BATCH_SIZE = 499;
    for (let i = 0; i < importedCards.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = importedCards.slice(i, i + BATCH_SIZE);
        chunk.forEach(card => {
            const cardRef = doc(collection(db, 'decks', newDeckRef.id, 'cards'));
            batch.set(cardRef, {
                question: card.question,
                answer: card.answer,
                interval: card.interval ?? 0,
                easeFactor: card.easeFactor ?? 2.5,
                dueDate: card.dueDate ? Timestamp.fromDate(new Date(card.dueDate)) : Timestamp.now(),
                createdAt: Timestamp.now(),
            });
        });
        await batch.commit();
    }
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not save imported deck to database." };
  }
}

export async function deleteDeck(deckId: string): Promise<ActionResponse> {
  try {
    const cardsCol = collection(db, 'decks', deckId, 'cards');
    const cardsSnapshot = await getDocs(cardsCol);
    
    // Firestore batch writes have a limit of 500 operations.
    const BATCH_SIZE = 499;
    const cardDocs = cardsSnapshot.docs;

    for (let i = 0; i < cardDocs.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = cardDocs.slice(i, i + BATCH_SIZE);
        chunk.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }

    const deckRef = doc(db, 'decks', deckId);
    await deleteDoc(deckRef);

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete deck." };
  }
}

export async function reviewCard({ cardId, deckId, rating }: { cardId: string, deckId: string, rating: Rating }): Promise<ActionResponse> {
  try {
    const cardRef = doc(db, 'decks', deckId, 'cards', cardId);
    const cardDoc = await getDoc(cardRef);
    if (!cardDoc.exists()) {
      return { success: false, error: "Card not found." };
    }

    const card = convertCardTimestamps({ id: cardDoc.id, ...cardDoc.data() });
    const updatedCard = calculateNextReview(card, rating);

    await updateDoc(cardRef, {
      easeFactor: updatedCard.easeFactor,
      interval: updatedCard.interval,
      dueDate: Timestamp.fromDate(new Date(updatedCard.dueDate)),
    });
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to review card." };
  }
}

export async function updateDeckName({ deckId, name }: { deckId: string, name: string }): Promise<ActionResponse> {
  try {
    const deckRef = doc(db, 'decks', deckId);
    await updateDoc(deckRef, { name });
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
    const cardsCol = collection(db, 'decks', deckId, 'cards');
    await addDoc(cardsCol, { 
      question, 
      answer,
      interval: 0,
      easeFactor: 2.5,
      dueDate: Timestamp.now(),
      createdAt: Timestamp.now(),
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
    const cardRef = doc(db, 'decks', deckId, 'cards', cardId);
    await updateDoc(cardRef, { question, answer });
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
    
    const newDeckRef = await addDoc(collection(db, 'decks'), {
        name: data.topic,
        createdAt: Timestamp.now(),
    });

    const shuffledCards = shuffle(aiResult.cards);
    
    // Firestore batch writes have a limit of 500 operations.
    const BATCH_SIZE = 499;
    for (let i = 0; i < shuffledCards.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = shuffledCards.slice(i, i + BATCH_SIZE);
        chunk.forEach(card => {
            const cardRef = doc(collection(db, 'decks', newDeckRef.id, 'cards'));
            batch.set(cardRef, {
                question: card.question,
                answer: card.answer,
                interval: 0,
                easeFactor: 2.5,
                dueDate: Timestamp.now(),
                createdAt: Timestamp.now(),
            });
        });
        await batch.commit();
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create AI-generated deck." };
  }
}

export async function deleteCard({ cardId, deckId }: { cardId: string; deckId: string }): Promise<ActionResponse> {
  try {
    const cardRef = doc(db, 'decks', deckId, 'cards', cardId);
    await deleteDoc(cardRef);
    revalidatePath(`/deck/${deckId}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete card." };
  }
}
