'use server';

/**
 * @fileOverview Generates flashcards from markdown content using AI.
 *
 * - generateCardsFromMarkdown - A function that handles card generation from markdown.
 * - GenerateCardsFromMarkdownInput - The input type for the function.
 * - GenerateCardsFromMarkdownOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCardsFromMarkdownInputSchema = z.object({
  topic: z.string().describe('The name of the deck or topic for the flashcards.'),
  markdown: z.string().describe('The markdown content to generate flashcards from.'),
});
export type GenerateCardsFromMarkdownInput = z.infer<typeof GenerateCardsFromMarkdownInputSchema>;

const GenerateCardsFromMarkdownOutputSchema = z.object({
  cards: z.array(z.object({
    question: z.string().describe('The question for the flashcard.'),
    answer: z.string().describe('The answer for the flashcard.'),
  })).describe('An array of generated flashcards.'),
});
export type GenerateCardsFromMarkdownOutput = z.infer<typeof GenerateCardsFromMarkdownOutputSchema>;

export async function generateCardsFromMarkdown(input: GenerateCardsFromMarkdownInput): Promise<GenerateCardsFromMarkdownOutput> {
  return generateCardsFromMarkdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCardsFromMarkdownPrompt',
  input: {schema: GenerateCardsFromMarkdownInputSchema},
  output: {schema: GenerateCardsFromMarkdownOutputSchema},
  prompt: `You are an AI assistant that helps users create flashcards from their notes.
You will be given a topic and notes in Markdown format.
Your task is to analyze the content and generate a list of question and answer pairs that are suitable for flashcards.
The questions should be clear and concise. The answers should be accurate and directly address the questions.
Ensure the generated cards cover the key concepts in the provided markdown.

Topic: {{{topic}}}

Markdown Notes:
{{{markdown}}}
`,
});

const generateCardsFromMarkdownFlow = ai.defineFlow(
  {
    name: 'generateCardsFromMarkdownFlow',
    inputSchema: GenerateCardsFromMarkdownInputSchema,
    outputSchema: GenerateCardsFromMarkdownOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
