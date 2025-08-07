import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

import Flashcard from "@/components/features/study/Flashcard";
import MCQCard from "@/components/features/study/mcq-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Card as CardType, Deck, Rating } from "@/types";

interface ReviewSessionProps {
	activeDeck: Deck;
	currentCard: CardType | null;
	currentCardIndex: number;
	reviewQueueLength: number;
	progressValue: number;
	isFlipped: boolean;
	pendingReviewsCount: number;
	isProcessingReviews: boolean;
	mcqAnswersCount: number;
	onFlip: () => void;
	onRate: (rating: Rating) => void;
	onEndSession: () => void;
	onMCQAnswer: (cardId: string, rating: Rating) => void;
}

export default function ReviewSession({
	activeDeck,
	currentCard,
	currentCardIndex,
	reviewQueueLength,
	progressValue,
	isFlipped,
	pendingReviewsCount,
	isProcessingReviews,
	mcqAnswersCount,
	onFlip,
	onRate,
	onEndSession,
	onMCQAnswer,
}: ReviewSessionProps) {
	// Check if we're done with all cards
	const isSessionComplete =
		currentCard === null || currentCardIndex >= reviewQueueLength;
	const hasPendingSync = pendingReviewsCount > 0 || isProcessingReviews;

	// Handle MCQ answer submission
	const handleMCQAnswer = (selectedOptions: string[], isCorrect: boolean) => {
		// Convert MCQ result to rating for SRS algorithm
		let rating: Rating;
		if (isCorrect) {
			rating = "easy"; // Correct answer gets "easy" rating
		} else {
			rating = "hard"; // Incorrect answer gets "hard" rating
		}

		// Call the parent's onMCQAnswer handler
		if (currentCard) {
			onMCQAnswer(currentCard.id, rating);
		}
	};

	// If session is complete, show syncing status or completion
	if (isSessionComplete) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center">
				<div className="space-y-6 text-center">
					{hasPendingSync ? (
						<div className="flex h-[70vh] flex-col items-center justify-center gap-5 space-y-4">
							<div className="flex flex-col items-center space-y-4">
								<Loader2 className="h-12 w-12 animate-spin text-primary" />
								<div className="space-y-2">
									<h2 className="text-2xl font-semibold">
										Syncing Progress...
									</h2>
									<p className="text-muted-foreground">
										Saving your review progress ({pendingReviewsCount} pending)
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="flex h-[70vh] flex-col items-center justify-center gap-5 space-y-4">
							<div className="flex flex-col items-center space-y-4">
								<CheckCircle className="h-12 w-12 text-success" />
								<div className="space-y-2 text-center">
									<h2 className="text-2xl font-semibold">Session Complete</h2>
									<p className="text-muted-foreground">
										You&apos;ve completed all{" "}
										<span className="font-bold">{reviewQueueLength} cards</span>{" "}
										in <span className="font-bold">{activeDeck.name}</span>
									</p>
								</div>
							</div>
							<Button onClick={onEndSession} size="lg" className="mt-4">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to your decks
							</Button>
						</div>
					)}
				</div>
			</div>
		);
	}

	// Determine if current card is MCQ
	const isMCQ = currentCard?.cardType === "mcq";

	// Normal review interface
	return (
		<div className="flex h-full w-full flex-col items-center">
			<div className="mb-4 w-full max-w-2xl">
				<div className="mb-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<p className="text-sm text-muted-foreground">
							{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueueLength}`}
						</p>
						{(hasPendingSync || mcqAnswersCount > 0) && (
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<Loader2 className="h-3 w-3 animate-spin" />
								<span>
									{hasPendingSync
										? `Syncing... (${pendingReviewsCount} pending)`
										: `Stored ${mcqAnswersCount} MCQ answers`}
								</span>
							</div>
						)}
					</div>
				</div>
				<Progress value={progressValue} className="mt-1 h-2 w-full" />
			</div>

			{/* Render appropriate card component based on type */}
			{isMCQ ? (
				<MCQCard card={currentCard} onAnswer={handleMCQAnswer} />
			) : (
				<Flashcard card={currentCard} isFlipped={isFlipped} onFlip={onFlip} />
			)}

			{/* Show rating buttons only for non-MCQ cards */}
			{!isMCQ && (
				<div className="mt-6 flex w-full justify-center gap-4">
					{isFlipped ? (
						<>
							<Button
								onClick={() => onRate("hard")}
								variant="destructive"
								className="w-28"
							>
								Hard
							</Button>
							<Button
								onClick={() => onRate("medium")}
								className="w-28 bg-warning text-warning-foreground hover:bg-warning/90"
							>
								Medium
							</Button>
							<Button
								onClick={() => onRate("easy")}
								className="w-28 bg-success text-success-foreground hover:bg-success/90"
							>
								Easy
							</Button>
						</>
					) : (
						<Button onClick={onFlip} size="lg" className="w-48">
							Show Answer
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
