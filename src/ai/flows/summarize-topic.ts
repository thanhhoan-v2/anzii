"use server";

/**
 * @fileOverview Summarizes a topic into a concise deck name using AI.
 *
 * - summarizeTopic - A function that creates a short summary from a topic.
 * - SummarizeTopicInput - The input type for the function.
 * - SummarizeTopicOutput - The return type for the function.
 */

import { generateText, Output } from "ai";
import { z } from "zod";

import { ai } from "@/ai/config";

const SummarizeTopicInputSchema = z.object({
	topic: z.string().describe("The topic to summarize into a deck name."),
});
export type SummarizeTopicInput = z.infer<typeof SummarizeTopicInputSchema>;

const SummarizeTopicOutputSchema = z.object({
	summary: z
		.string()
		.describe(
			"A concise summary of the topic, maximum 5 words, suitable for a deck name."
		),
});
export type SummarizeTopicOutput = z.infer<typeof SummarizeTopicOutputSchema>;

export async function summarizeTopic(
	input: SummarizeTopicInput
): Promise<SummarizeTopicOutput> {
	const prompt = `You are an AI assistant that creates concise deck names from topics.

Your task is to summarize the given topic into a clear, concise deck name using a maximum of 5 words.

Guidelines:
- Use exactly 5 words or fewer
- Capture the essence of the topic
- Use title case (capitalize first letter of each major word)
- Make it descriptive and clear
- Avoid unnecessary articles (a, an, the) unless essential
- Focus on the key subject matter

Examples:
- "Learn about the history of the Roman Empire and its conquests" → "Roman Empire History"
- "Python programming basics for beginners" → "Python Programming Basics"
- "Understanding photosynthesis in plants" → "Plant Photosynthesis Process"

Topic: ${input.topic}

Generate a concise deck name:`;

	const result = await generateText({
		model: ai,
		prompt,
		experimental_output: Output.object({
			schema: SummarizeTopicOutputSchema,
		}),
	});

	return result.experimental_output as SummarizeTopicOutput;
}
