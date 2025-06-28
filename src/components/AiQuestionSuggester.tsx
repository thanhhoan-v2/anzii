"use client";

import { suggestQuestions } from "@/ai/flows/suggest-questions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";

const FormSchema = z.object({
	topic: z.string().min(3, {
		message: "Topic must be at least 3 characters.",
	}),
});

export default function AiQuestionSuggester() {
	const [suggestions, setSuggestions] = React.useState<string[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			topic: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setIsLoading(true);
		setSuggestions([]);
		try {
			const result = await suggestQuestions({ topic: data.topic });
			setSuggestions(result.questions);
		} catch (error) {
			console.error("AI suggestion error:", error);
			toast({
				variant: "destructive",
				title: "AI Error",
				description: "Could not generate suggestions. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card className="shadow-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Sparkles /> AI Assistant
				</CardTitle>
				<CardDescription>Get question ideas for a topic.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="topic"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Topic</FormLabel>
									<FormControl>
										<Input placeholder="e.g., 'React Hooks'" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isLoading} className="w-full">
							{isLoading ? (
								<>
									<Loader2 className="mr-2 w-4 h-4 animate-spin" />
									Generating...
								</>
							) : (
								"Suggest Questions"
							)}
						</Button>
					</form>
				</Form>

				{(isLoading || suggestions.length > 0) && (
					<div className="mt-6">
						<h4 className="mb-2 font-medium text-sm">Suggestions:</h4>
						<ScrollArea className="p-4 border rounded-md w-full h-48">
							{isLoading ? (
								<div className="space-y-2">
									<p className="text-muted-foreground text-sm animate-pulse">
										Thinking of great questions...
									</p>
								</div>
							) : (
								<ul className="space-y-2 text-sm list-disc list-inside">
									{suggestions.map((q, i) => (
										<li key={i}>{q}</li>
									))}
								</ul>
							)}
						</ScrollArea>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
