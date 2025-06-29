"use client";

import AiDeckGenerator from "@/components/AiDeckGenerator";
import AppHeader from "@/components/AppHeader";
import DeckList from "@/components/DeckList";
import ReviewSession from "@/components/ReviewSession";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useToast } from "@/hooks/use-toast";
import { useDeckManagement } from "@/hooks/useDeckManagement";
import { useFileImport } from "@/hooks/useFileImport";
import { useReviewSession } from "@/hooks/useReviewSession";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
	const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
	const { toast } = useToast();

	// Custom hooks
	const deckManagement = useDeckManagement();
	const reviewSession = useReviewSession();
	const fileImport = useFileImport(() => deckManagement.fetchDecks());

	// Connect review session completion to deck refresh
	useEffect(() => {
		reviewSession.setOnSessionComplete(() => {
			deckManagement.refreshDecks();
		});
	}, [reviewSession.setOnSessionComplete, deckManagement.refreshDecks]);

	const handleDeckCreated = () => {
		setIsAiDeckGeneratorOpen(false);
		toast({
			title: "Deck Generated!",
			description: "Your new deck has been created.",
		});
		deckManagement.fetchDecks();
	};

	if (deckManagement.isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="w-8 h-8 animate-spin" />
				<p className="ml-4">Loading decks...</p>
			</div>
		);
	}

	return (
		<div className="bg-background min-h-screen font-sans text-foreground">
			<AppHeader />

			<main className="mx-auto p-4 md:p-8 container">
				{reviewSession.sessionInProgress && reviewSession.activeDeck ? (
					<ReviewSession
						activeDeck={reviewSession.activeDeck}
						currentCard={reviewSession.currentCard}
						currentCardIndex={reviewSession.currentCardIndex}
						reviewQueueLength={reviewSession.reviewQueue.length}
						progressValue={reviewSession.progressValue}
						isFlipped={reviewSession.isFlipped}
						pendingReviewsCount={reviewSession.pendingReviews.length}
						isProcessingReviews={reviewSession.isProcessingReviews}
						onFlip={reviewSession.handleFlip}
						onRate={reviewSession.handleRate}
						onEndSession={reviewSession.handleEndSession}
					/>
				) : deckManagement.decks.length === 0 ? (
					<WelcomeScreen
						onImport={fileImport.handleImportClick}
						onAiCreate={() => setIsAiDeckGeneratorOpen(true)}
					/>
				) : (
					<DeckList
						decks={deckManagement.decks}
						resetLoadingDeckId={deckManagement.resetLoadingDeckId}
						onStartReview={reviewSession.startReviewSession}
						onDeleteDeck={deckManagement.handleDeleteDeck}
						onResetDeck={deckManagement.handleResetDeck}
					/>
				)}
			</main>

			{/* Hidden file input for imports */}
			<input
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
