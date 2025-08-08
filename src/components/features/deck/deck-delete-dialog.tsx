import {
	MoreHorizontalIcon,
	PencilIcon,
	ShareIcon,
	Trash2Icon,
} from "lucide-react";

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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeckActionsBtnProps {
	deckId: string;
	deckName: string;
	onDeleteDeck: (deckId: string) => void;
	onRenameDeck: () => void;
	onShareDeck?: () => void;
}

export default function DeckActionsBtn({
	deckId,
	deckName,
	onDeleteDeck,
	onRenameDeck,
	onShareDeck,
}: DeckActionsBtnProps) {
	const handleShare = () => {
		if (onShareDeck) {
			onShareDeck();
		} else {
			// Default share behavior - copy deck URL to clipboard
			const deckUrl = `${window.location.origin}/deck/${deckId}`;
			navigator.clipboard.writeText(deckUrl);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuItem onClick={onRenameDeck}>
					<PencilIcon className="mr-2 h-4 w-4" />
					Rename
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleShare}>
					<ShareIcon className="mr-2 h-4 w-4" />
					Share
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className="text-destructive focus:text-destructive"
						>
							<Trash2Icon className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
