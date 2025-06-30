"use client";

import BackButton from "@/components/common/back-button";
import AppHeader from "@/components/layout/app-header";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    addCard,
    createDeck,
    createDeckFromAi,
    createDeckFromMarkdown,
} from "@/lib/actions";
import { ROUTES } from "@/lib/routes";
import {
    Bot,
    FileText,
    Loader2,
    Plus,
    PlusCircle,
    Trash2,
    Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface ManualCard {
	id: string;
	question: string;
	answer: string;
}

export default function CreatePage() {
	const router = useRouter();
	const { toast } = useToast();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Manual creation state
	const [deckName, setDeckName] = useState("");
	const [manualCards, setManualCards] = useState<ManualCard[]>([
		{ id: "1", question: "", answer: "" },
	]);
	const [isCreatingManual, setIsCreatingManual] = useState(false);

	// AI topic state
	const [aiTopic, setAiTopic] = useState("");
	const [isCreatingAi, setIsCreatingAi] = useState(false);

	// Markdown state
	const [markdownTopic, setMarkdownTopic] = useState("");
	const [markdownContent, setMarkdownContent] = useState("");
	const [isCreatingMarkdown, setIsCreatingMarkdown] = useState(false);

	// File import state
	const [isImporting, setIsImporting] = useState(false);

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
		value: string,
	) => {
		setManualCards(
			manualCards.map((card) =>
				card.id === id ? { ...card, [field]: value } : card,
			),
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
			(card) => card.question.trim() && card.answer.trim(),
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
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to create deck. Please try again.",
			});
		} finally {
			setIsCreatingManual(false);
		}
	};

	const handleAiCreate = async () => {
		if (!aiTopic.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please enter a topic.",
			});
			return;
		}

		setIsCreatingAi(true);
		try {
			const result = await createDeckFromAi({ topic: aiTopic.trim() });
			if (result.success) {
				toast({
					title: "Deck Generated!",
					description: "Your AI deck has been created.",
				});
				router.push(ROUTES.HOME);
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "AI Error",
				description: "Could not generate deck. Please try again.",
			});
		} finally {
			setIsCreatingAi(false);
		}
	};

	const handleMarkdownCreate = async () => {
		if (!markdownTopic.trim() || !markdownContent.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please fill in both topic and markdown content.",
			});
			return;
		}

		setIsCreatingMarkdown(true);
		try {
			const result = await createDeckFromMarkdown({
				topic: markdownTopic.trim(),
				markdown: markdownContent.trim(),
			});
			if (result.success) {
				toast({
					title: "Deck Created!",
					description: "Your deck has been generated from markdown.",
				});
				router.push(ROUTES.HOME);
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Could not create deck from markdown.",
			});
		} finally {
			setIsCreatingMarkdown(false);
		}
	};

	const handleFileImport = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.type !== "application/json") {
			toast({
				variant: "destructive",
				title: "Invalid File Type",
				description: "Please select a JSON file.",
			});
			return;
		}

		setIsImporting(true);
		try {
			const text = await file.text();
			const data = JSON.parse(text);

			// Validate the JSON structure
			if (!data.name || !Array.isArray(data.cards)) {
				throw new Error("Invalid deck format");
			}

			// Create the deck
			const deckResult = await createDeck({ name: data.name });
			if (!deckResult.success) {
				throw new Error(deckResult.error);
			}

			// Add all cards
			for (const card of data.cards) {
				if (card.question && card.answer) {
					await addCard({
						deckId: deckResult.deckId!,
						question: card.question,
						answer: card.answer,
					});
				}
			}

			toast({
				title: "Import Successful!",
				description: `Imported "${data.name}" with ${data.cards.length} cards.`,
			});
			router.push(ROUTES.HOME);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Import Failed",
				description: "Could not import the file. Please check the format.",
			});
		} finally {
			setIsImporting(false);
			// Reset the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	return (
		<div className="bg-background min-h-screen text-foreground">
			<AppHeader>
        <BackButton />
      </AppHeader>

			<main className="mx-auto p-4 md:p-8 max-w-4xl container">
				<Tabs defaultValue="manual" className="w-full">
					<TabsList className="grid grid-cols-4 w-full">
						<TabsTrigger value="manual" className="flex items-center gap-2">
							<PlusCircle className="w-4 h-4" />
							Manual
						</TabsTrigger>
						<TabsTrigger value="ai" className="flex items-center gap-2">
							<Bot className="w-4 h-4" />
							AI Topic
						</TabsTrigger>
						<TabsTrigger value="markdown" className="flex items-center gap-2">
							<FileText className="w-4 h-4" />
							Markdown
						</TabsTrigger>
						<TabsTrigger value="import" className="flex items-center gap-2">
							<Upload className="w-4 h-4" />
							Import
						</TabsTrigger>
					</TabsList>

					{/* Manual Creation */}
					<TabsContent value="manual" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<PlusCircle className="w-5 h-5" />
									Manual Card Creation
								</CardTitle>
								<CardDescription>
									Create flashcards one by one with your own questions and
									answers
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
					</TabsContent>

					{/* AI Topic Generation */}
					<TabsContent value="ai" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Bot className="w-5 h-5" />
									AI Topic Generation
								</CardTitle>
								<CardDescription>
									Enter a topic and let AI generate a complete flashcard deck
									for you
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label htmlFor="aiTopic">Topic</Label>
									<Input
										id="aiTopic"
										placeholder="e.g., 'The Roman Empire', 'Python Programming', 'Photosynthesis'..."
										value={aiTopic}
										onChange={(e) => setAiTopic(e.target.value)}
										className="mt-2"
									/>
								</div>

								<Button
									onClick={handleAiCreate}
									disabled={isCreatingAi}
									className="w-full"
								>
									{isCreatingAi ? (
										<>
											<Loader2 className="mr-2 w-4 h-4 animate-spin" />
											Generating Deck...
										</>
									) : (
										<>
											<Bot className="mr-2 w-4 h-4" />
											Generate with AI
										</>
									)}
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Markdown Import */}
					<TabsContent value="markdown" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="w-5 h-5" />
									Markdown to Cards
								</CardTitle>
								<CardDescription>
									Paste your notes in Markdown format and AI will generate
									flashcards
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label htmlFor="markdownTopic">Deck Name / Topic</Label>
									<Input
										id="markdownTopic"
										placeholder="e.g., 'Biology Notes', 'History Chapter 5'..."
										value={markdownTopic}
										onChange={(e) => setMarkdownTopic(e.target.value)}
										className="mt-2"
									/>
								</div>

								<div>
									<Label htmlFor="markdownContent">Markdown Content</Label>
									<Textarea
										id="markdownContent"
										placeholder="Paste your notes here... e.g., '# Mitochondria\n- The powerhouse of the cell.'"
										value={markdownContent}
										onChange={(e) => setMarkdownContent(e.target.value)}
										className="mt-2 min-h-[300px]"
									/>
								</div>

								<Button
									onClick={handleMarkdownCreate}
									disabled={isCreatingMarkdown}
									className="w-full"
								>
									{isCreatingMarkdown ? (
										<>
											<Loader2 className="mr-2 w-4 h-4 animate-spin" />
											Processing Markdown...
										</>
									) : (
										<>
											<FileText className="mr-2 w-4 h-4" />
											Generate from Markdown
										</>
									)}
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					{/* File Import */}
					<TabsContent value="import" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Upload className="w-5 h-5" />
									Import from File
								</CardTitle>
								<CardDescription>
									Import a deck from a JSON file with the following format:
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="bg-muted p-4 rounded-lg">
									<pre className="text-muted-foreground [&_*]:text-muted-foreground text-sm">
										{`{
  "name": "My Deck",
  "cards": [
    {
      "question": "What is the capital of France?",
      "answer": "Paris"
    },
    {
      "question": "What is 2 + 2?",
      "answer": "4"
    }
  ]
}`}
									</pre>
								</div>

								<Button
									onClick={handleFileImport}
									disabled={isImporting}
									className="w-full"
								>
									{isImporting ? (
										<>
											<Loader2 className="mr-2 w-4 h-4 animate-spin" />
											Importing...
										</>
									) : (
										<>
											<Upload className="mr-2 w-4 h-4" />
											Select JSON File
										</>
									)}
								</Button>

								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									accept=".json"
									className="hidden"
								/>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
