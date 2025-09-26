"use client";
import { UsersIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ButtonWithLink } from "@/components/ui/button";
import {
	Card as ShadCard,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUpdateDeckName } from "@/hooks/use-decks";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";
import type { DeckListItem } from "@/types";

import CardTypeBadges from "./card-type-badges";
import DeckActionsBtn from "./deck-actions-btn";
import LikeButton from "./like-button";

interface DeckCardProps {
	deck: DeckListItem;
	isResetting: boolean;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
	isDeletePending?: boolean;
}

export default function DeckCard({
	deck,
	isResetting,
	onDeleteDeck,
	onResetDeck,
	isDeletePending = false,
}: DeckCardProps) {
	const [copied, setCopied] = useState(false);
	const updateDeckNameMutation = useUpdateDeckName();

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

	const handleRenameDeck = async (newName: string) => {
		try {
			await updateDeckNameMutation.mutateAsync({
				deckId: deck.id,
				name: newName,
			});
		} catch {
			// Error handling is done in the mutation
		}
	};

	return (
		<ShadCard className="flex flex-col transition-all" data-testid="deck-card">
			<CardHeader className="gap-2">
				<CardTitle className="flex justify-between items-center w-full">
					<div>{deck.name}</div>
					<DeckActionsBtn
						deckId={deck.id}
						deckName={deck.name}
						onDeleteDeck={onDeleteDeck}
						onRenameDeck={handleRenameDeck}
						isRenamePending={updateDeckNameMutation.isPending}
						isDeletePending={isDeletePending}
					/>
				</CardTitle>
				<div className="flex flex-wrap items-center gap-2">
					<Badge className="w-fit">{deck.cardCount} cards</Badge>
					<CardTypeBadges
						flashcardCount={deck.flashcardCount}
						mcqCount={deck.mcqCount}
						fillInBlanksCount={deck.fillInBlanksCount}
					/>
					<Badge className="flex items-center gap-2">
						<UsersIcon className="size-4" />
						{deck.userCount} reviews
					</Badge>
					{deck.userDisplayName && (
						<Badge
							variant="secondary"
							className="flex items-center gap-1 text-xs"
						>
							👤 {deck.userDisplayName}
						</Badge>
					)}
				</div>
				{deck.description && (
					<CardDescription className="max-w-[800px]">
						{deck.description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-2">
					<LikeButton deck={deck} />
				</div>
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
