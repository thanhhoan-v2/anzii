import { useUser } from "@stackframe/stack";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import {
	deleteDeck,
	getDecksWithCounts,
	resetDeckProgress,
} from "@/lib/actions";
import { queryKeys } from "@/lib/query-keys";
import type { DeckListItem } from "@/types";

interface UseDeckManagementReturn {
	decks: DeckListItem[];
	isLoading: boolean;
	resetLoadingDeckId: string | null;
	fetchDecks: (showLoading?: boolean) => Promise<void>;
	handleDeleteDeck: (deckId: string) => Promise<void>;
	handleResetDeck: (deckId: string) => Promise<void>;
	refreshDecks: () => Promise<void>;
}

export function useDeckManagement(): UseDeckManagementReturn {
	const user = useUser();
	const queryClient = useQueryClient();
	const [decks, setDecks] = useState<DeckListItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [resetLoadingDeckId, setResetLoadingDeckId] = useState<string | null>(
		null
	);
	const { toast } = useToast();

	const fetchDecks = useCallback(
		async (showLoading = true) => {
			if (showLoading) {
				setIsLoading(true);
			}
			try {
				const fetchedDecks = await getDecksWithCounts(user?.id);
				setDecks(fetchedDecks);
			} catch {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Could not fetch decks.",
				});
			} finally {
				if (showLoading) {
					setIsLoading(false);
				}
			}
		},
		[toast, user?.id]
	);

	// Initial load
	useEffect(() => {
		fetchDecks();
	}, [fetchDecks]);

	const handleDeleteDeck = useCallback(
		async (deckId: string) => {
			const result = await deleteDeck(deckId);
			if (result.success) {
				toast({
					title: "Deck Deleted",
					description: "The deck has been removed.",
				});
				await fetchDecks();
				// Ensure React Query deck lists refetch for all users/filters
				queryClient.invalidateQueries({ queryKey: queryKeys.decks });
			} else {
				toast({
					variant: "destructive",
					title: "Error",
					description: result.error,
				});
			}
		},
		[toast, fetchDecks, queryClient]
	);

	const handleResetDeck = useCallback(
		async (deckId: string) => {
			setResetLoadingDeckId(deckId);

			try {
				const result = await resetDeckProgress(deckId);
				if (result.success) {
					toast({
						title: "Deck Reset",
						description: "All cards are now due for review.",
					});
					await fetchDecks();
					queryClient.invalidateQueries({ queryKey: queryKeys.decks });
				} else {
					toast({
						variant: "destructive",
						title: "Error",
						description: result.error || "Failed to reset deck.",
					});
				}
			} finally {
				setResetLoadingDeckId(null);
			}
		},
		[toast, fetchDecks, queryClient]
	);

	const refreshDecks = useCallback(async () => {
		await fetchDecks(false);
	}, [fetchDecks]);

	return {
		decks,
		isLoading,
		resetLoadingDeckId,
		fetchDecks,
		handleDeleteDeck,
		handleResetDeck,
		refreshDecks,
	};
}
