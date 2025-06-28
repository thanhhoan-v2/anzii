"use server";

/**
 * @fileOverview Generates AI question suggestions for a given topic.
 *
 * - suggestQuestions - A function that generates question suggestions for a given topic.
 * - SuggestQuestionsInput - The input type for the suggestQuestions function.
 * - SuggestQuestionsOutput - The return type for the suggestQuestions function.
 */

import { z } from "genkit";
import { ai } from "@/ai/genkit";

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
	return suggestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
	name: "suggestQuestionsPrompt",
	input: { schema: SuggestQuestionsInputSchema },
	output: { schema: SuggestQuestionsOutputSchema },
	prompt: `You are an AI assistant that helps users create flashcards.

  Given a topic, generate a list of questions that would be helpful for learning the topic.

  Topic: {{{topic}}}

  Questions:`,
});

const suggestQuestionsFlow = ai.defineFlow(
	{
		name: "suggestQuestionsFlow",
		inputSchema: SuggestQuestionsInputSchema,
		outputSchema: SuggestQuestionsOutputSchema,
	},
	async (input) => {
		const { output } = await prompt(input);
		return output!;
	}
);
