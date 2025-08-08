import type { DeckListItem } from "@/types";

import DeckCard from "./deck-card";

interface DeckListProps {
	decks: DeckListItem[];
	resetLoadingDeckId?: string | null;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
	isDeletePending?: boolean;
}

export default function DeckList({
	decks,
	resetLoadingDeckId,
	onDeleteDeck,
	onResetDeck,
	isDeletePending = false,
}: DeckListProps) {
	return (
		// <div className="justify-center items-center gap-6 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
		<div className="flex flex-col gap-6">
			{decks.map((deck) => {
				const isResetting = resetLoadingDeckId === deck.id;

				return (
					<DeckCard
						key={deck.id}
						deck={deck}
						isResetting={isResetting}
						onDeleteDeck={onDeleteDeck}
						onResetDeck={onResetDeck}
						isDeletePending={isDeletePending}
					/>
				);
			})}
		</div>
	);
}
