"use client";

import { Edit, Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
import { TableCell, TableRow } from "@/components/ui/table";
import type { Card as CardType } from "@/types";

interface CardRowProps {
	card: CardType;
	onEdit: (card: CardType) => void;
	onDelete: (cardId: string) => void;
	isUpdatePending: boolean;
	isDeletePending: boolean;
	isActive: boolean;
	onToggle: () => void;
}

export default function CardRow({
	card,
	onEdit,
	onDelete,
	isUpdatePending,
	isDeletePending,
	isActive,
	onToggle,
}: CardRowProps) {
	if (isActive) {
		return (
			<TableRow
				key={card.id}
				className="cursor-pointer transition-colors hover:bg-muted/50"
				onClick={onToggle}
			>
				<TableCell colSpan={2} className="p-4">
					<div className="flex justify-center gap-2">
						<Button
							onClick={(e) => {
								e.stopPropagation();
								onEdit(card);
							}}
							disabled={isUpdatePending}
							className={`transition-all duration-200 ${
								isUpdatePending
									? "cursor-not-allowed opacity-50"
									: "hover:scale-105"
							}`}
						>
							{isUpdatePending ? (
								<Loader2 className="animate-rotate-smooth h-4 w-4" />
							) : (
								<Edit className="h-4 w-4" />
							)}
							<span className="ml-1">Edit</span>
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="secondary"
									className="text-destructive transition-all duration-200 hover:scale-105 hover:text-destructive"
									disabled={isDeletePending}
									onClick={(e) => e.stopPropagation()}
								>
									{isDeletePending ? (
										<Loader2 className="animate-rotate-smooth h-4 w-4" />
									) : (
										<Trash2 className="h-4 w-4" />
									)}
									<span className="ml-1">Delete</span>
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Delete this card?</AlertDialogTitle>
									<AlertDialogDescription>
										This will permanently delete this card. This action cannot
										be undone.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => onDelete(card.id)}>
										Delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</TableCell>
			</TableRow>
		);
	}

	return (
		<TableRow
			key={card.id}
			className="cursor-pointer transition-colors hover:bg-muted/50"
			onClick={onToggle}
		>
			<TableCell className="border-r align-top">
				<div className="prose prose-sm max-w-none text-foreground [&_*]:text-foreground">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{card.question}
					</ReactMarkdown>
				</div>
			</TableCell>
			<TableCell className="align-top">
				<div className="prose prose-sm max-w-none text-muted-foreground [&_*]:text-muted-foreground">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{card.answer}
					</ReactMarkdown>
				</div>
			</TableCell>
		</TableRow>
	);
}
