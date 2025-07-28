"use client";

import { useUser } from "@stackframe/stack";
import { type Easing, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/types";

interface FlashcardProps {
	card: CardType;
	isFlipped: boolean;
}

export default function Flashcard({ card, isFlipped }: FlashcardProps) {
	const user = useUser();
	// Default to 'flip' if the animation type is not set
	const userDeckAnimation = user?.clientMetadata?.deckAnimation || "flip";

	const isFlip = userDeckAnimation === "flip";

	// Define animation variants for each animation type
	const getAnimationProps = () => {
		switch (userDeckAnimation) {
			case "fade":
				return {
					front: {
						animate: { opacity: isFlipped ? 0 : 1 },
						transition: { duration: 0.4 },
					},
					back: {
						animate: { opacity: isFlipped ? 1 : 0 },
						transition: { duration: 0.4 },
					},
				};
			case "slide":
				return {
					front: {
						animate: { x: isFlipped ? "-100%" : "0%" },
						transition: { duration: 0.4, ease: "easeInOut" as Easing },
					},
					back: {
						initial: { x: "100%" },
						animate: { x: isFlipped ? "0%" : "100%" },
						transition: { duration: 0.4, ease: "easeInOut" as Easing },
					},
				};
			case "flip":
			default:
				return {
					container: {
						animate: { rotateY: isFlipped ? 180 : 0 },
						transition: { duration: 0.5 },
					},
				};
		}
	};

	const animationProps = getAnimationProps();

	return (
		<div
			className={cn(
				"w-full max-w-2xl h-96",
				isFlip ? "[perspective:1000px]" : "overflow-hidden"
			)}
		>
			<motion.div
				className={cn(
					"relative shadow-xl rounded-xl w-full h-full",
					isFlip && "[transform-style:preserve-3d]"
				)}
				{...(animationProps.container || {})}
			>
				{/* Front of Card */}
				<motion.div
					className={cn(
						"absolute inset-0",
						isFlip && "[backface-visibility:hidden]"
					)}
					{...(animationProps.front || {})}
				>
					<Card className="w-full h-full">
						<CardContent className="flex flex-col justify-center items-center p-6 h-full">
							<ScrollArea className="w-full h-full">
								<div className="dark:prose-invert p-4 max-w-none font-semibold text-white text-xl md:text-2xl prose">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{card.question}
									</ReactMarkdown>
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</motion.div>

				{/* Back of Card */}
				<motion.div
					className={cn(
						"absolute inset-0",
						isFlip && "[backface-visibility:hidden] [transform:rotateY(180deg)]"
					)}
					{...(animationProps.back || {})}
				>
					<Card className="w-full h-full">
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
				</motion.div>
			</motion.div>
		</div>
	);
}
