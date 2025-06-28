import Flashcard from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Card as CardType, Deck, Rating } from "@/types";
import { ArrowLeft, Loader2 } from "lucide-react";

interface ReviewSessionProps {
	activeDeck: Deck;
	currentCard: CardType;
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
	return (
		<div className="flex flex-col items-center w-full h-full">
			<div className="mb-4 w-full max-w-2xl">
				<div className="flex justify-between items-center mb-2">
					<div className="flex items-center gap-2">
						<p className="text-muted-foreground text-sm">
							{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueueLength}`}
						</p>
						{(pendingReviewsCount > 0 || isProcessingReviews) && (
							<div className="flex items-center gap-1 text-muted-foreground text-xs">
								<Loader2 className="w-3 h-3 animate-spin" />
								<span>Syncing...</span>
							</div>
						)}
					</div>
					<Button variant="outline" size="sm" onClick={onEndSession}>
						<ArrowLeft className="mr-2 w-4 h-4" />
						Back to Decks
					</Button>
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
