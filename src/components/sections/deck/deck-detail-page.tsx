"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackButton from "@/components/common/back-button";
import DeckDeleteDialog from "@/components/features/deck/deck-delete-dialog";
import CardEditor from "@/components/features/study/card-editor";
import MCQCardEditor from "@/components/features/study/mcq-card-editor";
import ReviewSession from "@/components/features/study/review-session";
import AppHeader from "@/components/layout/app-header";
import {
	AddCardButton,
	CardsTable,
	DeckNameEditDialog,
	DeckNameEditor,
} from "@/components/sections/deck/components";
import DeckLoading from "@/components/sections/deck/deck-loading";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useAddCard, useDeleteCard, useUpdateCard } from "@/hooks/use-cards";
import { useDeckManagement } from "@/hooks/use-deck-management";
import { useDeck, useDeleteDeck, useUpdateDeckName } from "@/hooks/use-decks";
import { useReviewSession } from "@/hooks/use-review-session";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";
import type { Card as CardType } from "@/types";
import { Rating } from "@/types";

export default function DeckDetailPage() {
	const router = useRouter();
	const params = useParams();
	const { deckId } = params;
	const { toast } = useToast();
	const deckManagement = useDeckManagement();
	const reviewSession = useReviewSession();

	const {
		data: deck,
		isLoading,
		error,
	} = useDeck(typeof deckId === "string" ? deckId : undefined);
	const updateDeckNameMutation = useUpdateDeckName();
	const addCardMutation = useAddCard();
	const updateCardMutation = useUpdateCard();
	const deleteCardMutation = useDeleteCard();
	const deleteDeckMutation = useDeleteDeck();

	const [isEditingName, setIsEditingName] = useState(false);
	const [deckName, setDeckName] = useState("");
	const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
	const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);
	const [showConfirmDeckNameEditDialog, setShowConfirmDeckNameEditDialog] =
		useState(false);

	// Calculate total card count (no longer filtering by due date)
	const totalCardCount = deck?.cards.length || 0;

	// Set up review session completion callback
	useEffect(() => {
		reviewSession.setOnSessionComplete(() => {
			deckManagement.refreshDecks();
		});
	}, [reviewSession, deckManagement]);

	// Update local deck name when deck data changes
	useEffect(() => {
		if (deck) {
			setDeckName(deck.name);
		}
	}, [deck]);

	// Handle error or missing deck
	useEffect(() => {
		if (error || (deckId && !isLoading && !deck)) {
			toast({ variant: "destructive", title: "Deck not found" });
			router.push(ROUTES.DECKS);
		}
	}, [error, deck, isLoading, deckId, router, toast]);

	// Increment user count when deck is loaded
	useEffect(() => {
		if (deck && deckId) {
			const incrementUserCount = async () => {
				try {
					await fetch(`/api/decks/${deckId}/increment-user-count`, {
						method: "POST",
					});
				} catch (error) {
					// Silently fail - user count increment is not critical
					console.error("Failed to increment user count:", error);
				}
			};

			incrementUserCount();
		}
	}, [deck, deckId]);

	// Deck name editing handlers
	const handleDeckNameSave = async () => {
		if (!deck) return;

		if (deckName.trim().length < 3) {
			toast({
				variant: "destructive",
				title: "Invalid Name",
				description: "Deck name must be at least 3 characters.",
			});
			return;
		}

		try {
			await updateDeckNameMutation.mutateAsync({
				deckId: deck.id,
				name: deckName.trim(),
			});
			setIsEditingName(false);
			setShowConfirmDeckNameEditDialog(false);
		} catch {
			// Error handling is done in the mutation
		}
	};

	const handleCancelDeckNameEdit = () => {
		setDeckName(deck!.name); // Revert to original name
		setIsEditingName(false);
		setShowConfirmDeckNameEditDialog(false);
	};

	const handleDeckNameEditStart = () => {
		setIsEditingName(true);
	};

	const handleDeckNameChange = (name: string) => {
		setDeckName(name);
	};

	const handleDeckNameSaveClick = () => {
		setShowConfirmDeckNameEditDialog(true);
	};

	// Card management handlers
	const handleSaveCard = async (cardData: {
		question: string;
		answer: string;
	}) => {
		if (!deck) return;

		try {
			if (cardToEdit) {
				// Editing existing card
				await updateCardMutation.mutateAsync({
					cardId: cardToEdit.id,
					deckId: deck.id,
					...cardData,
					cardType: cardToEdit.cardType, // Preserve the card type
				});
			} else {
				// Adding new card - determine card type based on content
				const cardType = determineCardType(cardData);
				await addCardMutation.mutateAsync({
					deckId: deck.id,
					...cardData,
					cardType,
				});
			}
			setCardToEdit(null);
			setIsCardEditorOpen(false);
		} catch {
			// Error handling is done in the mutations
		}
	};

	// Determine card type based on content
	const determineCardType = (cardData: {
		question: string;
		answer: string;
	}) => {
		// Check if the answer contains MCQ format (A) Option A, B) Option B, etc.)
		const mcqPattern = /[A-D]\)[^,]+,\s*[A-D]\)[^,]+/;
		if (mcqPattern.test(cardData.answer)) {
			return "mcq";
		}
		return "flashcard";
	};

	const handleAddCardClick = () => {
		setCardToEdit(null);
		setIsCardEditorOpen(true);
	};

	const handleEditCardClick = (card: CardType) => {
		setCardToEdit(card);
		setIsCardEditorOpen(true);
	};

	const handleDeleteCard = async (cardId: string) => {
		if (!deck) return;

		try {
			await deleteCardMutation.mutateAsync({ cardId, deckId: deck.id });
		} catch {
			// Error handling is done in the mutation
		}
	};

	const handleDeleteDeck = async (deckId: string) => {
		try {
			await deleteDeckMutation.mutateAsync(deckId);
			router.push(ROUTES.DECKS);
		} catch {
			// Error handling is done in the mutation
		}
	};

	// Handle MCQ answers by calling the review session's handleRate
	const handleMCQAnswer = (cardId: string, rating: Rating) => {
		reviewSession.handleRate(rating);
	};

	// Determine which card editor to show
	const isMCQCard = cardToEdit?.cardType === "mcq";

	if (isLoading || !deck) {
		return <DeckLoading />;
	}

	return (
		<div className="font-body min-h-screen bg-background text-foreground">
			<AppHeader>
				<BackButton />
			</AppHeader>

			<main className="container mx-auto p-4 md:p-8">
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
						mcqAnswersCount={reviewSession.mcqAnswers.length}
						onFlip={reviewSession.handleFlip}
						onRate={reviewSession.handleRate}
						onEndSession={reviewSession.handleEndSession}
						onMCQAnswer={handleMCQAnswer}
					/>
				) : (
					<Card>
						<CardHeader className="relative gap-5">
							<div className="absolute right-2 top-2 z-10">
								<DeckDeleteDialog
									deckId={deck.id}
									deckName={deck.name}
									onDeleteDeck={handleDeleteDeck}
								/>
							</div>
							<DeckNameEditor
								deckName={deckName}
								isEditing={isEditingName}
								isPending={updateDeckNameMutation.isPending}
								onStartEdit={handleDeckNameEditStart}
								onSave={handleDeckNameSaveClick}
								onNameChange={handleDeckNameChange}
							/>
							<CardDescription>
								{deck.description && (
									<>
										{deck.description}
										<br />
									</>
								)}
								{deck.cards.length} cards in this deck.
							</CardDescription>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<AddCardButton
									onClick={handleAddCardClick}
									isPending={addCardMutation.isPending}
								/>
								<div className="flex flex-wrap items-center gap-2">
									{/* <DeckResetDialog
										deckId={deck.id}
										deckName={deck.name}
										cardCount={deck.cards.length}
										isResetting={deckManagement.resetLoadingDeckId === deck.id}
										onResetDeck={deckManagement.handleResetDeck}
									/> */}
									<div className="flex items-center gap-2">
										{totalCardCount === 0 ? (
											<Button disabled>Start Review</Button>
										) : (
											<Button
												onClick={() =>
													reviewSession.startReviewSession(deck.id)
												}
											>
												Start Review
											</Button>
										)}
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<CardsTable
								cards={deck.cards}
								onEditCard={handleEditCardClick}
								onDeleteCard={handleDeleteCard}
								isUpdatePending={updateCardMutation.isPending}
								isDeletePending={deleteCardMutation.isPending}
							/>
						</CardContent>
						<CardFooter className="flex justify-between gap-2">
							<div className="flex items-center gap-2"></div>
						</CardFooter>
					</Card>
				)}
			</main>

			{/* Render appropriate card editor based on card type */}
			{isMCQCard ? (
				<MCQCardEditor
					isOpen={isCardEditorOpen}
					onOpenChange={setIsCardEditorOpen}
					onSave={handleSaveCard}
					cardToEdit={cardToEdit}
				/>
			) : (
				<CardEditor
					isOpen={isCardEditorOpen}
					onOpenChange={setIsCardEditorOpen}
					onSave={handleSaveCard}
					cardToEdit={cardToEdit}
				/>
			)}

			<DeckNameEditDialog
				isOpen={showConfirmDeckNameEditDialog}
				onOpenChange={setShowConfirmDeckNameEditDialog}
				onConfirm={handleDeckNameSave}
				onCancel={handleCancelDeckNameEdit}
			/>
		</div>
	);
}
