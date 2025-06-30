"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { Card } from "@/types";

const FormSchema = z.object({
	question: z.string().min(1, { message: "Question cannot be empty." }),
	answer: z.string().min(1, { message: "Answer cannot be empty." }),
});

interface CardEditorProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSave: (data: { question: string; answer: string }) => void;
	cardToEdit: Card | null;
}

export default function CardEditor({
	isOpen,
	onOpenChange,
	onSave,
	cardToEdit,
}: CardEditorProps) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: "",
			answer: "",
		},
	});

	useEffect(() => {
		if (cardToEdit) {
			form.reset({
				question: cardToEdit.question,
				answer: cardToEdit.answer,
			});
		} else {
			form.reset({
				question: "",
				answer: "",
			});
		}
	}, [cardToEdit, form]);

	const handleSubmit = (data: z.infer<typeof FormSchema>) => {
		onSave(data);
		form.reset();
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
		}
		onOpenChange(open);
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{cardToEdit ? "Edit Card" : "Add New Card"}</DialogTitle>
					<DialogDescription>
						{cardToEdit
							? "Modify the question or answer for this card."
							: "Create a new question and answer pair."}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4 py-4"
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Question</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter the question"
											{...field}
											className="min-h-[100px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="answer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Answer</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter the answer"
											{...field}
											className="min-h-[100px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="button"
								variant="ghost"
								onClick={() => handleOpenChange(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Save Card</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
