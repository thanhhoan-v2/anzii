"use client";

import { useUser } from "@stackframe/stack";
import { HeartIcon } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useDeckLike } from "@/hooks/use-decks";
import { toast } from "@/hooks/use-toast";
import type { DeckListItem } from "@/types";

interface LikeButtonProps {
	deck: DeckListItem;
	className?: string;
	showCount?: boolean;
}

export default function LikeButton({
	deck,
	className = "",
	showCount = true,
}: LikeButtonProps) {
	const user = useUser();
	const deckLikeMutation = useDeckLike();

	// Determine if the deck is liked by the current user
	const isLiked = useMemo(() => deck.likedByUser === true, [deck.likedByUser]);

	const handleLike = () => {
		if (!user?.id) {
			toast({
				title: "Sign in required",
				description: "Please sign in to like decks.",
			});
			return;
		}

		// Fire-and-forget mutation - no awaiting!
		deckLikeMutation.mutate(
			{ deckId: deck.id, userId: user.id },
			{
				onSuccess: (result) => {
					toast({
						title: result.liked ? "Liked!" : "Unliked!",
						description: result.liked
							? "Deck added to your favorites."
							: "Deck removed from your favorites.",
					});
				},
				onError: (error) => {
					console.error("Error toggling like:", error);
					toast({
						title: "Error",
						description: "Failed to toggle deck like.",
						variant: "destructive",
					});
				},
			}
		);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={handleLike}
			aria-label={isLiked ? "Unlike deck" : "Like deck"}
			className={`${isLiked ? "text-red-500 hover:text-red-600" : ""} ${className}`}
			data-testid="like-button"
		>
			<HeartIcon className={`${isLiked ? "fill-current" : ""}`} />
			{showCount && (deck.likeCount > 0 || isLiked) && (
				<span className="ml-1 flex items-center gap-1">{deck.likeCount}</span>
			)}
		</Button>
	);
}
