"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FlashcardProps {
	card: CardType;
	isFlipped: boolean;
	onFlip: () => void;
}

export default function Flashcard({ card, isFlipped }: FlashcardProps) {
	return (
		<div className="w-full max-w-2xl h-96 [perspective:1000px]">
			<div
				className={cn(
					"relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
					isFlipped ? "[transform:rotateY(180deg)]" : ""
				)}
			>
				{/* Front of Card */}
				<Card className="absolute inset-0 [backface-visibility:hidden]">
					<CardContent className="flex flex-col justify-center items-center p-6 h-full">
						<ScrollArea className="w-full h-full">
							<div className="dark:prose-invert p-4 max-w-none font-semibold text-xl md:text-2xl prose">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{card.question}
								</ReactMarkdown>
							</div>
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Back of Card */}
				<Card className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
					<CardContent className="flex flex-col justify-center items-center p-6 h-full">
						<ScrollArea className="w-full h-full">
							<div className="dark:prose-invert p-4 max-w-none text-muted-foreground text-lg md:text-xl prose">
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
