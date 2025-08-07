import { Share2Icon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonWithLink } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Card as ShadCard,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";
import type { DeckListItem } from "@/types";

import CardTypeBadges from "./card-type-badges";
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
	const [copied, setCopied] = useState(false);

	const handleCopyUrl = async () => {
		const url = `${window.location.origin}${ROUTES.DECK(deck.id)}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			if (toast) {
				toast({
					title: "Copied!",
					description: "Deck URL copied to clipboard.",
				});
			}
			setTimeout(() => setCopied(false), 1500);
		} catch {
			if (toast) {
				toast({ title: "Error", description: "Failed to copy URL." });
			}
		}
	};

	return (
		// <ShadCard className="flex flex-col mx-auto max-w-[450px] lg:max-w-[450px] transition-all">
		<ShadCard className="flex flex-col transition-all">
			<CardHeader className="gap-2">
				<CardTitle className="flex w-full items-center justify-between">
					<div>{deck.name}</div>
					<DeckDeleteBtn
						deckId={deck.id}
						deckName={deck.name}
						onDeleteDeck={onDeleteDeck}
					/>
				</CardTitle>
				<div className="flex flex-wrap items-center gap-2">
					<Badge className="w-fit">{deck.cardCount} cards</Badge>
					<CardTypeBadges
						flashcardCount={deck.flashcardCount}
						mcqCount={deck.mcqCount}
						fillInBlanksCount={deck.fillInBlanksCount}
					/>
				</div>
				{deck.description && (
					<CardDescription className="max-w-[800px]">
						{deck.description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-2">
				<Button
					variant="ghost"
					size="icon"
					className=""
					onClick={handleCopyUrl}
					aria-label="Copy deck URL"
				>
					<Share2Icon />
					<span className="sr-only">Copy deck URL</span>
				</Button>
				<ButtonWithLink
					className="w-[100px] text-sm"
					href={ROUTES.DECK(deck.id)}
				>
					View Deck
				</ButtonWithLink>
			</CardContent>
		</ShadCard>
	);
}
