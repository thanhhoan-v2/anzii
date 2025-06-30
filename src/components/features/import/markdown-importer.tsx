"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createDeckFromMarkdown } from "@/lib/actions";

interface MarkdownImporterProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSuccess: () => void;
}

const FormSchema = z.object({
	topic: z
		.string()
		.min(3, { message: "Deck name must be at least 3 characters." }),
	markdown: z
		.string()
		.min(20, { message: "Markdown content must be at least 20 characters." }),
});

export default function MarkdownImporter({
	isOpen,
	onOpenChange,
	onSuccess,
}: MarkdownImporterProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			topic: "",
			markdown: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setIsLoading(true);
		try {
			const result = await createDeckFromMarkdown(data);

			if (result.success) {
				onSuccess();
				form.reset();
			} else {
				toast({
					variant: "destructive",
					title: "Error",
					description: result.error,
				});
			}
		} catch (error) {
			console.error("AI deck generation error:", error);
			toast({
				variant: "destructive",
				title: "AI Error",
				description: "Could not generate deck. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	const handleOpenChange = (open: boolean) => {
		if (!isLoading) {
			onOpenChange(open);
			if (!open) {
				form.reset();
			}
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create Deck with AI</DialogTitle>
					<DialogDescription>
						Paste your notes in Markdown format below. The AI will generate
						flashcards for you.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="topic"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Deck Name / Topic</FormLabel>
									<FormControl>
										<Input placeholder="e.g., 'Photosynthesis'" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="markdown"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Markdown Notes</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Paste your notes here... e.g., `# Mitochondria\n- The powerhouse of the cell.`"
											className="min-h-[250px] resize-y"
											{...field}
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
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Generating...
									</>
								) : (
									"Generate Deck"
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
