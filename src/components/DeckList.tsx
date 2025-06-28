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
import type { DeckListItem } from "@/types";
import { RefreshCw, Settings, Trash2 } from "lucide-react";
import Link from "next/link";

interface DeckListProps {
	decks: DeckListItem[];
	onStartReview: (deckId: string) => void;
	onDeleteDeck: (deckId: string) => void;
	onResetDeck: (deckId: string) => void;
}

export default function DeckList({
	decks,
	onStartReview,
	onDeleteDeck,
	onResetDeck,
}: DeckListProps) {
	return (
		<div className="place-items-center gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
			{decks.map((deck) => (
				<ShadCard
					key={deck.id}
					className="flex flex-col w-[400px] transition-all"
				>
					<CardHeader>
						<CardTitle>{deck.name}</CardTitle>
						<CardDescription>{deck.cardCount} cards</CardDescription>
					</CardHeader>
					<CardContent className="flex-grow">
						<div
							className={`text-lg font-bold ${
								deck.dueCount > 0 ? "text-primary" : "text-muted-foreground"
							}`}
						>
							{deck.dueCount} due
						</div>
						<p className="text-muted-foreground text-sm">for review today</p>
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
											This action cannot be undone. This will permanently delete
											the "{deck.name}" deck and all its cards.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => onDeleteDeck(deck.id)}>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
						<div className="flex items-center gap-2">
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="outline" disabled={deck.cardCount === 0}>
										<RefreshCw className="mr-2 w-4 h-4" /> Restart
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Reset deck progress?</AlertDialogTitle>
										<AlertDialogDescription>
											This will reset the review progress for all cards in the "
											{deck.name}" deck. All cards will be due for review today.
											This action cannot be undone.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => onResetDeck(deck.id)}>
											Reset Progress
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>

							<Button
								onClick={() => onStartReview(deck.id)}
								disabled={deck.dueCount === 0}
							>
								Review
							</Button>
						</div>
					</CardFooter>
				</ShadCard>
			))}
		</div>
	);
}
