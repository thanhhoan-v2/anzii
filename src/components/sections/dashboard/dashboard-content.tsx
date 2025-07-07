"use client";

import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";

import AiDeckGenerator from "@/components/features/ai/ai-deck-generator";
import DeckList from "@/components/features/deck/deck-list";
import ReviewSession from "@/components/features/study/review-session";
import AppHeader from "@/components/layout/app-header";
import WelcomeScreen from "@/components/sections/welcome-screen";
import { Input } from "@/components/ui/input";
import { useDeckManagement } from "@/hooks/use-deck-management";
import { useFileImport } from "@/hooks/use-file-import";
import { useReviewSession } from "@/hooks/use-review-session";
import { useToast } from "@/hooks/use-toast";

import DashboardLoading from "./dashboard-loading";

export default function DashboardContent() {
	const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
	const { toast } = useToast();
	const user = useUser({ or: "redirect" });
	const deckManagement = useDeckManagement();
	const reviewSession = useReviewSession();
	const fileImport = useFileImport(() => deckManagement.fetchDecks());

	useEffect(() => {
		reviewSession.setOnSessionComplete(() => {
			deckManagement.refreshDecks();
		});
	}, [reviewSession, deckManagement]);

	const handleDeckCreated = () => {
		setIsAiDeckGeneratorOpen(false);
		toast({
			title: "Deck Generated!",
			description: "Your new deck has been created.",
		});
		deckManagement.fetchDecks();
	};

	if (deckManagement.isLoading) {
		return <DashboardLoading />;
	}

	if (!user) {
		return <h1>You can only see this if you are logged in</h1>;
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
