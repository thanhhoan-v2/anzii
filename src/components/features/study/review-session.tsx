import Flashcard from "@/components/features/study/flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Card as CardType, Deck, Rating } from "@/types";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

interface ReviewSessionProps {
	activeDeck: Deck;
	currentCard: CardType | null;
	currentCardIndex: number;
	reviewQueueLength: number;
	progressValue: number;
	isFlipped: boolean;
	pendingReviewsCount: number;
	isProcessingReviews: boolean;
	onFlip: () => void;
	onRate: (rating: Rating) => void;
	onEndSession: () => void;
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
	onFlip,
	onRate,
	onEndSession,
}: ReviewSessionProps) {
	// Check if we're done with all cards
	const isSessionComplete =
		currentCard === null || currentCardIndex >= reviewQueueLength;
	const hasPendingSync = pendingReviewsCount > 0 || isProcessingReviews;

	// If session is complete, show syncing status or completion
	if (isSessionComplete) {
		return (
			<div className="flex flex-col justify-center items-center w-full h-full">
				<div className="space-y-6 text-center">
					{hasPendingSync ? (
						<div className="flex flex-col justify-center items-center gap-5 space-y-4 h-[70vh]">
							<div className="flex flex-col items-center space-y-4">
								<Loader2 className="w-12 h-12 text-primary animate-spin" />
								<div className="space-y-2">
									<h2 className="font-semibold text-2xl">
										Syncing Progress...
									</h2>
									<p className="text-muted-foreground">
										Saving your review progress ({pendingReviewsCount} pending)
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-col justify-center items-center gap-5 space-y-4 h-[70vh]">
							<div className="flex flex-col items-center space-y-4">
								<CheckCircle className="w-12 h-12 text-success" />
								<div className="space-y-2 text-center">
									<h2 className="font-semibold text-2xl">Session Complete</h2>
									<p className="text-muted-foreground">
										You've completed all{" "}
										<span className="font-bold">{reviewQueueLength} cards</span>{" "}
										in <span className="font-bold">{activeDeck.name}</span>
									</p>
								</div>
							</div>
							<Button onClick={onEndSession} size="lg" className="mt-4">
								<ArrowLeft className="mr-2 w-4 h-4" />
								Back to your decks
							</Button>
						</div>
					)}
				</div>
			</div>
		);
	}

	// Normal review interface
	return (
		<div className="flex flex-col items-center w-full h-full">
			<div className="mb-4 w-full max-w-2xl">
				<div className="flex justify-between items-center mb-2">
					<div className="flex items-center gap-2">
						<p className="text-muted-foreground text-sm">
							{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueueLength}`}
						</p>
						{hasPendingSync && (
							<div className="flex items-center gap-1 text-muted-foreground text-xs">
								<Loader2 className="w-3 h-3 animate-spin" />
								<span>Syncing...</span>
							</div>
						)}
					</div>
				</div>
				<Progress value={progressValue} className="mt-1 w-full h-2" />
			</div>
			<Flashcard card={currentCard} isFlipped={isFlipped} onFlip={onFlip} />
			<div className="flex justify-center gap-4 mt-6 w-full">
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
							className="bg-warning hover:bg-warning/90 w-28 text-warning-foreground"
						>
							Medium
						</Button>
						<Button
							onClick={() => onRate("easy")}
							className="bg-success hover:bg-success/90 w-28 text-success-foreground"
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
		</div>
	);
}
