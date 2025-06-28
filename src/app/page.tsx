"use client";

import AiDeckGenerator from "@/components/AiDeckGenerator";
import Flashcard from "@/components/Flashcard";
import { ThemeToggle } from "@/components/ThemeToggle";
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
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Card as ShadCard,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
	createDeckFromImport,
	deleteDeck,
	getDeck,
	getDecksWithCounts,
	resetDeckProgress,
	reviewCard,
} from "@/lib/actions";
import { shuffle } from "@/lib/utils";
import type { Card as CardType, Deck, DeckListItem, Rating } from "@/types";
import {
	ArrowLeft,
	FileText,
	Loader2,
	PlusCircle,
	RefreshCw,
	Rocket,
	Settings,
	Trash2,
	Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WelcomeScreen = ({
	onImport,
	onAiCreate,
}: { onImport: () => void; onAiCreate: () => void }) => (
	<div className="px-4 py-16 text-center">
		<Rocket className="mx-auto w-16 h-16 text-primary" />
		<h2 className="mt-6 font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
			Welcome to Anzii
		</h2>
		<p className="mt-4 text-muted-foreground text-lg">
			Your smart flashcard companion. Get started by creating your first deck.
		</p>
		<div className="flex flex-wrap justify-center gap-4 mt-8">
			<Button onClick={onImport} size="lg" variant="outline">
				<Upload className="mr-2" /> Import from File
			</Button>
			<Button onClick={onAiCreate} size="lg">
				<FileText className="mr-2" /> Create with AI
			</Button>
		</div>
	</div>
);

export default function Home() {
	const [decks, setDecks] = useState<DeckListItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
	const [reviewQueue, setReviewQueue] = useState<CardType[]>([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [sessionInProgress, setSessionInProgress] = useState(false);
	const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const router = useRouter();

	const fetchDecks = useCallback(async () => {
		setIsLoading(true);
		try {
			const fetchedDecks = await getDecksWithCounts();
			setDecks(fetchedDecks);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Could not fetch decks.",
			});
		} finally {
			setIsLoading(false);
		}
	}, [toast]);

	useEffect(() => {
		fetchDecks();
	}, [fetchDecks]);

	const progressValue = useMemo(() => {
		if (reviewQueue.length === 0) return 0;
		return (currentCardIndex / reviewQueue.length) * 100;
	}, [currentCardIndex, reviewQueue.length]);

	const handleImportClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const content = e.target?.result as string;
				const importedJson = JSON.parse(content);

				const result = await createDeckFromImport(importedJson);

				if (result.success) {
					toast({
						title: "Deck Imported!",
						description: `Your new deck has been loaded.`,
					});
					fetchDecks();
				} else {
					throw new Error(result.error || "Failed to import deck.");
				}
			} catch (error) {
				console.error("Failed to parse JSON:", error);
				toast({
					variant: "destructive",
					title: "Import Failed",
					description:
						error instanceof Error
							? error.message
							: "The selected file is not valid JSON.",
				});
			}
		};
		reader.readAsText(file);
		event.target.value = "";
	};

	const startSession = (deck: Deck, cards: CardType[]) => {
		setActiveDeck(deck);
		setReviewQueue(shuffle(cards));
		setCurrentCardIndex(0);
		setIsFlipped(false);
		setSessionInProgress(true);
	};

	const handleEndSession = () => {
		setSessionInProgress(false);
		setActiveDeck(null);
		setReviewQueue([]);
		setCurrentCardIndex(0);
		toast({
			title: "Session Paused",
			description: "You've returned to the dashboard.",
		});
		fetchDecks();
	};

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

				const dueCards = deckToReview.cards.filter(
					(card) => new Date(card.dueDate) <= new Date(),
				);

				if (dueCards.length === 0) {
					toast({
						title: "All Caught Up!",
						description: "You have no cards due for review today in this deck.",
					});
					return;
				}

				startSession(deckToReview as Deck, dueCards);
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Could not start review session.",
				});
			}
		},
		[toast],
	);

	const handleDeckCreated = () => {
		setIsAiDeckGeneratorOpen(false);
		toast({
			title: "Deck Generated!",
			description: "Your new deck has been created.",
		});
		fetchDecks();
	};

	const handleRate = async (rating: Rating) => {
		if (!isFlipped || !activeDeck) return;

		const currentCard = reviewQueue[currentCardIndex];
		await reviewCard({ cardId: currentCard.id, deckId: activeDeck.id, rating });

		if (currentCardIndex + 1 < reviewQueue.length) {
			setCurrentCardIndex((prev) => prev + 1);
			setIsFlipped(false);
		} else {
			setSessionInProgress(false);
			setActiveDeck(null);
			toast({
				title: "Session Complete!",
				description: `You've reviewed ${reviewQueue.length} cards. Great job!`,
			});
			fetchDecks();
		}
	};

	const handleDeleteDeck = async (deckId: string) => {
		const result = await deleteDeck(deckId);
		if (result.success) {
			toast({
				title: "Deck Deleted",
				description: "The deck has been removed.",
			});
			fetchDecks();
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.error,
			});
		}
	};

	const handleResetDeck = async (deckId: string) => {
		const result = await resetDeckProgress(deckId);
		if (result.success) {
			toast({
				title: "Deck Reset",
				description: "All cards are now due for review.",
			});
			fetchDecks();
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.error || "Failed to reset deck.",
			});
		}
	};

	const currentCard = sessionInProgress ? reviewQueue[currentCardIndex] : null;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="w-8 h-8 animate-spin" />
				<p className="ml-4">Loading decks...</p>
			</div>
		);
	}

	return (
		<div className="bg-background min-h-screen font-sans text-foreground">
			<header className="p-4 border-b">
				<div className="flex justify-between items-center mx-auto container">
					<Link
						href="/"
						className="flex items-center gap-2 hover:scale-105 transition-transform"
					>
						<Rocket className="w-8 h-8 text-primary" />
						<h1 className="font-bold text-2xl tracking-tight">Anzii</h1>
					</Link>
					<div className="flex items-center gap-4">
						{decks.length > 0 && !sessionInProgress && (
							<div className="flex gap-2">
								<Button onClick={handleImportClick} variant="outline">
									<Upload /> Import
								</Button>
								<Button onClick={() => setIsAiDeckGeneratorOpen(true)}>
									<PlusCircle /> Create Deck
								</Button>
							</div>
						)}
						<ThemeToggle />
					</div>
				</div>
			</header>

			<main className="mx-auto p-4 md:p-8 container">
				{sessionInProgress && currentCard && activeDeck ? (
					<div className="flex flex-col items-center w-full h-full">
						<div className="mb-4 w-full max-w-2xl">
							<div className="flex justify-between items-center mb-2">
								<p className="text-muted-foreground text-sm">{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueue.length}`}</p>
								<Button variant="outline" size="sm" onClick={handleEndSession}>
									<ArrowLeft className="mr-2 w-4 h-4" />
									Back to Decks
								</Button>
							</div>
							<Progress value={progressValue} className="mt-1 w-full h-2" />
						</div>
						<Flashcard
							card={currentCard}
							isFlipped={isFlipped}
							onFlip={() => setIsFlipped(true)}
						/>
						<div className="flex justify-center gap-4 mt-6 w-full">
							{isFlipped ? (
								<>
									<Button
										onClick={() => handleRate("hard")}
										variant="destructive"
										className="w-28"
									>
										Hard
									</Button>
									<Button
										onClick={() => handleRate("medium")}
										className="bg-warning hover:bg-warning/90 w-28 text-warning-foreground"
									>
										Medium
									</Button>
									<Button
										onClick={() => handleRate("easy")}
										className="bg-success hover:bg-success/90 w-28 text-success-foreground"
									>
										Easy
									</Button>
								</>
							) : (
								<Button
									onClick={() => setIsFlipped(true)}
									size="lg"
									className="w-48"
								>
									Show Answer
								</Button>
							)}
						</div>
					</div>
				) : decks.length === 0 ? (
					<WelcomeScreen
						onImport={handleImportClick}
						onAiCreate={() => setIsAiDeckGeneratorOpen(true)}
					/>
				) : (
					<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{decks.map((deck) => {
							return (
								<ShadCard
									key={deck.id}
									className="flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 duration-200"
								>
									<CardHeader>
										<CardTitle>{deck.name}</CardTitle>
										<CardDescription>{deck.cardCount} cards</CardDescription>
									</CardHeader>
									<CardContent className="flex-grow">
										<div
											className={`text-lg font-bold ${deck.dueCount > 0 ? "text-primary" : "text-muted-foreground"}`}
										>
											{deck.dueCount} due
										</div>
										<p className="text-muted-foreground text-sm">
											for review today
										</p>
									</CardContent>
									<CardFooter className="flex justify-between gap-2">
										<div className="flex gap-2">
											<Link href={`/deck/${deck.id}`} passHref>
												<Button variant="outline" size="icon">
													<Settings />
												</Button>
											</Link>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="destructive" size="icon">
														<Trash2 />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Are you sure?</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone. This will
															permanently delete the "{deck.name}" deck and all
															its cards.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDeleteDeck(deck.id)}
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
										<div className="flex items-center gap-2">
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														variant="outline"
														disabled={deck.cardCount === 0}
													>
														<RefreshCw className="mr-2 w-4 h-4" /> Restart
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Reset deck progress?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This will reset the review progress for all cards
															in the "{deck.name}" deck. All cards will be due
															for review today. This action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleResetDeck(deck.id)}
														>
															Reset Progress
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>

											<Button
												onClick={() => startReviewSession(deck.id)}
												disabled={deck.dueCount === 0}
											>
												Review
											</Button>
										</div>
									</CardFooter>
								</ShadCard>
							);
						})}
					</div>
				)}
			</main>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept=".json"
				className="hidden"
			/>
			<AiDeckGenerator
				isOpen={isAiDeckGeneratorOpen}
				onOpenChange={setIsAiDeckGeneratorOpen}
				onSuccess={handleDeckCreated}
			/>
		</div>
	);
}
