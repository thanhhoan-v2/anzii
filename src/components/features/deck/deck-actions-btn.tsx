import {
	MoreHorizontalIcon,
	PencilIcon,
	ShareIcon,
	Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import DeckRenameDialog from "@/components/sections/deck/components/deck-rename-dialog";
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
import { useToast } from "@/hooks/use-toast";

interface DeckActionsBtnProps {
	deckId: string;
	deckName: string;
	onDeleteDeck: (deckId: string) => void;
	onRenameDeck: (newName: string) => Promise<void>;
	onShareDeck?: () => void;
	isRenamePending?: boolean;
	isDeletePending?: boolean;
}

export default function DeckActionsBtn({
	deckId,
	deckName,
	onDeleteDeck,
	onRenameDeck,
	onShareDeck,
	isRenamePending = false,
	isDeletePending = false,
}: DeckActionsBtnProps) {
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { toast } = useToast();

	const handleShare = async () => {
		if (onShareDeck) {
			onShareDeck();
		} else {
			// Default share behavior - copy deck URL to clipboard
			const deckUrl = `${window.location.origin}/deck/${deckId}`;
			try {
				await navigator.clipboard.writeText(deckUrl);
				// Show a toast notification if available
				toast({
					title: "Link copied",
					description: "Deck URL copied to clipboard",
				});
			} catch (error) {
				console.error("Failed to copy deck URL:", error);
			}
		}
	};

	const handleDelete = () => {
		// Fire-and-forget mutation - no awaiting!
		onDeleteDeck(deckId);
		// Close the dropdown after deletion
		setIsDropdownOpen(false);
	};

	return (
		<>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="w-8 h-8">
						<MoreHorizontalIcon className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
						<PencilIcon className="mr-2 w-4 h-4" />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleShare}>
						<ShareIcon className="mr-2 w-4 h-4" />
						Share
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								className="text-destructive focus:text-destructive"
								disabled={isDeletePending}
							>
								<Trash2Icon className="mr-2 w-4 h-4" />
								{isDeletePending ? "Deleting..." : "Delete"}
							</DropdownMenuItem>
						</AlertDialogTrigger>
						<AlertDialogContent className="rounded-lg w-[350px]">
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
							<AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
								<AlertDialogCancel
									className="my-auto w-full"
									disabled={isDeletePending}
								>
									No, keep it
								</AlertDialogCancel>
								<AlertDialogAction
									className="bg-destructive hover:bg-destructive/90 rounded-lg w-full text-destructive-foreground"
									onClick={handleDelete}
									disabled={isDeletePending}
								>
									{isDeletePending ? "Deleting..." : "Yes, delete it"}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeckRenameDialog
				isOpen={isRenameDialogOpen}
				onOpenChange={setIsRenameDialogOpen}
				currentName={deckName}
				onRename={onRenameDeck}
				isPending={isRenamePending}
			/>
		</>
	);
}
