import { googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export const ai = genkit({
	plugins: [googleAI({ apiKey })],
	model: "googleai/gemini-2.0-flash",
});
