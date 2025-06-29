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
import { XIcon } from "lucide-react";

interface DeckDeleteDialogProps {
    deckId: string;
    deckName: string;
    onDeleteDeck: (deckId: string) => void;
}

export default function DeckDeleteDialog({
    deckId,
    deckName,
    onDeleteDeck,
}: DeckDeleteDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-4 mr-4">
                    <XIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg w-[350px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Delete deck</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the <span className="font-bold">{deckName}</span> deck and all its cards.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
                    <AlertDialogCancel className="my-auto w-full">No, keep it</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 rounded-lg w-full text-destructive-foreground"
                        onClick={() => onDeleteDeck(deckId)}
                    >
                        Yes, delete it
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 