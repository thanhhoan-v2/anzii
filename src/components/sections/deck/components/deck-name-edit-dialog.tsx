"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeckNameEditDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function DeckNameEditDialog({
	isOpen,
	onOpenChange,
	onConfirm,
	onCancel,
}: DeckNameEditDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Save Changes?</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes to the deck name. Are you sure you want to
						save them?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>No, cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>
						Yes, save changes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
