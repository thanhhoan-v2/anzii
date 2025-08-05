import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

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
					className="rounded-lg p-5"
				>
					{isResetting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Restarting...
						</>
					) : (
						<>
							<RefreshCw className="mr-2 h-4 w-4" />
							Restart
						</>
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[350px] rounded-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Reset deck progress</AlertDialogTitle>
					<AlertDialogDescription>
						<>
							This will reset the review progress for all{" "}
							<span className="font-bold">{cardCount} cards</span> in the{" "}
							<span className="font-bold">{deckName}</span> deck.
						</>
						<>All cards will be available for review again.</>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row items-center justify-center gap-2">
					<AlertDialogCancel className="my-auto w-full">
						No, keep my progress
					</AlertDialogCancel>
					<AlertDialogAction
						className="w-full rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={handleReset}
						disabled={isResetting}
					>
						{isResetting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
