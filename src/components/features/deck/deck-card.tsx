import { useUser } from "@stackframe/stack";
import { HeartIcon, Share2Icon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
import { toggleDeckLike } from "@/lib/actions";
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
	const [isLiked, setIsLiked] = useState(false);
	const [isLikeLoading, setIsLikeLoading] = useState(false);
	const [localLikeCount, setLocalLikeCount] = useState(deck.likeCount);
	const user = useUser();

	// Initialize like state based on current like count
	useEffect(() => {
		setIsLiked(deck.likeCount > 0);
		setLocalLikeCount(deck.likeCount);
	}, [deck.likeCount]);

	const handleLike = async () => {
		if (isLikeLoading) return;

		setIsLikeLoading(true);
		try {
			const result = await toggleDeckLike(deck.id, user?.id ?? "");

			if (result.success && result.liked !== undefined) {
				setIsLiked(result.liked);
				// Update local like count immediately
				setLocalLikeCount(
					result.liked ? localLikeCount + 1 : localLikeCount - 1
				);

				if (toast) {
					if (result.liked) {
						toast({
							title: "Liked!",
							description: "Deck added to your favorites.",
						});
					} else {
						toast({
							title: "Unliked!",
							description: "Deck removed from your favorites.",
						});
					}
				}
			} else {
				throw new Error(result.error || "Failed to toggle like");
			}
		} catch (error) {
			console.error("Error toggling like:", error);
			if (toast) {
				toast({
					title: "Error",
					description: "Failed to toggle deck like.",
				});
			}
		} finally {
			setIsLikeLoading(false);
		}
	};

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
					<Badge className="flex items-center gap-2">
						<UsersIcon className="size-4" />
						{deck.userCount} reviews
					</Badge>
				</div>
				{deck.description && (
					<CardDescription className="max-w-[800px]">
						{deck.description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleLike}
						disabled={isLikeLoading}
						aria-label="Like deck"
						className={isLiked ? "text-red-500 hover:text-red-600" : ""}
					>
						<HeartIcon
							className={`${
								isLikeLoading ? "animate-pulse" : ""
							} ${isLiked ? "fill-current" : ""}`}
						/>
						{(localLikeCount > 0 || isLiked) && (
							<span className="flex items-center gap-1">{localLikeCount}</span>
						)}
						<span className="sr-only">Like deck</span>
					</Button>
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
