"use client";

import DeckCard from "@/components/features/deck/deck-card";
import type { DeckListItem } from "@/types";

interface ExploreDecksProps {
	decks: DeckListItem[];
}

export default function ExploreDecks({ decks }: ExploreDecksProps) {
	// No-op handlers since this is just for viewing decks
	const handleDeleteDeck = () => {};
	const handleResetDeck = () => {};

	return (
		<div className="justify-center items-stretch gap-6 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			{decks.map((deck) => (
				<DeckCard
					key={deck.id}
					deck={deck}
					isResetting={false}
					onDeleteDeck={handleDeleteDeck}
					onResetDeck={handleResetDeck}
					isDeletePending={false}
				/>
			))}
		</div>
	);
}
