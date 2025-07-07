"use client";

import { Edit, Loader2, PlusCircle, Save, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import BackButton from "@/components/common/back-button";
import CardEditor from "@/components/features/study/card-editor";
import AppHeader from "@/components/layout/app-header";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
	addCard,
	deleteCard,
	getDeck,
	updateCard,
	updateDeckName,
} from "@/lib/actions";
import type { Card as CardType, Deck } from "@/types";

export default function Page() {
	const router = useRouter();
	const params = useParams();
	const { deckId } = params;
	const { toast } = useToast();

	const [deck, setDeck] = useState<Deck | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isEditingName, setIsEditingName] = useState(false);
	const [deckName, setDeckName] = useState("");
	const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
	const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);

	const fetchDeck = useCallback(async () => {
		if (typeof deckId !== "string") return;
		setIsLoading(true);
		try {
			const currentDeck = await getDeck(deckId);
			if (currentDeck) {
				setDeck(currentDeck as Deck);
				setDeckName(currentDeck.name);
			} else {
				toast({ variant: "destructive", title: "Deck not found" });
				router.push("/");
			}
		} catch (error) {
			console.error(error);
			toast({
				variant: "destructive",
				title: "Error fetching deck",
				description: error instanceof Error ? error.message : "Unknown error",
			});
			router.push("/");
		} finally {
			setIsLoading(false);
		}
	}, [deckId, router, toast]);

	useEffect(() => {
		fetchDeck();
	}, [fetchDeck]);

	const handleNameSave = async () => {
		if (deckName.trim().length < 3) {
			toast({
				variant: "destructive",
				title: "Invalid Name",
				description: "Deck name must be at least 3 characters.",
			});
			return;
		}
		const result = await updateDeckName({
			deckId: deck!.id,
			name: deckName.trim(),
		});
		if (result.success) {
			setIsEditingName(false);
			toast({
				title: "Deck Renamed",
				description: `Deck is now named "${deckName.trim()}".`,
			});
			fetchDeck();
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.error,
			});
		}
	};

	const handleSaveCard = async (cardData: {
		question: string;
		answer: string;
	}) => {
		let result: { success: boolean; error?: string };
		if (cardToEdit) {
			// Editing existing card
			result = await updateCard({
				cardId: cardToEdit.id,
				deckId: deck!.id,
				...cardData,
			});
		} else {
			// Adding new card
			result = await addCard({ deckId: deck!.id, ...cardData });
		}

		if (result.success) {
			toast({ title: cardToEdit ? "Card Updated" : "Card Added" });
			fetchDeck();
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.error,
			});
		}

		setCardToEdit(null);
		setIsCardEditorOpen(false);
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
		const result = await deleteCard({ cardId, deckId: deck!.id });
		if (result.success) {
			toast({ title: "Card Deleted" });
			fetchDeck();
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.error,
			});
		}
	};

	if (isLoading || !deck) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="w-8 h-8 animate-spin" />
				<p className="ml-4">Loading deck...</p>
			</div>
		);
	}

	return (
		<div className="bg-background min-h-screen font-body text-foreground">
			<AppHeader>
				<BackButton />
			</AppHeader>

			<main className="mx-auto p-4 md:p-8 container">
				<Card>
					<CardHeader>
						<div className="flex justify-between items-center">
							{isEditingName ? (
								<div className="flex items-center gap-2 w-full">
									<Input
										value={deckName}
										onChange={(e) => setDeckName(e.target.value)}
										className="font-semibold text-2xl"
									/>
									<Button size="icon" onClick={handleNameSave}>
										<Save />
									</Button>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<CardTitle className="text-3xl">{deck.name}</CardTitle>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => setIsEditingName(true)}
									>
										<Edit />
									</Button>
								</div>
							)}
						</div>
						<CardDescription>
							{deck.cards.length} cards in this deck.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-end mb-4">
							<Button onClick={handleAddCardClick}>
								<PlusCircle className="mr-2" /> Add New Card
							</Button>
						</div>
						<div className="border rounded-lg">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[45%]">Question</TableHead>
										<TableHead className="w-[45%]">Answer</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{deck.cards.map((card) => (
										<TableRow key={card.id}>
											<TableCell className="align-top">
												<div className="max-w-none text-foreground [&_*]:text-foreground prose prose-sm">
													<ReactMarkdown remarkPlugins={[remarkGfm]}>
														{card.question}
													</ReactMarkdown>
												</div>
											</TableCell>
											<TableCell className="align-top">
												<div className="max-w-none text-muted-foreground [&_*]:text-muted-foreground prose prose-sm">
													<ReactMarkdown remarkPlugins={[remarkGfm]}>
														{card.answer}
													</ReactMarkdown>
												</div>
											</TableCell>
											<TableCell className="text-right align-top">
												<div className="flex justify-end gap-2">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleEditCardClick(card)}
													>
														<Edit className="w-4 h-4" />
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="text-destructive hover:text-destructive"
															>
																<Trash2 className="w-4 h-4" />
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Delete this card?
																</AlertDialogTitle>
																<AlertDialogDescription>
																	This will permanently delete this card. This
																	action cannot be undone.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => handleDeleteCard(card.id)}
																>
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							{deck.cards.length === 0 && (
								<div className="p-8 text-muted-foreground text-center">
									This deck has no cards yet.
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</main>

			<CardEditor
				isOpen={isCardEditorOpen}
				onOpenChange={setIsCardEditorOpen}
				onSave={handleSaveCard}
				cardToEdit={cardToEdit}
			/>
		</div>
	);
}
