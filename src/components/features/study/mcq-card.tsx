"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/types";

interface MCQCardProps {
	card: CardType;
	onAnswer: (selectedOptions: string[], isCorrect: boolean) => void;
}

interface MCQOption {
	letter: string;
	text: string;
}

interface MCQAnswer {
	correctAnswer: string;
	explanation?: string;
}

export default function MCQCard({ card, onAnswer }: MCQCardProps) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	// Parse MCQ data from the card
	const parseMCQData = (): { options: MCQOption[]; answer: MCQAnswer } => {
		try {
			// Parse the answer field which should contain MCQ data
			// Expected format: "A) Option A, B) Option B, C) Option C, D) Option D. Correct answer: A"
			const answerText = card.answer;

			// Try to extract options using a more robust approach
			let options: MCQOption[] = [];

			// First, try to find all A), B), C), D) patterns
			const optionLetters = ["A", "B", "C", "D"];
			const optionPatterns = optionLetters.map(
				(letter) =>
					new RegExp(
						`${letter}\\)[^,]+?(?=,\\s*[A-D]\\)|\\.\\s*Correct answer|$)`,
						"g"
					)
			);

			for (let i = 0; i < optionLetters.length; i++) {
				const pattern = optionPatterns[i];
				const matches = answerText.match(pattern);
				if (matches && matches.length > 0) {
					const text = matches[0].replace(/^[A-D]\)\s*/, "").trim();
					options.push({
						letter: optionLetters[i],
						text: text,
					});
				}
			}

			// Extract correct answer
			const correctAnswerMatch = answerText.match(/Correct answer:\s*([A-D])/i);
			const correctAnswer = correctAnswerMatch?.[1] || "A";

			// Extract explanation if present
			const explanationMatch = answerText.match(/Explanation:\s*(.+)$/i);
			const explanation = explanationMatch?.[1]?.trim();

			// Validate that the correct answer exists in the options
			const validCorrectAnswer = options.some(
				(opt) => opt.letter === correctAnswer
			)
				? correctAnswer
				: options.length > 0
					? options[0].letter
					: "A";

			// If we have no options or invalid data, use fallback
			if (options.length === 0) {
				return {
					options: [
						{ letter: "A", text: "Option A" },
						{ letter: "B", text: "Option B" },
						{ letter: "C", text: "Option C" },
						{ letter: "D", text: "Option D" },
					],
					answer: {
						correctAnswer: "A",
					},
				};
			}

			return {
				options,
				answer: {
					correctAnswer: validCorrectAnswer,
					explanation,
				},
			};
		} catch (error) {
			// Fallback for malformed data
			return {
				options: [
					{ letter: "A", text: "Option A" },
					{ letter: "B", text: "Option B" },
					{ letter: "C", text: "Option C" },
					{ letter: "D", text: "Option D" },
				],
				answer: {
					correctAnswer: "A",
				},
			};
		}
	};

	const { options, answer } = parseMCQData();

	const handleOptionToggle = (letter: string) => {
		if (hasAnswered) return; // Prevent changes after answering

		setSelectedOptions((prev) =>
			prev.includes(letter)
				? prev.filter((opt) => opt !== letter)
				: [...prev, letter]
		);
	};

	const handleSubmit = () => {
		if (selectedOptions.length === 0) return;

		const correct = selectedOptions.includes(answer.correctAnswer);
		setIsCorrect(correct);
		setHasAnswered(true);

		// Don't call onAnswer here, wait for user to click "Next Question"
	};

	const handleNext = () => {
		// Call onAnswer only when moving to next question
		onAnswer(selectedOptions, isCorrect);

		// Reset state for next question
		setSelectedOptions([]);
		setHasAnswered(false);
		setIsCorrect(false);
	};

	const getOptionStatus = (letter: string) => {
		if (!hasAnswered) return "default";
		if (letter === answer.correctAnswer) return "correct";
		if (selectedOptions.includes(letter) && letter !== answer.correctAnswer)
			return "incorrect";
		return "default";
	};

	return (
		<div className="w-full max-w-2xl" data-testid="mcq-card">
			<Card className="w-full">
				<CardContent className="p-6">
					{/* Question */}
					<div className="mb-6">
						<ScrollArea className="max-h-32 text-lg font-bold">
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{card.question}
							</ReactMarkdown>
						</ScrollArea>
					</div>

					{/* Options */}
					<div className="mb-6 space-y-3">
						{options.map((option) => {
							const status = getOptionStatus(option.letter);
							const isSelected = selectedOptions.includes(option.letter);

							return (
								<div
									key={option.letter}
									data-testid="mcq-option"
									className={cn(
										"flex items-center space-x-3 rounded-lg border p-3 transition-all",
										{
											"border-primary bg-primary/5": isSelected && !hasAnswered,
											"border-green-500 bg-green-50 dark:bg-green-950":
												status === "correct",
											"border-red-500 bg-red-50 dark:bg-red-950":
												status === "incorrect",
											"cursor-pointer hover:bg-muted/50": !hasAnswered,
											"cursor-not-allowed": hasAnswered,
										}
									)}
									onClick={() => handleOptionToggle(option.letter)}
								>
									<Checkbox
										checked={isSelected}
										onCheckedChange={() => handleOptionToggle(option.letter)}
										disabled={hasAnswered}
										className={cn(
											"data-[state=checked]:border-primary data-[state=checked]:bg-primary",
											{
												"data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500":
													status === "correct",
												"data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500":
													status === "incorrect",
											}
										)}
									/>
									<div className="flex flex-1 items-center space-x-2">
										<span className="w-6 text-sm font-medium">
											{option.letter})
										</span>
										<span className="text-sm">{option.text}</span>
									</div>
									{hasAnswered && (
										<div className="ml-2">
											{status === "correct" && (
												<CheckCircle className="h-5 w-5 text-green-500" />
											)}
											{status === "incorrect" && (
												<XCircle className="h-5 w-5 text-red-500" />
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>

					{/* Answer Feedback */}

					{/* Action Button */}
					<div className="flex justify-center">
						{!hasAnswered ? (
							<Button
								onClick={handleSubmit}
								disabled={selectedOptions.length === 0}
								size="lg"
								className="w-32"
								data-testid="submit-answer-button"
							>
								Submit Answer
							</Button>
						) : (
							<Button
								onClick={handleNext}
								size="lg"
								className="w-32"
								data-testid="next-question-button"
							>
								Next Question
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
