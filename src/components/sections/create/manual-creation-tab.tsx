"use client";

import { Loader2, Plus, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addCard, createDeck } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";

interface ManualCard {
	id: string;
	question: string;
	answer: string;
}

export default function ManualCreationTab() {
	const router = useRouter();
	const { toast } = useToast();

	// Manual creation state
	const [deckName, setDeckName] = useState("");
	const [manualCards, setManualCards] = useState<ManualCard[]>([
		{ id: "1", question: "", answer: "" },
	]);
	const [isCreatingManual, setIsCreatingManual] = useState(false);

	const addNewCard = () => {
		const newId = (manualCards.length + 1).toString();
		setManualCards([...manualCards, { id: newId, question: "", answer: "" }]);
	};

	const removeCard = (id: string) => {
		if (manualCards.length > 1) {
			setManualCards(manualCards.filter((card) => card.id !== id));
		}
	};

	const updateCard = (
		id: string,
		field: "question" | "answer",
		value: string
	) => {
		setManualCards(
			manualCards.map((card) =>
				card.id === id ? { ...card, [field]: value } : card
			)
		);
	};

	const handleManualCreate = async () => {
		if (!deckName.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please enter a deck name.",
			});
			return;
		}

		const validCards = manualCards.filter(
			(card) => card.question.trim() && card.answer.trim()
		);

		if (validCards.length === 0) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please add at least one complete card.",
			});
			return;
		}

		setIsCreatingManual(true);
		try {
			// Create the deck
			const deckResult = await createDeck({ name: deckName.trim() });
			if (!deckResult.success) {
				throw new Error(deckResult.error);
			}

			// Add all cards
			for (const card of validCards) {
				await addCard({
					deckId: deckResult.deckId!,
					question: card.question.trim(),
					answer: card.answer.trim(),
				});
			}

			toast({
				title: "Deck Created!",
				description: `Successfully created "${deckName}" with ${validCards.length} cards.`,
			});
			router.push(ROUTES.HOME);
		} catch {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to create deck. Please try again.",
			});
		} finally {
			setIsCreatingManual(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{/* <PlusCircle className="w-5 h-5" /> */}
					Manual Card Creation
				</CardTitle>
				<CardDescription>
					Create flashcards one by one with your own questions and answers
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="deckName">Deck Name</Label>
					<Input
						id="deckName"
						placeholder="Enter deck name..."
						value={deckName}
						onChange={(e) => setDeckName(e.target.value)}
						className="mt-2"
					/>
				</div>

				<Separator />

				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold text-lg">Cards</h3>
						<Button onClick={addNewCard} variant="outline" size="sm">
							<Plus className="mr-2 w-4 h-4" />
							Add Card
						</Button>
					</div>

					{manualCards.map((card, index) => (
						<Card key={card.id} className="p-4">
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h4 className="font-medium">Card {index + 1}</h4>
									{manualCards.length > 1 && (
										<Button
											onClick={() => removeCard(card.id)}
											variant="ghost"
											size="sm"
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									)}
								</div>
								<div className="gap-4 grid grid-cols-1 md:grid-cols-2">
									<div>
										<Label>Question</Label>
										<Textarea
											placeholder="Enter question..."
											value={card.question}
											onChange={(e) =>
												updateCard(card.id, "question", e.target.value)
											}
											className="mt-2 min-h-[100px]"
										/>
									</div>
									<div>
										<Label>Answer</Label>
										<Textarea
											placeholder="Enter answer..."
											value={card.answer}
											onChange={(e) =>
												updateCard(card.id, "answer", e.target.value)
											}
											className="mt-2 min-h-[100px]"
										/>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>

				<Button
					onClick={handleManualCreate}
					disabled={isCreatingManual}
					className="w-full"
				>
					{isCreatingManual ? (
						<>
							<Loader2 className="mr-2 w-4 h-4 animate-spin" />
							Creating Deck...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 w-4 h-4" />
							Create Deck
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
