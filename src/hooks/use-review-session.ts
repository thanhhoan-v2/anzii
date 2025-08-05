import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { getDeck, reviewCard } from "@/lib/actions";
import { shuffle } from "@/lib/utils";
import type { Card as CardType, Deck, Rating } from "@/types";

interface UseReviewSessionReturn {
	// Session state
	activeDeck: Deck | null;
	reviewQueue: CardType[];
	currentCardIndex: number;
	isFlipped: boolean;
	sessionInProgress: boolean;
	currentCard: CardType | null;
	progressValue: number;

	// Pending reviews state
	pendingReviews: Array<{ cardId: string; deckId: string; rating: Rating }>;
	isProcessingReviews: boolean;

	// Actions
	startReviewSession: (deckId: string) => Promise<void>;
	handleEndSession: () => void;
	handleFlip: () => void;
	handleRate: (rating: Rating) => void;

	// Callbacks for external updates
	onSessionComplete: () => void;
	setOnSessionComplete: (callback: () => void) => void;
}

export function useReviewSession(): UseReviewSessionReturn {
	const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
	const [reviewQueue, setReviewQueue] = useState<CardType[]>([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [sessionInProgress, setSessionInProgress] = useState(false);
	const [pendingReviews, setPendingReviews] = useState<
		Array<{ cardId: string; deckId: string; rating: Rating }>
	>([]);
	const [isProcessingReviews, setIsProcessingReviews] = useState(false);

	const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const onSessionCompleteRef = useRef<() => void>(() => {});
	const { toast } = useToast();

	const progressValue = useMemo(() => {
		if (reviewQueue.length === 0) return 0;
		return (currentCardIndex / reviewQueue.length) * 100;
	}, [currentCardIndex, reviewQueue.length]);

	const currentCard = sessionInProgress ? reviewQueue[currentCardIndex] : null;

	const startSession = useCallback((deck: Deck, cards: CardType[]) => {
		setActiveDeck(deck);
		setReviewQueue(shuffle(cards));
		setCurrentCardIndex(0);
		setIsFlipped(false);
		setSessionInProgress(true);
	}, []);

	const processPendingReviews = useCallback(async () => {
		if (pendingReviews.length === 0 || isProcessingReviews) return;

		setIsProcessingReviews(true);
		const reviewsToProcess = [...pendingReviews];
		setPendingReviews([]);

		try {
			// Process all pending reviews in parallel for better performance
			await Promise.all(
				reviewsToProcess.map(({ cardId, deckId, rating }) =>
					reviewCard({ cardId, deckId, rating })
				)
			);
			// Notify parent component to refresh data
			onSessionCompleteRef.current();
		} catch {
			// If processing fails, add them back to the queue and show error
			setPendingReviews((prev) => [...prev, ...reviewsToProcess]);
			toast({
				variant: "destructive",
				title: "Sync Error",
				description:
					"Failed to sync review progress. Will retry automatically.",
			});
		} finally {
			setIsProcessingReviews(false);
		}
	}, [pendingReviews, isProcessingReviews, toast]);

	// Auto-process pending reviews with debouncing
	useEffect(() => {
		if (pendingReviews.length === 0) return;

		// Clear existing timeout
		if (processingTimeoutRef.current) {
			clearTimeout(processingTimeoutRef.current);
		}

		// Process reviews after a short delay to allow for batching
		processingTimeoutRef.current = setTimeout(() => {
			processPendingReviews();
		}, 1000);

		return () => {
			if (processingTimeoutRef.current) {
				clearTimeout(processingTimeoutRef.current);
			}
		};
	}, [pendingReviews, processPendingReviews]);

	// Process remaining reviews when ending session
	useEffect(() => {
		if (!sessionInProgress && pendingReviews.length > 0) {
			processPendingReviews();
		}
	}, [sessionInProgress, pendingReviews, processPendingReviews]);

	const startReviewSession = useCallback(
		async (deckId: string) => {
			try {
				const deckToReview = await getDeck(deckId);
				if (!deckToReview) {
					toast({
						variant: "destructive",
						title: "Error",
						description: "Could not find deck.",
					});
					return;
				}

				const allCards = deckToReview.cards;

				if (allCards.length === 0) {
					toast({
						title: "No Cards Available",
						description: "This deck has no cards to review.",
					});
					return;
				}

				startSession(deckToReview as Deck, allCards);
			} catch {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Could not start review session.",
				});
			}
		},
		[toast, startSession]
	);

	const handleEndSession = useCallback(() => {
		setSessionInProgress(false);
		setActiveDeck(null);
		setReviewQueue([]);
		setCurrentCardIndex(0);
		// toast({
		//     title: "Session Paused",
		//     description: "You've returned to the dashboard.",
		// });
		onSessionCompleteRef.current();
	}, [toast]);

	const handleFlip = useCallback(() => {
		setIsFlipped(true);
	}, []);

	const handleRate = useCallback(
		(rating: Rating) => {
			if (!isFlipped || !activeDeck) return;

			const currentCard = reviewQueue[currentCardIndex];

			// Add review to pending queue for background processing
			setPendingReviews((prev) => [
				...prev,
				{
					cardId: currentCard.id,
					deckId: activeDeck.id,
					rating,
				},
			]);

			// Immediately update UI for better UX
			if (currentCardIndex + 1 < reviewQueue.length) {
				setCurrentCardIndex((prev) => prev + 1);
				setIsFlipped(false);
			} else {
				// Last card completed - don't end session automatically
				// Just move to the "session complete" state by advancing the index
				setCurrentCardIndex((prev) => prev + 1);
				setIsFlipped(false);
				toast({
					title: "Session Complete!",
					description: `You've reviewed ${reviewQueue.length} cards. Great job!`,
				});
				// Session remains active, user stays on completion screen
				// onSessionComplete will be called after pending reviews are processed
			}
		},
		[isFlipped, activeDeck, reviewQueue, currentCardIndex, toast]
	);

	const setOnSessionComplete = useCallback((callback: () => void) => {
		onSessionCompleteRef.current = callback;
	}, []);

	return {
		// Session state
		activeDeck,
		reviewQueue,
		currentCardIndex,
		isFlipped,
		sessionInProgress,
		currentCard,
		progressValue,

		// Pending reviews state
		pendingReviews,
		isProcessingReviews,

		// Actions
		startReviewSession,
		handleEndSession,
		handleFlip,
		handleRate,

		// Callbacks
		onSessionComplete: onSessionCompleteRef.current,
		setOnSessionComplete,
	};
}
