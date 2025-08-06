---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# AI Integration

Work with Anzii's AI-powered features for content generation and intelligent learning.

## 🤖 AI Overview

Anzii uses Google Gemini API for:

* **Flashcard Generation** - Convert any content into structured flashcards
* **Deck Descriptions** - Generate contextual descriptions for decks
* **Question Suggestions** - Suggest additional questions based on content
* **Topic Summarization** - Create concise deck names and summaries

## 🔧 AI Configuration

### 1. Setup Gemini API

```tsx
// ai/config.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
	model: "gemini-pro",
	generationConfig: {
		temperature: 0.7,
		topK: 40,
		topP: 0.95,
		maxOutputTokens: 2048,
	},
});
```

### 2. Environment Variables

```env
# Required for AI features
GEMINI_API_KEY="your-gemini-api-key"
```

## 📝 AI Flows

### 1. Generate Cards from Markdown

```tsx
// ai/flows/generate-cards-from-markdown.ts
import { geminiModel } from "../config";

interface GenerateCardsParams {
	content: string;
	cardCount?: number;
	difficulty?: "easy" | "medium" | "hard";
}

export async function generateCardsFromMarkdown({
	content,
	cardCount = 10,
	difficulty = "medium",
}: GenerateCardsParams) {
	const prompt = `
    Create ${cardCount} flashcards from the following content.
    Difficulty level: ${difficulty}
    
    Content:
    ${content}
    
    Generate flashcards in this JSON format:
    [
      {
        "front": "Question or prompt",
        "back": "Answer or explanation"
      }
    ]
    
    Make sure the flashcards are:
    - Clear and concise
    - Appropriate for the difficulty level
    - Cover key concepts from the content
    - Suitable for spaced repetition learning
  `;

	try {
		const result = await geminiModel.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Parse JSON response
		const cards = JSON.parse(text);
		return cards;
	} catch (error) {
		console.error("Error generating cards:", error);
		throw new Error("Failed to generate flashcards");
	}
}
```

### 2. Generate Deck from Topic

```tsx
// ai/flows/generate-deck-from-topic.ts
export async function generateDeckFromTopic(
	topic: string,
	cardCount: number = 20
) {
	const prompt = `
    Create a comprehensive flashcard deck about: ${topic}
    
    Generate ${cardCount} flashcards covering:
    - Key concepts and definitions
    - Important facts and details
    - Common questions and scenarios
    - Practical applications
    
    Format as JSON:
    {
      "name": "Concise deck name (max 5 words)",
      "description": "Brief description of the deck content",
      "cards": [
        {
          "front": "Question",
          "back": "Answer"
        }
      ]
    }
  `;

	try {
		const result = await geminiModel.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return JSON.parse(text);
	} catch (error) {
		console.error("Error generating deck:", error);
		throw new Error("Failed to generate deck from topic");
	}
}
```

### 3. Generate Deck Description

```tsx
// ai/flows/generate-deck-description.ts
export async function generateDeckDescription(deckName: string, cards: Card[]) {
	const cardSamples = cards
		.slice(0, 5)
		.map((card) => `Q: ${card.front}\nA: ${card.back}`)
		.join("\n\n");

	const prompt = `
    Generate a concise description for a flashcard deck titled: "${deckName}"
    
    Sample cards:
    ${cardSamples}
    
    Create a description that:
    - Explains what the deck covers
    - Mentions the difficulty level
    - Highlights key topics
    - Is 1-2 sentences long
    
    Return only the description text, no JSON.
  `;

	try {
		const result = await geminiModel.generateContent(prompt);
		const response = await result.response;
		return response.text().trim();
	} catch (error) {
		console.error("Error generating description:", error);
		return "A comprehensive flashcard deck for effective learning.";
	}
}
```

### 4. Suggest Questions

