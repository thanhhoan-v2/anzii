import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonWithLink } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Card as ShadCard,
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
					{deck.description && (
						<CardDescription className="line-clamp-2">
							{deck.description}
						</CardDescription>
					)}
				</CardHeader>
				<DeckDeleteBtn
					deckId={deck.id}
					deckName={deck.name}
					onDeleteDeck={onDeleteDeck}
				/>
			</div>
			<CardContent className="flex items-baseline justify-between gap-2">
				<Badge className="text-md">{deck.cardCount} cards</Badge>
				<ButtonWithLink className="w-[130px]" href={ROUTES.DECK(deck.id)}>
					View Deck <ExternalLinkIcon />
				</ButtonWithLink>
			</CardContent>
		</ShadCard>
	);
}
