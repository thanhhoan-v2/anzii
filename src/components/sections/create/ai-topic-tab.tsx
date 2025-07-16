"use client";

import { Bot, Loader2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { createDeckFromAi } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";

export default function AiTopicTab() {
	const router = useRouter();
	const { toast } = useToast();

	// AI topic state
	const [aiTopic, setAiTopic] = useState("");
	const [isCreatingAi, setIsCreatingAi] = useState(false);

	const handleAiCreate = async () => {
		if (!aiTopic.trim()) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please enter a topic.",
			});
			return;
		}

		setIsCreatingAi(true);
		try {
			const result = await createDeckFromAi({ topic: aiTopic.trim() });
			if (result.success) {
				toast({
					title: "Deck Generated!",
					description: "Your AI deck has been created.",
				});
				router.push(ROUTES.DASHBOARD);
			} else {
				throw new Error(result.error);
			}
		} catch {
			toast({
				variant: "destructive",
				title: "AI Error",
				description: "Could not generate deck. Please try again.",
			});
		} finally {
			setIsCreatingAi(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{/* <Bot className="w-5 h-5" /> */}
					AI Topic Generation
				</CardTitle>
				<CardDescription>
					Enter a topic and let AI generate a complete flashcard deck for you
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="aiTopic">Topic</Label>
					<Input
						id="aiTopic"
						placeholder="e.g., 'The Roman Empire', 'Python Programming', 'Photosynthesis'..."
						value={aiTopic}
						onChange={(e) => setAiTopic(e.target.value)}
						className="mt-2"
					/>
				</div>

				<Button
					onClick={handleAiCreate}
					disabled={isCreatingAi}
					className="w-full"
				>
					{isCreatingAi ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Generating Deck...
						</>
					) : (
						<>
							<Bot className="mr-2 h-4 w-4" />
							Generate with AI
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
