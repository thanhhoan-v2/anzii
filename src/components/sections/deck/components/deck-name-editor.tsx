"use client";

import { Edit, Loader2, Save } from "lucide-react";

import {
	AnimatedSkeleton,
	SkeletonTransition,
} from "@/components/common/loading-skeleton";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface DeckNameEditorProps {
	deckName: string;
	isEditing: boolean;
	isPending: boolean;
	onStartEdit: () => void;
	onSave: () => void;
	onNameChange: (name: string) => void;
}

export default function DeckNameEditor({
	deckName,
	isEditing,
	isPending,
	onStartEdit,
	onSave,
	onNameChange,
}: DeckNameEditorProps) {
	return (
		<div className="flex items-center justify-between">
			{isEditing ? (
				<div className="flex w-full items-center gap-2">
					<Input
						value={deckName}
						onChange={(e) => onNameChange(e.target.value)}
						className="text-2xl font-semibold transition-all duration-200 md:text-3xl"
						disabled={isPending}
					/>
					<Button
						size="icon"
						onClick={onSave}
						disabled={isPending}
						className={`transition-all duration-200 ${
							isPending ? "cursor-not-allowed opacity-75" : "hover:scale-105"
						}`}
					>
						{isPending ? (
							<Loader2 className="animate-rotate-smooth" />
						) : (
							<Save />
						)}
					</Button>
				</div>
			) : (
				<div className="flex items-center gap-2">
					<SkeletonTransition
						isLoading={isPending}
						skeleton={<AnimatedSkeleton className="h-9 w-64" />}
					>
						<CardTitle className="text-3xl transition-all duration-300">
							{deckName}
						</CardTitle>
					</SkeletonTransition>
					<Button
						variant="ghost"
						size="icon"
						onClick={onStartEdit}
						disabled={isPending}
						className="transition-all duration-200 hover:scale-105"
					>
						<Edit />
					</Button>
				</div>
			)}
		</div>
	);
}
