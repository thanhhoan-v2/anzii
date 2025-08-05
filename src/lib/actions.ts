"use server";

import { asc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { generateCardsFromMarkdown } from "@/ai/flows/generate-cards-from-markdown";
import { generateDeckDescription } from "@/ai/flows/generate-deck-description";
import { generateDeckFromTopic } from "@/ai/flows/generate-deck-from-topic";
import { summarizeTopic } from "@/ai/flows/summarize-topic";
import { getDb } from "@/db";
import { cards, decks } from "@/db/schema";
import { calculateNextReview } from "@/lib/srs";
import { shuffle } from "@/lib/utils";
import type {
	Card as CardType,
	DeckListItem,
	Deck as DeckType,
	Rating,
} from "@/types";

import { ROUTES } from "./routes";

type ActionResponse = {
	success: boolean;
	error?: string;
	deckId?: string;
};

// Type for raw card data from database (with Date objects)
type RawCardData = Omit<CardType, "dueDate" | "createdAt"> & {
	dueDate: Date;
	createdAt?: Date;
};

const convertCardTimestamps = (cardData: RawCardData): CardType => ({
	...cardData,
	dueDate: cardData.dueDate.toISOString(),
	createdAt: cardData.createdAt?.toISOString(),
});

export async function getDecksWithCounts(): Promise<DeckListItem[]> {
	const db = getDb();
	const cardCountSubquery = db.$with("card_count_sq").as(
		db
			.select({
				deckId: cards.deckId,
				cardCount: sql<number>`count(${cards.id})`.as("card_count"),
			})
			.from(cards)
			.groupBy(cards.deckId)
	);

	const result = await db
		.with(cardCountSubquery)
		.select({
			id: decks.id,
			name: decks.name,
			description: decks.description,
			cardCount:
				sql<number>`coalesce(${cardCountSubquery.cardCount}, 0)`.mapWith(
					Number
				),
		})
		.from(decks)
		.leftJoin(cardCountSubquery, eq(decks.id, cardCountSubquery.deckId))
		.orderBy(asc(decks.createdAt));

	return result.map((deck) => ({
		...deck,
		description: deck.description || undefined,
	}));
}

export async function getDeck(deckId: string): Promise<DeckType | null> {
	const db = getDb();
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
		description: deckData.description || undefined,
		createdAt: deckData.createdAt.toISOString(),
		cards: deckData.cards.map(convertCardTimestamps),
	};
}

export async function createDeckFromMarkdown(data: {
	topic: string;
	markdown: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		const aiResult = await generateCardsFromMarkdown(data);
		if (!aiResult.cards || aiResult.cards.length === 0) {
			return {
				success: false,
				error: "The AI could not generate any cards from the provided text.",
			};
		}

		// Create deck first
		const [newDeck] = await db
			.insert(decks)
			.values({ name: data.topic })
			.returning();

		// Then add cards if any exist
		if (aiResult.cards.length > 0) {
			const shuffledCards = shuffle(aiResult.cards);
			await db.insert(cards).values(
				shuffledCards.map((card) => ({
					deckId: newDeck.id,
					question: card.question,
					answer: card.answer,
				}))
			);
		}

		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		if (
			error instanceof Error &&
			(error.message.includes("API key not valid") ||
				error.message.includes("permission denied") ||
				error.message.includes("API_KEY_INVALID"))
		) {
			return {
				success: false,
				error:
					"AI configuration error. Please ensure your GEMINI_API_KEY or GOOGLE_API_KEY is set correctly in your .env file and is valid.",
			};
		}
		return {
			success: false,
			error:
				"Failed to create deck from Markdown. The AI may have returned an unexpected response.",
		};
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

export async function createDeckFromImport(
	data: unknown
): Promise<ActionResponse> {
	const db = getDb();
	const validation = ImportDeckSchema.safeParse(data);
	if (!validation.success) {
		return { success: false, error: "Invalid deck format." };
	}

	const { name, cards: importedCards } = validation.data;

	try {
		// Create deck first
		const [newDeck] = await db.insert(decks).values({ name }).returning();

		// Then add cards if any exist
		if (importedCards.length > 0) {
			await db.insert(cards).values(
				importedCards.map((card) => ({
					deckId: newDeck.id,
					question: card.question,
					answer: card.answer,
					interval: card.interval ?? 0,
					easeFactor: card.easeFactor ?? 2.5,
					dueDate: card.dueDate ? new Date(card.dueDate) : new Date(),
				}))
			);
		}

		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Could not save imported deck to database.",
		};
	}
}

export async function deleteDeck(deckId: string): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db.delete(decks).where(eq(decks.id, deckId));
		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to delete deck." };
	}
}

