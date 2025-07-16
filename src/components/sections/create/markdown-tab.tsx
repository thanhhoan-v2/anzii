"use client";

import { FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createDeckFromMarkdown } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";

export default function MarkdownTab() {
	const router = useRouter();
	const { toast } = useToast();

	// Markdown state
	const [markdownTopic, setMarkdownTopic] = useState("");
	const [markdownContent, setMarkdownContent] = useState("");
	const [isCreatingMarkdown, setIsCreatingMarkdown] = useState(false);

	const handleMarkdownCreate = async () => {
		if (!markdownTopic.trim() || !markdownContent.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please fill in both topic and markdown content.",
			});
			return;
		}

		setIsCreatingMarkdown(true);
		try {
			const result = await createDeckFromMarkdown({
				topic: markdownTopic.trim(),
				markdown: markdownContent.trim(),
			});
			if (result.success) {
				toast({
					title: "Deck Created!",
					description: "Your deck has been generated from markdown.",
				});
				router.push(ROUTES.DASHBOARD);
			} else {
				throw new Error(result.error);
			}
		} catch {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Could not create deck from markdown.",
			});
		} finally {
			setIsCreatingMarkdown(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{/* <FileText className="w-5 h-5" /> */}
					Markdown to Cards
				</CardTitle>
				<CardDescription>
					Paste your notes in Markdown format and AI will generate flashcards
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="markdownTopic">Deck Name / Topic</Label>
					<Input
						id="markdownTopic"
						placeholder="e.g., 'Biology Notes', 'History Chapter 5'..."
						value={markdownTopic}
						onChange={(e) => setMarkdownTopic(e.target.value)}
						className="mt-2"
					/>
				</div>

				<div>
					<Label htmlFor="markdownContent">Markdown Content</Label>
					<Textarea
						id="markdownContent"
						placeholder="Paste your notes here... e.g., '# Mitochondria\n- The powerhouse of the cell.'"
						value={markdownContent}
						onChange={(e) => setMarkdownContent(e.target.value)}
						className="mt-2 min-h-[300px]"
					/>
				</div>

				<Button
					onClick={handleMarkdownCreate}
					disabled={isCreatingMarkdown}
					className="w-full"
				>
					{isCreatingMarkdown ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Processing Markdown...
						</>
					) : (
						<>
							<FileText className="mr-2 h-4 w-4" />
							Generate from Markdown
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
