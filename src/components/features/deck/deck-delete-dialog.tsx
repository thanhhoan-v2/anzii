import { XIcon } from "lucide-react";

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

interface DeckDeleteDialogProps {
	deckId: string;
	deckName: string;
	onDeleteDeck: (deckId: string) => void;
}

export default function DeckDeleteBtn({
	deckId,
	deckName,
	onDeleteDeck,
}: DeckDeleteDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<XIcon className="h-4 w-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[350px] rounded-lg">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">
						Delete deck
					</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the{" "}
						<span className="font-bold">{deckName}</span> deck and all its
						cards.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row items-center justify-center gap-2">
					<AlertDialogCancel className="my-auto w-full">
						No, keep it
					</AlertDialogCancel>
					<AlertDialogAction
						className="w-full rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={() => onDeleteDeck(deckId)}
					>
						Yes, delete it
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
