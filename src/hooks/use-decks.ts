"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import {
	createDeck,
	createDeckFromAi,
	createDeckFromImport,
	createDeckFromMarkdown,
	deleteDeck,
	getDeck,
	getDecksWithCounts,
	getUserLikedDecks,
	resetDeckProgress,
	updateDeckName,
} from "@/lib/actions";
import { queryKeys } from "@/lib/query-keys";
import type { Deck, DeckListItem } from "@/types";

export function useDecks(userId?: string) {
	return useQuery({
		queryKey: ["decks", userId],
		queryFn: async (): Promise<DeckListItem[]> => {
			return await getDecksWithCounts(userId);
		},
		staleTime: 5 * 60 * 1000, // 5 minutes - decks don't change very often
		gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
	});
}

export function useUserLikedDecks(userId?: string) {
	return useQuery({
		queryKey: ["user-liked-decks", userId],
		queryFn: async (): Promise<string[]> => {
			if (!userId) return [];
			return await getUserLikedDecks(userId);
		},
		enabled: !!userId,
		staleTime: 5 * 60 * 1000, // 5 minutes - user likes don't change often
	});
}

export function useDeck(deckId: string | undefined) {
	return useQuery({
		queryKey: queryKeys.deck(deckId || ""),
		queryFn: async (): Promise<Deck | null> => {
			if (!deckId) return null;
			return await getDeck(deckId);
		},
		enabled: !!deckId,
	});
}

export function useDeckLike() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			deckId,
			userId,
		}: {
			deckId: string;
			userId: string;
		}) => {
			// Use the API route instead of server action for better error handling
			const response = await fetch(`/api/decks/${deckId}/like`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || "Failed to toggle like");
			}

			const result = await response.json();
			return result;
		},
		onMutate: async ({
			deckId,
			userId,
		}: {
			deckId: string;
			userId: string;
		}) => {
			// Cancel any outgoing refetches to avoid race conditions
			const decksKey = ["decks", userId] as const;
			await queryClient.cancelQueries({ queryKey: decksKey });
			await queryClient.cancelQueries({ queryKey: queryKeys.deck(deckId) });

			// Snapshot the previous values for rollback
			const previousDecks = queryClient.getQueryData<DeckListItem[]>(decksKey);
			const previousDeck = queryClient.getQueryData<Deck>(
				queryKeys.deck(deckId)
			);

			// Optimistically update the decks list cache
			queryClient.setQueryData<DeckListItem[]>(decksKey, (oldDecks) => {
				if (!oldDecks) return oldDecks;
				return oldDecks.map((deck) => {
					if (deck.id !== deckId) return deck;
					const currentlyLiked = deck.likedByUser || false;
					return {
						...deck,
						likedByUser: !currentlyLiked,
						likeCount: deck.likeCount + (currentlyLiked ? -1 : 1),
					};
				});
			});

			// Optimistically update the individual deck cache
			queryClient.setQueryData<Deck>(queryKeys.deck(deckId), (oldDeck) => {
				if (!oldDeck) return oldDeck;
				// Note: Deck type doesn't include likeCount/likedByUser, so we skip this update
				// The deck list will be updated instead
				return oldDeck;
			});

			return { previousDecks, previousDeck, decksKey } as const;
		},
		onError: (err, { deckId }: { deckId: string; userId: string }, context) => {
			console.error("Like mutation failed:", err);

			// Rollback optimistic updates on error
			if (context?.previousDecks && context.decksKey) {
				queryClient.setQueryData(context.decksKey, context.previousDecks);
			}
			if (context?.previousDeck) {
				queryClient.setQueryData(queryKeys.deck(deckId), context.previousDeck);
			}
		},
		onSuccess: (
			data,
			{ deckId, userId }: { deckId: string; userId: string }
		) => {
			// Update cache with server response data
			const decksKey = ["decks", userId] as const;

			// Update the decks list cache with the confirmed server state
			queryClient.setQueryData<DeckListItem[]>(decksKey, (oldDecks) => {
				if (!oldDecks) return oldDecks;
				return oldDecks.map((deck) => {
					if (deck.id !== deckId) return deck;
					// Use the server response to determine the final state
					const newLikeCount = deck.likeCount + (data.liked ? 1 : -1);
					return {
						...deck,
						likedByUser: data.liked,
						likeCount: Math.max(0, newLikeCount), // Ensure count doesn't go negative
					};
				});
			});

			// Update the individual deck cache
			queryClient.setQueryData<Deck>(queryKeys.deck(deckId), (oldDeck) => {
				if (!oldDeck) return oldDeck;
				// Note: Deck type doesn't include likeCount/likedByUser, so we skip this update
				// The deck list will be updated instead
				return oldDeck;
			});
		},
		onSettled: (
			_data,
			_error,
			{ deckId, userId }: { deckId: string; userId: string }
		) => {
			// Only invalidate on error to rollback, not on success
			if (_error) {
				const decksKey = ["decks", userId] as const;
				queryClient.invalidateQueries({ queryKey: decksKey });
				queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			}
		},
	});
}

