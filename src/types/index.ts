export interface Card {
	id: string;
	question: string;
	answer: string;
	cardType?: "flashcard" | "mcq" | "fillInBlanks";
	interval: number; // in days
	easeFactor: number; // multiplier for interval
	dueDate: string; // ISO date string
	createdAt?: string; // ISO date string
}

export interface Deck {
	id: string;
	name: string;
	description?: string;
	cards: Card[];
	createdAt?: string; // ISO date string
}

export interface DeckListItem {
	id: string;
	name: string;
	description?: string;
	cardCount: number;
	flashcardCount: number;
	mcqCount: number;
	fillInBlanksCount: number;
	likeCount: number;
	userCount: number;
}

export type Rating = "hard" | "medium" | "easy";
