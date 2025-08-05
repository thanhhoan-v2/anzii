"use server";

/**
 * @fileOverview Generates a brief description for a deck based on the topic using AI.
 *
 * - generateDeckDescription - A function that creates a short description from a topic.
 * - GenerateDeckDescriptionInput - The input type for the function.
 * - GenerateDeckDescriptionOutput - The return type for the function.
 */

import { generateText, Output } from "ai";
import { z } from "zod";

import { ai } from "@/ai/config";

const GenerateDeckDescriptionInputSchema = z.object({
	topic: z.string().describe("The topic to generate a description for."),
});
export type GenerateDeckDescriptionInput = z.infer<
	typeof GenerateDeckDescriptionInputSchema
>;

const GenerateDeckDescriptionOutputSchema = z.object({
	description: z
		.string()
		.describe(
			"A brief description of the topic, maximum 150 characters, suitable for a deck description."
		),
});
export type GenerateDeckDescriptionOutput = z.infer<
	typeof GenerateDeckDescriptionOutputSchema
>;

export async function generateDeckDescription(
	input: GenerateDeckDescriptionInput
): Promise<GenerateDeckDescriptionOutput> {
	const prompt = `You are an AI assistant that creates brief descriptions for flashcard decks.

Your task is to generate a concise description for a flashcard deck based on the given topic.

Guidelines:
- Keep it under 150 characters
- Be informative and engaging
- Focus on what the user will learn
- Use clear, simple language
- Avoid technical jargon unless necessary
- Make it appealing to students

Examples:
- "Learn about the history of the Roman Empire and its conquests" → "Explore the rise and fall of the Roman Empire through key historical events and figures"
- "Python programming basics for beginners" → "Master fundamental Python concepts including variables, loops, functions, and data structures"
- "Understanding photosynthesis in plants" → "Discover how plants convert sunlight into energy through the fascinating process of photosynthesis"

Topic: ${input.topic}

Generate a brief deck description:`;

	const result = await generateText({
		model: ai,
		prompt,
		experimental_output: Output.object({
			schema: GenerateDeckDescriptionOutputSchema,
		}),
	});

	return result.experimental_output as GenerateDeckDescriptionOutput;
}
