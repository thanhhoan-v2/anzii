import type { DeckListItem } from "@/types";

import DeckCard from "./deck-card";

interface DeckListProps {
	decks: DeckListItem[];
	resetLoadingDeckId?: string | null;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
}

export default function DeckList({
	decks,
	resetLoadingDeckId,
	onDeleteDeck,
	onResetDeck,
}: DeckListProps) {
	return (
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
					/>
				);
			})}
		</div>
	);
}
