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
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

interface DeckResetDialogProps {
    deckId: string;
    deckName: string;
    cardCount: number;
    isResetting: boolean;
    onResetDeck: (deckId: string) => void;
}

export default function DeckResetDialog({
    deckId,
    deckName,
    cardCount,
    isResetting,
    onResetDeck,
}: DeckResetDialogProps) {
    const [open, setOpen] = useState(false);

    const handleReset = () => {
        onResetDeck(deckId);
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isResetting}
                    variant="outline"
                    className="p-5 rounded-lg"
                >
                    {isResetting ? (
                        <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Restarting...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="mr-2 w-4 h-4" />
                            Restart
                        </>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg w-[350px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Reset deck progress</AlertDialogTitle>
                    <AlertDialogDescription>
                        <>
                            This will reset the review progress for all{" "}
                            <span className="font-bold">{cardCount} cards</span> in the{" "}
                            <span className="font-bold">{deckName}</span> deck.
                        </>
                        <>All cards will be due for review today.</>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
                    <AlertDialogCancel className="my-auto w-full">
                        No, keep my progress
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 rounded-lg w-full text-destructive-foreground"
                        onClick={handleReset}
                        disabled={isResetting}
                    >
                        {isResetting ? (
                            <>
                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            "Yes, reset it"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 