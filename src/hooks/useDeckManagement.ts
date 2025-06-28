import { useToast } from "@/hooks/use-toast";
import {
    deleteDeck,
    getDecksWithCounts,
    resetDeckProgress,
} from "@/lib/actions";
import type { DeckListItem } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface UseDeckManagementReturn {
    decks: DeckListItem[];
    isLoading: boolean;
    fetchDecks: (showLoading?: boolean) => Promise<void>;
    handleDeleteDeck: (deckId: string) => Promise<void>;
    handleResetDeck: (deckId: string) => Promise<void>;
    refreshDecks: () => Promise<void>;
}

export function useDeckManagement(): UseDeckManagementReturn {
    const [decks, setDecks] = useState<DeckListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchDecks = useCallback(
        async (showLoading = true) => {
            if (showLoading) {
                setIsLoading(true);
            }
            try {
                const fetchedDecks = await getDecksWithCounts();
                setDecks(fetchedDecks);
            } catch (error) {
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
        [toast],
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
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error,
                });
            }
        },
        [toast, fetchDecks],
    );

    const handleResetDeck = useCallback(
        async (deckId: string) => {
            const result = await resetDeckProgress(deckId);
            if (result.success) {
                toast({
                    title: "Deck Reset",
                    description: "All cards are now due for review.",
                });
                await fetchDecks();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error || "Failed to reset deck.",
                });
            }
        },
        [toast, fetchDecks],
    );

    const refreshDecks = useCallback(async () => {
        await fetchDecks(false);
    }, [fetchDecks]);

    return {
        decks,
        isLoading,
        fetchDecks,
        handleDeleteDeck,
        handleResetDeck,
        refreshDecks,
    };
}
