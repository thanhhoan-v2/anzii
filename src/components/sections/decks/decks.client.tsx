"use client";

import { useUser } from "@stackframe/stack";
import { useState } from "react";

import AiDeckGenerator from "@/components/features/ai/ai-deck-generator";
import DeckList from "@/components/features/deck/deck-list";
import AppHeader from "@/components/layout/app-header";
import WelcomeScreen from "@/components/sections/welcome-screen";
import { Input } from "@/components/ui/input";
import {
	useDecks,
	useDeleteDeck,
	useResetDeckProgress,
} from "@/hooks/use-decks";
import { useFileImport } from "@/hooks/use-file-import";
import { useToast } from "@/hooks/use-toast";

import DecksLoading from "./decks-loading";

export default function DecksClient() {
	const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
	const { toast } = useToast();
	const user = useUser({ or: "redirect" });
	const { data: decksData, isLoading: decksIsLoading } = useDecks(user?.id);
	const deleteDeckMutation = useDeleteDeck();
	const resetDeckProgressMutation = useResetDeckProgress();
	const fileImport = useFileImport(() => {
		// Refresh decks after import
		window.location.reload();
	});

	const handleDeckCreated = () => {
		setIsAiDeckGeneratorOpen(false);
		toast({
			title: "Deck Generated!",
			description: "Your new deck has been created.",
		});
	};

	const handleDeleteDeck = (deckId: string) => {
		if (!user?.id) return;
		// Fire-and-forget mutation - no awaiting!
		deleteDeckMutation.mutate(
			{ deckId, userId: user.id },
			{
				onSuccess: () => {
					toast({
						title: "Deck Deleted",
						description: "The deck has been removed.",
					});
				},
				onError: (error) => {
					console.error("Error deleting deck:", error);
					toast({
						title: "Error",
						description: "Failed to delete deck. Please try again.",
						variant: "destructive",
					});
				},
			}
		);
	};

	const handleResetDeck = (deckId: string) => {
		resetDeckProgressMutation.mutate(deckId, {
			onSuccess: () => {
				toast({
					title: "Deck Reset",
					description: "All cards are now due for review.",
				});
			},
			onError: (error) => {
				console.error("Error resetting deck:", error);
				toast({
					title: "Error",
					description: "Failed to reset deck. Please try again.",
					variant: "destructive",
				});
			},
		});
	};

	if (decksIsLoading) {
		return <DecksLoading />;
	}

	if (!user) {
		return <h1>You can only see this if you are logged in</h1>;
	}

	return (
		<div className="bg-background min-h-screen font-sans text-foreground">
			<AppHeader />

			<main className="mx-auto p-4 md:p-8 container">
				{(decksData?.length || 0) === 0 ? (
					<WelcomeScreen
						onImport={fileImport.handleImportClick}
						onAiCreate={() => setIsAiDeckGeneratorOpen(true)}
					/>
				) : (
					<DeckList
						decks={decksData || []}
						resetLoadingDeckId={
							resetDeckProgressMutation.isPending ? "pending" : null
						}
						onDeleteDeck={handleDeleteDeck}
						onResetDeck={handleResetDeck}
						isDeletePending={deleteDeckMutation.isPending}
					/>
				)}
			</main>

			<Input
				type="file"
				ref={fileImport.fileInputRef}
				onChange={fileImport.handleFileChange}
				accept=".json"
				className="hidden"
			/>

			{/* AI Deck Generator Modal */}
			<AiDeckGenerator
				isOpen={isAiDeckGeneratorOpen}
				onOpenChange={setIsAiDeckGeneratorOpen}
				onSuccess={handleDeckCreated}
			/>
		</div>
	);
}
