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
import type { Deck } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteAlertDialog({
	deck,
	onDeleteDeck,
}: {
	deck: Deck;
	onDeleteDeck: (deckId: string) => void;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-lg w-[350px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete deck</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the <span className="font-bold">{deck.name}</span> deck and all its cards.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
					<AlertDialogCancel className="my-auto w-full">Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive hover:bg-destructive/90 rounded-lg w-full text-destructive-foreground"
						onClick={() => onDeleteDeck(deck.id)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
