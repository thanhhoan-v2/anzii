"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { addCard, deleteCard, reviewCard, updateCard } from "@/lib/actions";
import { queryKeys } from "@/lib/query-keys";
import type { Rating } from "@/types";

// Mutation hooks for card operations
export function useAddCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			deckId: string;
			question: string;
			answer: string;
		}) => {
			const result = await addCard(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to add card");
			}
			return result;
		},
		onSuccess: (_, { deckId }) => {
			// Invalidate the specific deck to refresh card list
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			// Also invalidate decks list to update card counts
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Card added successfully",
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

export function useUpdateCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			cardId: string;
			deckId: string;
			question: string;
			answer: string;
		}) => {
			const result = await updateCard(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to update card");
			}
			return result;
		},
		onSuccess: (_, { deckId }) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			toast({
				title: "Success",
				description: "Card updated successfully",
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

export function useDeleteCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { cardId: string; deckId: string }) => {
			const result = await deleteCard(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to delete card");
			}
			return result;
		},
		onSuccess: (_, { deckId }) => {
			// Invalidate the specific deck to refresh card list
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			// Also invalidate decks list to update card counts
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			toast({
				title: "Success",
				description: "Card deleted successfully",
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

export function useReviewCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			cardId: string;
			deckId: string;
			rating: Rating;
		}) => {
			const result = await reviewCard(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to review card");
			}
			return result;
		},
		onSuccess: (_, { deckId }) => {
			// Invalidate the specific deck to refresh due dates and progress
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			// Also invalidate decks list to update due counts
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			// Note: We don't show toast for reviews as they happen frequently
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

// Optimistic update variant for better UX during reviews
export function useReviewCardOptimistic() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			cardId: string;
			deckId: string;
			rating: Rating;
		}) => {
			const result = await reviewCard(data);
			if (!result.success) {
				throw new Error(result.error || "Failed to review card");
			}
			return result;
		},
		onMutate: async ({ deckId }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: queryKeys.deck(deckId) });
			await queryClient.cancelQueries({ queryKey: queryKeys.decks });

			// Snapshot the previous values
			const previousDeck = queryClient.getQueryData(queryKeys.deck(deckId));
			const previousDecks = queryClient.getQueryData(queryKeys.decks);

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
		onSettled: (_, __, { deckId }) => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.decks });
		},
	});
}
