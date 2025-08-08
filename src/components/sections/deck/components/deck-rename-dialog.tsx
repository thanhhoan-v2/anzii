"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeckRenameDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	currentName: string;
	onRename: (newName: string) => Promise<void>;
	isPending?: boolean;
}

export default function DeckRenameDialog({
	isOpen,
	onOpenChange,
	currentName,
	onRename,
	isPending = false,
}: DeckRenameDialogProps) {
	const [newName, setNewName] = useState(currentName);
	const [error, setError] = useState("");

	// Reset form when dialog opens/closes
	useEffect(() => {
		if (isOpen) {
			setNewName(currentName);
			setError("");
		}
	}, [isOpen, currentName]);

	const handleSubmit = async () => {
		const trimmedName = newName.trim();

		if (trimmedName.length < 3) {
			setError("Deck name must be at least 3 characters long");
			return;
		}

		if (trimmedName === currentName) {
			onOpenChange(false);
			return;
		}

		try {
			await onRename(trimmedName);
			onOpenChange(false);
		} catch (error) {
			setError("Failed to rename deck. Please try again.");
		}
	};

	const handleCancel = () => {
		setNewName(currentName);
		setError("");
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Rename Deck</DialogTitle>
					<DialogDescription>
						Enter a new name for your deck. The name must be at least 3
						characters long.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="deck-name">Deck Name</Label>
						<Input
							id="deck-name"
							value={newName}
							onChange={(e) => {
								setNewName(e.target.value);
								if (error) setError("");
							}}
							placeholder="Enter deck name..."
							disabled={isPending}
							className={error ? "border-destructive" : ""}
						/>
						{error && <p className="text-sm text-destructive">{error}</p>}
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleCancel} disabled={isPending}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isPending || newName.trim().length < 3}
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Renaming...
							</>
						) : (
							"Rename"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
