"use server";

/**
 * @fileOverview Generates AI question suggestions for a given topic.
 *
 * - suggestQuestions - A function that generates question suggestions for a given topic.
 * - SuggestQuestionsInput - The input type for the suggestQuestions function.
 * - SuggestQuestionsOutput - The return type for the suggestQuestions function.
 */

import { generateText, Output } from "ai";
import { z } from "zod";

import { ai } from "@/ai/config";

const SuggestQuestionsInputSchema = z.object({
	topic: z.string().describe("The topic to generate questions for."),
});
export type SuggestQuestionsInput = z.infer<typeof SuggestQuestionsInputSchema>;

const SuggestQuestionsOutputSchema = z.object({
	questions: z
		.array(z.string())
		.describe("An array of suggested questions for the topic."),
});
export type SuggestQuestionsOutput = z.infer<
	typeof SuggestQuestionsOutputSchema
>;

export async function suggestQuestions(
	input: SuggestQuestionsInput
): Promise<SuggestQuestionsOutput> {
	const prompt = `You are an AI assistant that helps users create flashcards.

Given a topic, generate a list of questions that would be helpful for learning the topic.

Topic: ${input.topic}

Generate 5-10 questions that would make good flashcards for this topic.`;

	const result = await generateText({
		model: ai,
		prompt,
		experimental_output: Output.object({
			schema: SuggestQuestionsOutputSchema,
		}),
	});

	return result.experimental_output as SuggestQuestionsOutput;
}