```tsx
// ai/flows/suggest-questions.ts
export async function suggestQuestions(content: string, existingCards: Card[]) {
	const existingQuestions = existingCards.map((card) => card.front).join("\n");

	const prompt = `
    Based on this content, suggest 5 additional questions that would make good flashcards.
    
    Content:
    ${content}
    
    Existing questions:
    ${existingQuestions}
    
    Suggest questions that:
    - Cover different aspects of the content
    - Are not already covered by existing questions
    - Vary in difficulty
    - Test different types of knowledge (facts, concepts, applications)
    
    Return as JSON array:
    [
      {
        "question": "Suggested question",
        "answer": "Suggested answer",
        "difficulty": "easy|medium|hard"
      }
    ]
  `;

	try {
		const result = await geminiModel.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return JSON.parse(text);
	} catch (error) {
		console.error("Error suggesting questions:", error);
		return [];
	}
}
```

## 🎯 Using AI in Components

### 1. AI Deck Generator Component

```tsx
// components/features/ai/ai-deck-generator.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCardsFromMarkdown } from "@/ai/flows/generate-cards-from-markdown";

export function AIDeckGenerator() {
	const [content, setContent] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [cards, setCards] = useState([]);

	const handleGenerate = async () => {
		if (!content.trim()) return;

		setIsGenerating(true);
		try {
			const generatedCards = await generateCardsFromMarkdown({
				content,
				cardCount: 10,
				difficulty: "medium",
			});
			setCards(generatedCards);
		} catch (error) {
			console.error("Failed to generate cards:", error);
			// Show error toast
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Generate Flashcards with AI</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Textarea
						placeholder="Paste your content here (notes, text, markdown)..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows={8}
					/>

					<Button
						onClick={handleGenerate}
						disabled={isGenerating || !content.trim()}
					>
						{isGenerating ? "Generating..." : "Generate Cards"}
					</Button>
				</CardContent>
			</Card>

			{cards.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Generated Cards ({cards.length})</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{cards.map((card, index) => (
								<div key={index} className="rounded-lg border p-4">
									<div className="mb-2 font-medium">Q: {card.front}</div>
									<div className="text-muted-foreground">A: {card.back}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
```

### 2. AI Question Suggester

```tsx
// components/features/ai/ai-question-suggester.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { suggestQuestions } from "@/ai/flows/suggest-questions";

export function AIQuestionSuggester({
	content,
	existingCards,
	onAddCard,
}: {
	content: string;
	existingCards: Card[];
	onAddCard: (card: Card) => void;
}) {
	const [suggestions, setSuggestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSuggest = async () => {
		setIsLoading(true);
		try {
			const newSuggestions = await suggestQuestions(content, existingCards);
			setSuggestions(newSuggestions);
		} catch (error) {
			console.error("Failed to get suggestions:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<Button onClick={handleSuggest} disabled={isLoading} variant="outline">
				{isLoading ? "Getting Suggestions..." : "Get AI Suggestions"}
			</Button>

			{suggestions.length > 0 && (
				<div className="space-y-2">
					<h3 className="font-medium">Suggested Questions</h3>
					{suggestions.map((suggestion, index) => (
						<div key={index} className="rounded-lg border p-3">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="font-medium">{suggestion.question}</div>
									<div className="mt-1 text-sm text-muted-foreground">
										{suggestion.answer}
									</div>
									<div className="mt-1 text-xs text-muted-foreground">
										Difficulty: {suggestion.difficulty}
									</div>
								</div>
								<Button
									size="sm"
									onClick={() =>
										onAddCard({
											front: suggestion.question,
											back: suggestion.answer,
										})
									}
								>
									Add
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
```

## 🔄 AI Integration Patterns

### 1. Error Handling

```tsx
// lib/ai-error-handling.ts
export class AIError extends Error {
	constructor(
		message: string,
		public code: "RATE_LIMIT" | "INVALID_INPUT" | "API_ERROR" | "PARSE_ERROR"
	) {
		super(message);
		this.name = "AIError";
	}
}

export function handleAIError(error: unknown): AIError {
	if (error instanceof AIError) {
		return error;
	}

	const message = error instanceof Error ? error.message : "Unknown AI error";

	if (message.includes("rate limit")) {
		return new AIError(
			"Rate limit exceeded. Please try again later.",
			"RATE_LIMIT"
		);
	}

	if (message.includes("invalid")) {
		return new AIError("Invalid input provided.", "INVALID_INPUT");
	}

	return new AIError("AI service temporarily unavailable.", "API_ERROR");
}
```

