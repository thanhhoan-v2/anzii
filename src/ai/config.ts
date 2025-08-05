import { google } from "@ai-sdk/google";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
	throw new Error(
		"GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required"
	);
}

export const ai = google("gemini-1.5-flash");
