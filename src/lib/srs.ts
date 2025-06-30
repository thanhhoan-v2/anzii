import { addDays, startOfToday } from "date-fns";

import type { Card, Rating } from "@/types";

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;

// New card intervals
const NEW_CARD_INTERVALS: Record<Rating, number> = {
	hard: 1,
	medium: 3,
	easy: 5,
};

export function calculateNextReview(card: Card, rating: Rating): Card {
	let newEaseFactor = card.easeFactor;
	let newInterval: number;
	const isNewCard = card.interval === 0;
	const today = startOfToday();

	if (isNewCard) {
		newEaseFactor = INITIAL_EASE_FACTOR;
		newInterval = NEW_CARD_INTERVALS[rating];
	} else {
		if (rating === "hard") {
			newEaseFactor = Math.max(MIN_EASE_FACTOR, card.easeFactor - 0.2);
			// Reset to a shorter interval, but not necessarily 1 day for a mature card
			newInterval = Math.ceil(card.interval / 1.5);
		} else if (rating === "medium") {
			// No change in ease factor
			newInterval = Math.ceil(card.interval * card.easeFactor);
		} else {
			// 'easy'
			newEaseFactor = card.easeFactor + 0.15;
			newInterval = Math.ceil(card.interval * card.easeFactor * 1.3);
		}
	}

	// Ensure interval is at least 1 day
	newInterval = Math.max(1, newInterval);

	const nextDueDate = addDays(today, newInterval);

	return {
		...card,
		easeFactor: newEaseFactor,
		interval: newInterval,
		dueDate: nextDueDate.toISOString(),
	};
}
