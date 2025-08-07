"use client";

import { Bot, Loader2 } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createDeckFromAi } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";

export default function AiTopicTab() {
	const router = useRouter();
	const { toast } = useToast();

	// AI topic state
	const [aiTopic, setAiTopic] = useState("");
	const [description, setDescription] = useState("");
	const [cardType, setCardType] = useState("flashcard");
	const [numberOfCards, setNumberOfCards] = useState(15);
	const [numberOfCardsInput, setNumberOfCardsInput] = useState("15");
	const [notes, setNotes] = useState("");
	const [isCreatingAi, setIsCreatingAi] = useState(false);

	const handleAiCreate = async () => {
		if (!aiTopic.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please enter a topic.",
			});
			return;
		}

		// Validate number of cards
		const cardsNum = parseInt(numberOfCardsInput);
		if (isNaN(cardsNum) || cardsNum < 1 || cardsNum > 100) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Number of cards must be between 1 and 100.",
			});
			return;
		}

		setIsCreatingAi(true);
		try {
			const result = await createDeckFromAi({
				topic: aiTopic.trim(),
				description: description.trim(),
				cardTypes: {
					flashcard: cardType === "flashcard",
					mcq: cardType === "mcq",
					fillInBlanks: cardType === "fillInBlanks",
				},
				numberOfCards: cardsNum,
				notes: notes.trim(),
			});
			if (result.success) {
				toast({
					title: "Deck Generated!",
					description: "Your AI deck has been created.",
				});
				router.push(ROUTES.DASHBOARD);
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Could not generate deck. Please try again.";
			toast({
				variant: "destructive",
				title: "AI Error",
				description: errorMessage,
			});
		} finally {
			setIsCreatingAi(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{/* <Bot className="w-5 h-5" /> */}
					AI Deck Generation
				</CardTitle>
				<CardDescription>
					Enter a topic and let AI generate a complete flashcard deck for you
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="aiTopic">Topic</Label>
					<Input
						id="aiTopic"
						placeholder="The main topic of your deck, keep it short and concise."
						value={aiTopic}
						onChange={(e) => setAiTopic(e.target.value)}
						className="mt-2"
					/>
				</div>

				<div>
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						placeholder="Optional, AI will summarize for you."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-2"
					/>
				</div>

				<div>
					<Label>Card Type</Label>
					<RadioGroup
						value={cardType}
						onValueChange={setCardType}
						className="mt-2 space-y-2"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="flashcard" id="flashcard" />
							<Label htmlFor="flashcard">Flashcard</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="mcq" id="mcq" />
							<Label htmlFor="mcq">Multiple Choice Question (MCQ)</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="fillInBlanks" id="fillInBlanks" />
							<Label htmlFor="fillInBlanks">Fill-in Blanks</Label>
						</div>
					</RadioGroup>
				</div>

				<div>
					<Label htmlFor="numberOfCards">Number of Cards</Label>
					<Input
						id="numberOfCards"
						type="number"
						min="1"
						max="100"
						value={numberOfCardsInput}
						onChange={(e) => setNumberOfCardsInput(e.target.value)}
						className="mt-2"
					/>
				</div>

				<div>
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						placeholder="Additional notes or instructions for AI."
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						className="mt-2"
						rows={3}
					/>
				</div>

				<Button
					onClick={handleAiCreate}
					disabled={isCreatingAi}
					className="w-full"
				>
					{isCreatingAi ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Generating Deck...
						</>
					) : (
						<>
							<Bot className="mr-2 h-4 w-4" />
							Generate with AI
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
