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
import { createDeckFromAi } from "@/lib/actions";

interface AiDeckGeneratorProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSuccess: () => void;
}

const FormSchema = z.object({
	topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
	numberOfCards: z
		.number()
		.min(5, { message: "At least 5 cards required." })
		.max(30, { message: "Maximum 30 cards allowed." }),
	description: z.string().optional(),
});

export default function AiDeckGenerator({
	isOpen,
	onOpenChange,
	onSuccess,
}: AiDeckGeneratorProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			topic: "",
			numberOfCards: 15,
			description: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setIsLoading(true);
		try {
			const result = await createDeckFromAi(data);

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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Deck with AI</DialogTitle>
					<DialogDescription>
						Configure your flashcard deck settings below.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 py-4"
					>
						<FormField
							control={form.control}
							name="topic"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Topic</FormLabel>
									<FormControl>
										<Input placeholder="Roman Empire" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="numberOfCards"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of Cards</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="5"
											max="30"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Focus areas or special requirements"
											className="min-h-[60px] resize-none"
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
										<Loader2 className="mr-2 w-4 h-4 animate-spin" />
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