export async function reviewCard({
	cardId,
	deckId: _deckId,
	rating,
}: {
	cardId: string;
	deckId: string;
	rating: Rating;
}): Promise<ActionResponse> {
	const db = getDb();
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
			createdAt: cardData.createdAt.toISOString(),
		};

		const updatedCard = calculateNextReview(card, rating);

		await db
			.update(cards)
			.set({
				easeFactor: updatedCard.easeFactor,
				interval: updatedCard.interval,
				dueDate: new Date(updatedCard.dueDate),
			})
			.where(eq(cards.id, cardId));

		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to review card." };
	}
}

export async function updateDeckName({
	deckId,
	name,
}: {
	deckId: string;
	name: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db.update(decks).set({ name }).where(eq(decks.id, deckId));
		revalidatePath(ROUTES.HOME);
		revalidatePath(ROUTES.DECK(deckId));
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to update deck name." };
	}
}

export async function addCard({
	deckId,
	question,
	answer,
}: {
	deckId: string;
	question: string;
	answer: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db.insert(cards).values({
			deckId,
			question,
			answer,
		});
		revalidatePath(ROUTES.DECK(deckId));
		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to add card." };
	}
}

export async function updateCard({
	cardId,
	deckId,
	question,
	answer,
}: {
	cardId: string;
	deckId: string;
	question: string;
	answer: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db
			.update(cards)
			.set({ question, answer })
			.where(eq(cards.id, cardId));
		revalidatePath(ROUTES.DECK(deckId));
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to update card." };
	}
}

export async function createDeckFromAi(data: {
	topic: string;
	numberOfCards?: number;
	description?: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		// Generate AI-summarized deck name (max 5 words)
		const summaryResult = await summarizeTopic({ topic: data.topic });
		const deckName = summaryResult.summary;

		// Generate AI description for the deck
		const descriptionResult = await generateDeckDescription({
			topic: data.topic,
		});
		const deckDescription = descriptionResult.description;

		const aiResult = await generateDeckFromTopic(data);
		if (!aiResult.cards || aiResult.cards.length === 0) {
			return {
				success: false,
				error: "The AI could not generate any cards for the provided topic.",
			};
		}

		// Create deck with summarized name and description
		const [newDeck] = await db
			.insert(decks)
			.values({
				name: deckName,
				description: deckDescription,
			})
			.returning();

		// Then add cards if any exist
		if (aiResult.cards.length > 0) {
			const shuffledCards = shuffle(aiResult.cards);
			await db.insert(cards).values(
				shuffledCards.map((card) => ({
					deckId: newDeck.id,
					question: card.question,
					answer: card.answer,
				}))
			);
		}

		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		if (
			error instanceof Error &&
			(error.message.includes("API key not valid") ||
				error.message.includes("permission denied") ||
				error.message.includes("API_KEY_INVALID"))
		) {
			return {
				success: false,
				error:
					"AI configuration error. Please ensure your GEMINI_API_KEY or GOOGLE_API_KEY is set correctly in your .env file and is valid.",
			};
		}
		return {
			success: false,
			error:
				"Failed to create AI-generated deck. The AI may have returned an unexpected response.",
		};
	}
}

export async function deleteCard({
	cardId,
	deckId,
}: {
	cardId: string;
	deckId: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db.delete(cards).where(eq(cards.id, cardId));
		revalidatePath(ROUTES.DECK(deckId));
		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to delete card." };
	}
}

export async function resetDeckProgress(
	deckId: string
): Promise<ActionResponse> {
	const db = getDb();
	try {
		await db
			.update(cards)
			.set({
				interval: 0,
				easeFactor: 2.5,
				dueDate: new Date(),
			})
			.where(eq(cards.deckId, deckId));

		revalidatePath(ROUTES.HOME);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to reset deck progress." };
	}
}

export async function createDeck(data: {
	name: string;
}): Promise<ActionResponse> {
	const db = getDb();
	try {
		const [newDeck] = await db
			.insert(decks)
			.values({ name: data.name })
			.returning();

		revalidatePath(ROUTES.HOME);
		return { success: true, deckId: newDeck.id };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to create deck." };
	}
}
