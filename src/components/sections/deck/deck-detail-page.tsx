"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackButton from "@/components/common/back-button";
import CardEditor from "@/components/features/study/card-editor";
import AppHeader from "@/components/layout/app-header";
import {
	AddCardButton,
	CardsTable,
	DeckNameEditDialog,
	DeckNameEditor,
} from "@/components/sections/deck/components";
import DeckLoading from "@/components/sections/deck/deck-loading";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { useAddCard, useDeleteCard, useUpdateCard } from "@/hooks/use-cards";
import { useDeck, useUpdateDeckName } from "@/hooks/use-decks";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";
import type { Card as CardType } from "@/types";

export default function DeckDetailPage() {
	const router = useRouter();
	const params = useParams();
	const { deckId } = params;
	const { toast } = useToast();

	const {
		data: deck,
		isLoading,
		error,
	} = useDeck(typeof deckId === "string" ? deckId : undefined);
	const updateDeckNameMutation = useUpdateDeckName();
	const addCardMutation = useAddCard();
	const updateCardMutation = useUpdateCard();
	const deleteCardMutation = useDeleteCard();

	const [isEditingName, setIsEditingName] = useState(false);
	const [deckName, setDeckName] = useState("");
	const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
	const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);
	const [showConfirmDeckNameEditDialog, setShowConfirmDeckNameEditDialog] =
		useState(false);

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
			router.push(ROUTES.DASHBOARD);
		}
	}, [error, deck, isLoading, deckId, router, toast]);

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
				});
			} else {
				// Adding new card
				await addCardMutation.mutateAsync({ deckId: deck.id, ...cardData });
			}
			setCardToEdit(null);
			setIsCardEditorOpen(false);
		} catch {
			// Error handling is done in the mutations
		}
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

	if (isLoading || !deck) {
		return <DeckLoading />;
	}

	return (
		<div className="font-body min-h-screen bg-background text-foreground">
			<AppHeader>
				<BackButton />
			</AppHeader>

			<main className="container mx-auto p-4 md:p-8">
				<Card>
					<CardHeader>
						<DeckNameEditor
							deckName={deckName}
							isEditing={isEditingName}
							isPending={updateDeckNameMutation.isPending}
							onStartEdit={handleDeckNameEditStart}
							onSave={handleDeckNameSaveClick}
							onNameChange={handleDeckNameChange}
						/>
						<CardDescription>
							{deck.cards.length} cards in this deck.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AddCardButton
							onClick={handleAddCardClick}
							isPending={addCardMutation.isPending}
						/>
						<CardsTable
							cards={deck.cards}
							onEditCard={handleEditCardClick}
							onDeleteCard={handleDeleteCard}
							isUpdatePending={updateCardMutation.isPending}
							isDeletePending={deleteCardMutation.isPending}
						/>
					</CardContent>
				</Card>
			</main>

			<CardEditor
				isOpen={isCardEditorOpen}
				onOpenChange={setIsCardEditorOpen}
				onSave={handleSaveCard}
				cardToEdit={cardToEdit}
			/>

			<DeckNameEditDialog
				isOpen={showConfirmDeckNameEditDialog}
				onOpenChange={setShowConfirmDeckNameEditDialog}
				onConfirm={handleDeckNameSave}
				onCancel={handleCancelDeckNameEdit}
			/>
		</div>
	);
}
