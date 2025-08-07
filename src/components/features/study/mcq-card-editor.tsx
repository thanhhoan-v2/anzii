"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Card } from "@/types";

const MCQFormSchema = z.object({
	question: z.string().min(1, { message: "Question cannot be empty." }),
	options: z
		.array(z.string())
		.min(2, { message: "At least 2 options are required." }),
	correctAnswer: z
		.string()
		.min(1, { message: "Please select the correct answer." }),
	explanation: z.string().optional(),
});

interface MCQCardEditorProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSave: (data: { question: string; answer: string }) => void;
	cardToEdit: Card | null;
}

export default function MCQCardEditor({
	isOpen,
	onOpenChange,
	onSave,
	cardToEdit,
}: MCQCardEditorProps) {
	const [options, setOptions] = useState<string[]>(["", "", "", ""]);
	const [correctAnswer, setCorrectAnswer] = useState<string>("");
	const [explanation, setExplanation] = useState<string>("");

	const form = useForm<z.infer<typeof MCQFormSchema>>({
		resolver: zodResolver(MCQFormSchema),
		defaultValues: {
			question: "",
			options: ["", "", "", ""],
			correctAnswer: "",
			explanation: "",
		},
	});

	// Parse existing MCQ data when editing
	useEffect(() => {
		if (cardToEdit) {
			try {
				const answerText = cardToEdit.answer;

				// Extract options
				const optionsMatch = answerText.match(/([A-D]\)[^,]+)/g);
				const parsedOptions = optionsMatch?.map((option, index) =>
					option.replace(/^[A-D]\)\s*/, "").trim()
				) || ["", "", "", ""];

				// Extract correct answer
				const correctAnswerMatch = answerText.match(
					/Correct answer:\s*([A-D])/i
				);
				const parsedCorrectAnswer = correctAnswerMatch?.[1] || "";

				// Extract explanation
				const explanationMatch = answerText.match(/Explanation:\s*(.+)$/i);
				const parsedExplanation = explanationMatch?.[1]?.trim() || "";

				form.reset({
					question: cardToEdit.question,
					options: parsedOptions,
					correctAnswer: parsedCorrectAnswer,
					explanation: parsedExplanation,
				});

				setOptions(parsedOptions);
				setCorrectAnswer(parsedCorrectAnswer);
				setExplanation(parsedExplanation);
			} catch (error) {
				// Fallback for malformed data
				form.reset({
					question: cardToEdit.question,
					options: ["", "", "", ""],
					correctAnswer: "",
					explanation: "",
				});
			}
		} else {
			form.reset({
				question: "",
				options: ["", "", "", ""],
				correctAnswer: "",
				explanation: "",
			});
			setOptions(["", "", "", ""]);
			setCorrectAnswer("");
			setExplanation("");
		}
	}, [cardToEdit, form]);

	const handleOptionChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
		form.setValue("options", newOptions);
	};

	const addOption = () => {
		if (options.length < 8) {
			const newOptions = [...options, ""];
			setOptions(newOptions);
			form.setValue("options", newOptions);
		}
	};

	const removeOption = (index: number) => {
		if (options.length > 2) {
			const newOptions = options.filter((_, i) => i !== index);
			setOptions(newOptions);
			form.setValue("options", newOptions);

			// Update correct answer if it was the removed option
			if (correctAnswer === String.fromCharCode(65 + index)) {
				setCorrectAnswer("");
				form.setValue("correctAnswer", "");
			}
		}
	};

	const handleCorrectAnswerChange = (value: string) => {
		setCorrectAnswer(value);
		form.setValue("correctAnswer", value);
	};

	const handleExplanationChange = (value: string) => {
		setExplanation(value);
		form.setValue("explanation", value);
	};

	const handleSubmit = (data: z.infer<typeof MCQFormSchema>) => {
		// Format the answer as expected by the MCQ card component
		const formattedOptions = options
			.filter((option) => option.trim() !== "")
			.map(
				(option, index) =>
					`${String.fromCharCode(65 + index)}) ${option.trim()}`
			)
			.join(", ");

		let answerText = `${formattedOptions}. Correct answer: ${correctAnswer}`;
		if (explanation.trim()) {
			answerText += `. Explanation: ${explanation.trim()}`;
		}

		onSave({
			question: data.question,
			answer: answerText,
		});

		form.reset();
		setOptions(["", "", "", ""]);
		setCorrectAnswer("");
		setExplanation("");
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
			setOptions(["", "", "", ""]);
			setCorrectAnswer("");
			setExplanation("");
		}
		onOpenChange(open);
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>
						{cardToEdit ? "Edit MCQ Card" : "Add New MCQ Card"}
					</DialogTitle>
					<DialogDescription>
						{cardToEdit
							? "Modify the multiple choice question, options, and correct answer."
							: "Create a new multiple choice question with options and correct answer."}
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
											placeholder="Enter the multiple choice question"
											{...field}
											className="min-h-[100px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-4">
							<FormLabel>Options</FormLabel>
							{options.map((option, index) => (
								<div key={index} className="flex items-center space-x-2">
									<span className="w-6 text-sm font-medium">
										{String.fromCharCode(65 + index)})
									</span>
									<Input
										placeholder={`Option ${String.fromCharCode(65 + index)}`}
										value={option}
										onChange={(e) => handleOptionChange(index, e.target.value)}
										className="flex-1"
									/>
									{options.length > 2 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeOption(index)}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
								</div>
							))}
							{options.length < 8 && (
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addOption}
									className="w-full"
								>
									<Plus className="mr-2 h-4 w-4" />
									Add Option
								</Button>
							)}
						</div>

						<FormField
							control={form.control}
							name="correctAnswer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correct Answer</FormLabel>
									<FormControl>
										<RadioGroup
											value={correctAnswer}
											onValueChange={handleCorrectAnswerChange}
											className="space-y-2"
										>
											{options.map(
												(option, index) =>
													option.trim() && (
														<div
															key={index}
															className="flex items-center space-x-2"
														>
															<RadioGroupItem
																value={String.fromCharCode(65 + index)}
																id={`option-${index}`}
															/>
															<label
																htmlFor={`option-${index}`}
																className="text-sm"
															>
																{String.fromCharCode(65 + index)}) {option}
															</label>
														</div>
													)
											)}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="explanation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Explanation (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Explain why this is the correct answer"
											value={explanation}
											onChange={(e) => handleExplanationChange(e.target.value)}
											className="min-h-[80px]"
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
							<Button type="submit">Save MCQ Card</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
