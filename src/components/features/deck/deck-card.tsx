import { ExternalLinkIcon } from "lucide-react";

import { ButtonWithLink } from "@/components/ui/button";
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

import DeckDeleteBtn from "./deck-delete-dialog";

interface DeckCardProps {
	deck: DeckListItem;
	isResetting: boolean;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
}

export default function DeckCard({
	deck,
	isResetting,
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
				<DeckDeleteBtn
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
			<CardFooter className="flex justify-end">
				<ButtonWithLink className="w-[130px]" href={ROUTES.DECK(deck.id)}>
					View Deck <ExternalLinkIcon />
				</ButtonWithLink>
			</CardFooter>
		</ShadCard>
	);
}
