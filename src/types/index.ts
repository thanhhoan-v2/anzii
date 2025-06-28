export interface Card {
	id: string;
	question: string;
	answer: string;
	interval: number; // in days
	easeFactor: number; // multiplier for interval
	dueDate: string; // ISO date string
	createdAt?: string; // ISO date string
}

export interface Deck {
	id: string;
	name: string;
	cards: Card[];
	createdAt?: string; // ISO date string
}

export interface DeckListItem {
	id: string;
	name: string;
	cardCount: number;
	dueCount: number;
}

export type Rating = "hard" | "medium" | "easy";
