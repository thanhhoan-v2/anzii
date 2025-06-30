"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/types";

interface FlashcardProps {
	card: CardType;
	isFlipped: boolean;
	onFlip: () => void;
}

export default function Flashcard({ card, isFlipped }: FlashcardProps) {
	return (
		<div className="h-96 w-full max-w-2xl [perspective:1000px]">
			<div
				className={cn(
					"relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
					isFlipped ? "[transform:rotateY(180deg)]" : ""
				)}
			>
				{/* Front of Card */}
				<Card className="absolute inset-0 [backface-visibility:hidden]">
					<CardContent className="flex h-full flex-col items-center justify-center p-6">
						<ScrollArea className="h-full w-full">
							<div className="prose max-w-none p-4 text-xl font-semibold dark:prose-invert md:text-2xl">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{card.question}
								</ReactMarkdown>
							</div>
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Back of Card */}
				<Card className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
					<CardContent className="flex h-full flex-col items-center justify-center p-6">
						<ScrollArea className="h-full w-full">
							<div className="prose max-w-none p-4 text-lg text-muted-foreground dark:prose-invert md:text-xl">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{card.answer}
								</ReactMarkdown>
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