### 2. Rate Limiting

```tsx
// lib/ai-rate-limiting.ts
class RateLimiter {
	private requests: number[] = [];
	private maxRequests = 10;
	private windowMs = 60000; // 1 minute

	async checkLimit(): Promise<boolean> {
		const now = Date.now();
		this.requests = this.requests.filter((time) => now - time < this.windowMs);

		if (this.requests.length >= this.maxRequests) {
			return false;
		}

		this.requests.push(now);
		return true;
	}
}

export const aiRateLimiter = new RateLimiter();
```

### 3. Caching AI Responses

```tsx
// lib/ai-caching.ts
import { cache } from "react";

export const cachedGenerateCards = cache(
	async (content: string, cardCount: number) => {
		// This will be cached for the duration of the request
		return generateCardsFromMarkdown({ content, cardCount });
	}
);
```

## 🧪 Testing AI Features

### 1. Unit Testing AI Flows

```tsx
// __tests__/ai/generate-cards.test.ts
import { generateCardsFromMarkdown } from "@/ai/flows/generate-cards-from-markdown";

// Mock Gemini API
jest.mock("@/ai/config", () => ({
	geminiModel: {
		generateContent: jest.fn(),
	},
}));

describe("generateCardsFromMarkdown", () => {
	test("generates cards from markdown content", async () => {
		const mockResponse = {
			response: {
				text: () =>
					JSON.stringify([
						{
							front: "What is React?",
							back: "A JavaScript library for building UIs",
						},
						{
							front: "What is JSX?",
							back: "A syntax extension for JavaScript",
						},
					]),
			},
		};

		const { geminiModel } = require("@/ai/config");
		geminiModel.generateContent.mockResolvedValue(mockResponse);

		const result = await generateCardsFromMarkdown({
			content: "# React Basics\n\nReact is a JavaScript library...",
			cardCount: 2,
		});

		expect(result).toHaveLength(2);
		expect(result[0]).toHaveProperty("front", "What is React?");
		expect(result[0]).toHaveProperty(
			"back",
			"A JavaScript library for building UIs"
		);
	});
});
```

### 2. Integration Testing

```tsx
// tests/e2e/ai-generation.spec.ts
import { test, expect } from "@playwright/test";

test("user can generate cards with AI", async ({ page }) => {
	await page.goto("/create");

	// Navigate to AI tab
	await page.click('[data-testid="ai-tab"]');

	// Enter content
	await page.fill(
		'[data-testid="content-textarea"]',
		"React is a JavaScript library for building user interfaces."
	);

	// Generate cards
	await page.click('[data-testid="generate-button"]');

	// Wait for generation
	await page.waitForSelector('[data-testid="generated-card"]');

	// Verify cards were generated
	const cards = await page.locator('[data-testid="generated-card"]').count();
	expect(cards).toBeGreaterThan(0);
});
```

## 📊 AI Performance Monitoring

### 1. Response Time Tracking

```tsx
// lib/ai-metrics.ts
export async function trackAIMetrics<T>(
	operation: string,
	fn: () => Promise<T>
): Promise<T> {
	const start = Date.now();

	try {
		const result = await fn();
		const duration = Date.now() - start;

		// Log metrics
		console.log(`AI ${operation} completed in ${duration}ms`);

		return result;
	} catch (error) {
		const duration = Date.now() - start;
		console.error(`AI ${operation} failed after ${duration}ms:`, error);
		throw error;
	}
}
```

### 2. Usage Analytics

```tsx
// lib/ai-analytics.ts
export function trackAIUsage(operation: string, success: boolean) {
	// Send to analytics service
	analytics.track("ai_operation", {
		operation,
		success,
		timestamp: new Date().toISOString(),
	});
}
```

## 📚 Related Documentation

* [**Project Architecture**](../architecture-and-development/architecture.md) - Understanding the tech stack
* [**State Management**](state-management.md) - Managing AI state
* [**UI Development**](../architecture-and-development/ui-development.md) - Building AI components
* [**Development Workflow**](../architecture-and-development/development-workflow.md) - Testing AI features

***

**Ready to build AI features?** Check out the [State Management](state-management.md) guide to learn about managing AI state effectively!
