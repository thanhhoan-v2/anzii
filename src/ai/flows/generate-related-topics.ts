"use server";

/**
 * @fileOverview Generates 3 related topics for a given topic using AI.
 *
 * - generateRelatedTopics - A function that generates 3 closely related topics.
 * - GenerateRelatedTopicsInput - The input type for the function.
 * - GenerateRelatedTopicsOutput - The return type for the function.
 */

import { generateText, Output } from "ai";
import { z } from "zod";

import { ai } from "@/ai/config";

const GenerateRelatedTopicsInputSchema = z.object({
	topic: z.string().describe("The topic to generate related topics for."),
});
export type GenerateRelatedTopicsInput = z.infer<
	typeof GenerateRelatedTopicsInputSchema
>;

const GenerateRelatedTopicsOutputSchema = z.object({
	relatedTopics: z
		.array(z.string())
		.length(3)
		.describe("An array of exactly 3 related topics."),
});
export type GenerateRelatedTopicsOutput = z.infer<
	typeof GenerateRelatedTopicsOutputSchema
>;

export async function generateRelatedTopics(
	input: GenerateRelatedTopicsInput
): Promise<GenerateRelatedTopicsOutput> {
	const prompt = `You are an AI assistant that generates related topics for flashcard decks.

Your task is to generate exactly 3 topics that are closely related to the given topic. These should be topics that would make good flashcard decks for learning.

Guidelines:
- Generate exactly 3 related topics
- Each topic should be specific and focused
- Topics should be at a similar difficulty level
- Topics should be complementary to the original topic
- Use clear, concise topic names
- Avoid overly broad or vague topics
- Focus on practical learning areas

Examples:
- Original: "Python Programming Basics" → Related: ["Python Data Structures", "Python Functions and Classes", "Python File Handling"]
- Original: "World War II History" → Related: ["European Theater of WWII", "Pacific Theater of WWII", "WWII Political Leaders"]
- Original: "Human Anatomy" → Related: ["Skeletal System", "Cardiovascular System", "Nervous System"]

Original Topic: ${input.topic}

Generate exactly 3 related topics:`;

	const result = await generateText({
		model: ai,
		prompt,
		experimental_output: Output.object({
			schema: GenerateRelatedTopicsOutputSchema,
		}),
	});

	return result.experimental_output as GenerateRelatedTopicsOutput;
}