export function useCreateDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { name: string }) => {
			const result = await createDeck(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to create deck");
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Deck created successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}

export function useCreateDeckFromMarkdown() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { topic: string; markdown: string }) => {
			const result = await createDeckFromMarkdown(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to create deck from markdown");
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Deck created from markdown successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}

export function useCreateDeckFromAi() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			topic: string;
			numberOfCards?: number;
			description?: string;
		}) => {
			const result = await createDeckFromAi(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to create deck with AI");
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "AI-generated deck created successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}

export function useCreateDeckFromImport() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: unknown) => {
			const result = await createDeckFromImport(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to import deck");
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Deck imported successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}

export function useDeleteDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (deckId: string) => {
			const result = await deleteDeck(deckId);
			if (!result.success) {
				throw new Error(result.error || "Failed to delete deck");
			}
			return result;
		},
		onSuccess: (_, deckId) => {
			// Remove the deck from cache
			queryClient.removeQueries({ queryKey: queryKeys.deck(deckId) });
			// Invalidate the decks list
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Deck deleted successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}

export function useUpdateDeckName() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { deckId: string; name: string }) => {
			const result = await updateDeckName(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to update deck name");
			}
			return result;
		},
		onMutate: async ({ deckId, name }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: queryKeys.deck(deckId) });
			await queryClient.cancelQueries({ queryKey: queryKeys.decks });

			// Snapshot the previous values
			const previousDeck = queryClient.getQueryData<Deck>(
				queryKeys.deck(deckId)
			);
			const previousDecks = queryClient.getQueryData<DeckListItem[]>(
				queryKeys.decks
			);

			// Optimistically update the deck name in cache
			queryClient.setQueryData<Deck>(queryKeys.deck(deckId), (old) => {
				if (!old) return old;
				return { ...old, name };
			});

			// Optimistically update the deck name in the decks list
			queryClient.setQueryData<DeckListItem[]>(queryKeys.decks, (old) => {
				if (!old) return old;
				return old.map((deck) =>
					deck.id === deckId ? { ...deck, name } : deck
				);
			});

			return { previousDeck, previousDecks };
		},
		onError: (err, { deckId }, context) => {
			// Revert to previous state on error
			if (context?.previousDeck) {
				queryClient.setQueryData(queryKeys.deck(deckId), context.previousDeck);
			}
			if (context?.previousDecks) {
				queryClient.setQueryData(queryKeys.decks, context.previousDecks);
			}
			toast({
				title: "Error",
				description: err.message,
				variant: "destructive",
			});
		},
		onSuccess: () => {
			toast({
				title: "Success",
				description: "Deck name updated successfully",
			});
		},
		onSettled: (_, __, { deckId }) => {
			// Always refetch after error or success to ensure consistency
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
		},
	});
}

export function useResetDeckProgress() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (deckId: string) => {
			const result = await resetDeckProgress(deckId);
			if (!result.success) {
				throw new Error(result.error || "Failed to reset deck progress");
			}
			return result;
		},
		onSuccess: (_, deckId) => {
			// Invalidate both the specific deck and the decks list to reflect progress reset
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Deck progress reset successfully",
			});
		},
		onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
}
