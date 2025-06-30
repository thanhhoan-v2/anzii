import { Trash2 } from "lucide-react";

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
import type { Deck } from "@/types";

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
			<AlertDialogContent className="w-[350px] rounded-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete deck</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the{" "}
						<span className="font-bold">{deck.name}</span> deck and all its
						cards.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row items-center justify-center gap-2">
					<AlertDialogCancel className="my-auto w-full">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="w-full rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={() => onDeleteDeck(deck.id)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
