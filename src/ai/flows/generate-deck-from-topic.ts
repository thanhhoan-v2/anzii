"use server";

/**
 * @fileOverview Generates a full flashcard deck from a topic using AI.
 *
 * - generateDeckFromTopic - A function that handles deck generation from a topic.
 * - GenerateDeckFromTopicInput - The input type for the function.
 * - GenerateDeckFromTopicOutput - The return type for the function.
 */

import { generateText, Output } from "ai";
import { z } from "zod";

import { ai } from "@/ai/config";

const GenerateDeckFromTopicInputSchema = z.object({
	topic: z.string().describe("The topic to generate a flashcard deck for."),
	numberOfCards: z
		.number()
		.optional()
		.describe("The number of flashcards to generate."),
	description: z
		.string()
		.optional()
		.describe("Additional context or focus areas for the flashcards."),
	cardTypes: z
		.object({
			flashcard: z.boolean(),
			mcq: z.boolean(),
			fillInBlanks: z.boolean(),
		})
		.optional()
		.describe("Types of cards to generate."),
	notes: z
		.string()
		.optional()
		.describe("Additional notes or instructions for AI."),
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
						"The question for the card. This should be a clear, concise question covering a key concept of the topic."
					),
				answer: z
					.string()
					.describe(
						"The answer for the card. This should be a detailed and accurate answer to the question, suitable for learning."
					),
				cardType: z
					.enum(["flashcard", "mcq", "fillInBlanks"])
					.optional()
					.describe("The type of card (flashcard, mcq, or fillInBlanks)."),
			})
		)
		.min(1)
		.describe("An array of exactly the requested number of cards."),
});
export type GenerateDeckFromTopicOutput = z.infer<
	typeof GenerateDeckFromTopicOutputSchema
>;

export async function generateDeckFromTopic(
	input: GenerateDeckFromTopicInput
): Promise<GenerateDeckFromTopicOutput> {
	const cardCount = input.numberOfCards || 15;
	const maxRetries = 3;
	let attempt = 0;

	const cardTypes = input.cardTypes || {
		flashcard: true,
		mcq: false,
		fillInBlanks: false,
	};
	const selectedTypes = Object.entries(cardTypes)
		.filter(([_, enabled]) => enabled)
		.map(([type]) => type)
		.join(", ");

	const getCardTypeInstructions = (cardType: string) => {
		switch (cardType) {
			case "mcq":
				return "For MCQ cards, create questions with multiple choice options. Format the answer as 'A) Option A, B) Option B, C) Option C, D) Option D. Correct answer: [letter]'. Each question should have exactly 4 options (A, B, C, D).";
			case "fillInBlanks":
				return "For Fill-in Blanks cards, create sentences with blanks (use ___ for blanks). The answer should be the word or phrase that fills the blank. Make sure the blanks are clear and the answers are specific.";
			default:
				return "For Flashcard cards, create clear question-answer pairs suitable for traditional flashcards. Questions should be concise and answers should be detailed but not too long.";
		}
	};

	const cardTypeInstruction = getCardTypeInstructions(
		selectedTypes || "flashcard"
	);

	const prompt = `Create a flashcard deck with exactly ${cardCount} cards for: ${input.topic}

Card type: ${selectedTypes || "flashcard"}
${cardTypeInstruction}

${input.description ? `Additional context: ${input.description}` : ""}
${input.notes ? `Additional notes: ${input.notes}` : ""}

Instructions:
1. Create exactly ${cardCount} flashcards
2. Each card should have a question and answer
3. Questions should be clear and concise
4. Answers should be accurate and detailed
5. Cover key concepts of the topic

Output format: Return a JSON object with a "cards" array containing exactly ${cardCount} card objects.`;

	while (attempt < maxRetries) {
		attempt++;

		const result = await generateText({
			model: ai,
			prompt,
			experimental_output: Output.object({
				schema: GenerateDeckFromTopicOutputSchema,
			}),
		});

		const output = result.experimental_output as GenerateDeckFromTopicOutput;

		// Validate that we got exactly the requested number of cards
		if (output.cards.length === cardCount) {
			return output;
		}

		// If this is the last attempt, throw an error
		if (attempt === maxRetries) {
			throw new Error(
				`AI generated ${output.cards.length} cards instead of the requested ${cardCount} cards after ${maxRetries} attempts. Please try again.`
			);
		}

		// Add a small delay before retrying
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	// This should never be reached, but TypeScript requires it
	throw new Error("Failed to generate cards after maximum retries");
}
