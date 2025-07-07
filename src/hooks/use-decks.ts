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
	resetDeckProgress,
	updateDeckName,
} from "@/lib/actions";
import { queryKeys } from "@/lib/query-keys";
import type { Deck, DeckListItem } from "@/types";

export function useDecks() {
	return useQuery({
		queryKey: queryKeys.decks,
		queryFn: async (): Promise<DeckListItem[]> => {
			return await getDecksWithCounts();
		},
		staleTime: 30 * 1000, // 30 seconds - decks don't change very often
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
		mutationFn: async (data: { topic: string }) => {
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
