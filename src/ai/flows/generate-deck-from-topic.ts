"use server";

/**
 * @fileOverview Generates a full flashcard deck from a topic using AI.
 *
 * - generateDeckFromTopic - A function that handles deck generation from a topic.
 * - GenerateDeckFromTopicInput - The input type for the function.
 * - GenerateDeckFromTopicOutput - The return type for the function.
 */

import { z } from "genkit";

import { ai } from "@/ai/genkit";

const GenerateDeckFromTopicInputSchema = z.object({
	topic: z.string().describe("The topic to generate a flashcard deck for."),
	numberOfCards: z
		.number()
		.optional()
		.describe("The number of flashcards to generate (5-30)."),
	description: z
		.string()
		.optional()
		.describe("Additional context or focus areas for the flashcards."),
});
export type GenerateDeckFromTopicInput = z.infer<
	typeof GenerateDeckFromTopicInputSchema
>;

const GenerateDeckFromTopicOutputSchema = z.object({
	cards: z
		.array(
			z.object({
				question: z
					.string()
					.describe(
						"The question for the flashcard. This should be a clear, concise question covering a key concept of the topic."
					),
				answer: z
					.string()
					.describe(
						"The answer for the flashcard. This should be a detailed and accurate answer to the question, suitable for learning."
					),
			})
		)
		.describe("An array of generated flashcards."),
});
export type GenerateDeckFromTopicOutput = z.infer<
	typeof GenerateDeckFromTopicOutputSchema
>;

export async function generateDeckFromTopic(
	input: GenerateDeckFromTopicInput
): Promise<GenerateDeckFromTopicOutput> {
	return generateDeckFromTopicFlow(input);
}

const prompt = ai.definePrompt({
	name: "generateDeckFromTopicPrompt",
	input: { schema: GenerateDeckFromTopicInputSchema },
	output: { schema: GenerateDeckFromTopicOutputSchema },
	prompt: `You are an AI assistant that creates comprehensive flashcard decks for students.
You will be given a topic and configuration. Your task is to generate a list of question and answer pairs that are suitable for flashcards for learning about that topic.

Generate {{#if numberOfCards}}{{numberOfCards}}{{else}}10-20{{/if}} flashcards.
The questions should be clear and concise. The answers should be accurate and directly address the questions, providing enough detail for a student to learn from.
Ensure the generated cards cover the key concepts of the provided topic.

Topic: {{{topic}}}
{{#if description}}
Additional context: {{{description}}}
{{/if}}
`,
});

const generateDeckFromTopicFlow = ai.defineFlow(
	{
		name: "generateDeckFromTopicFlow",
		inputSchema: GenerateDeckFromTopicInputSchema,
		outputSchema: GenerateDeckFromTopicOutputSchema,
	},
	async (input) => {
		const { output } = await prompt(input);
		return output!;
	}
);
