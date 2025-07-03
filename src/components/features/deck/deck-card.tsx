import { Settings } from "lucide-react";

import { Button, ButtonWithLink } from "@/components/ui/button";
import {
	Card as ShadCard,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import type { DeckListItem } from "@/types";

import DeckDeleteDialog from "./deck-delete-dialog";
import DeckResetDialog from "./deck-reset-dialog";

interface DeckCardProps {
	deck: DeckListItem;
	isResetting: boolean;
	onStartReview: (deckId: string) => void;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
}

export default function DeckCard({
	deck,
	isResetting,
	onStartReview,
	onDeleteDeck,
	onResetDeck,
}: DeckCardProps) {
	return (
		<ShadCard className="flex flex-col transition-all">
			<div className="flex justify-between">
				<CardHeader>
					<CardTitle>{deck.name}</CardTitle>
					<CardDescription>{deck.cardCount} cards</CardDescription>
				</CardHeader>
				<DeckDeleteDialog
					deckId={deck.id}
					deckName={deck.name}
					onDeleteDeck={onDeleteDeck}
				/>
			</div>
			<CardContent className="flex-grow">
				<div
					className={`text-lg font-bold ${
						deck.dueCount > 0 ? "text-primary" : "text-muted-foreground"
					}`}
				>
					{deck.dueCount} due
				</div>
				<p className="text-sm text-muted-foreground">for review today</p>
			</CardContent>
			<CardFooter className="flex justify-between gap-2">
				<div className="flex gap-2">
					<ButtonWithLink href={ROUTES.DECK(deck.id)}>
						<Settings />
					</ButtonWithLink>
				</div>
				<div className="flex items-center gap-2">
					<DeckResetDialog
						deckId={deck.id}
						deckName={deck.name}
						cardCount={deck.cardCount}
						isResetting={isResetting}
						onResetDeck={onResetDeck}
					/>
					<Button
						onClick={() => onStartReview(deck.id)}
						disabled={deck.dueCount === 0}
					>
						Start
					</Button>
				</div>
			</CardFooter>
		</ShadCard>
	);
}
