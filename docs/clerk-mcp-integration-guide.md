# Clerk MCP Server Integration Guide

## Overview

Clerk now supports the **Model Context Protocol (MCP)** - an open standard that allows AI applications like Claude, Cursor, and others to securely access user data from your application. This enables users to grant AI applications permission to access their authenticated data while maintaining full control over access permissions.

## What is MCP?

MCP (Model Context Protocol) is an open standard developed by Anthropic that standardizes how AI models interact with external data sources and tools. Think of MCP as a "USB-C port for AI applications" - a universal interface that allows any AI assistant to plug into any compatible data source or service.

### Key Benefits

- 🔒 **Secure Authentication**: Users control what data AI can access
- 🏗️ **No Additional Infrastructure**: Add MCP capabilities directly to your existing Next.js app
- 🔌 **Standard Protocol**: Works with Claude, Cursor, and other MCP-compatible AI tools
- 🎯 **Context-Aware AI**: AI can access real-time, user-specific data

## Implementation Steps

### 1. Install Required Dependencies

```bash
pnpm add @clerk/mcp-tools @vercel/mcp-adapter
```

### 2. Create MCP Route Handler

Create `src/app/api/mcp/[transport]/route.ts`:

```typescript
import { verifyClerkToken } from "@clerk/mcp-tools/next";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import {
	createMcpHandler,
	experimental_withMcpAuth as withMcpAuth,
} from "@vercel/mcp-adapter";

const clerk = await clerkClient();

const handler = createMcpHandler((server) => {
	// Tool to get user data
	server.tool(
		"get-clerk-user-data",
		"Gets data about the Clerk user that authorized this request",
		{},
		async (_, { authInfo }) => {
			const userId = authInfo!.extra!.userId! as string;
			const userData = await clerk.users.getUser(userId);
			return {
				content: [{ type: "text", text: JSON.stringify(userData) }],
			};
		}
	);

	// Tool to get user's flashcard decks
	server.tool(
		"get-user-decks",
		"Gets the user's flashcard decks from Anzii",
		{},
		async (_, { authInfo }) => {
			const userId = authInfo!.extra!.userId! as string;
			// Integrate with your existing deck fetching logic
			const decks = await getDecksForUser(userId);
			return {
				content: [{ type: "text", text: JSON.stringify(decks) }],
			};
		}
	);

	// Tool to create a new deck
	server.tool(
		"create-deck",
		"Creates a new flashcard deck for the user",
		{
			topic: { type: "string", description: "The topic for the new deck" },
			description: { type: "string", description: "Description of the deck" },
		},
		async ({ topic, description }, { authInfo }) => {
			const userId = authInfo!.extra!.userId! as string;
			// Integrate with your existing deck creation logic
			const newDeck = await createDeck(userId, { topic, description });
			return {
				content: [
					{ type: "text", text: `Created deck "${topic}" successfully` },
				],
			};
		}
	);

	// Tool to get deck cards for study
	server.tool(
		"get-deck-cards",
		"Gets cards from a specific deck for AI-assisted study",
		{
			deckId: {
				type: "string",
				description: "The ID of the deck to retrieve cards from",
			},
		},
		async ({ deckId }, { authInfo }) => {
			const userId = authInfo!.extra!.userId! as string;
			const cards = await getCardsForDeck(deckId, userId);
			return {
				content: [{ type: "text", text: JSON.stringify(cards) }],
			};
		}
	);
});

const authHandler = withMcpAuth(
	handler,
	async (_, token) => {
		const clerkAuth = await auth({ acceptsToken: "oauth_token" });
		return verifyClerkToken(clerkAuth, token);
	},
	{
		required: true,
		resourceMetadataPath: "/.well-known/oauth-protected-resource/mcp",
	}
);

export { authHandler as GET, authHandler as POST };
```

### 3. Integrate with Existing Actions

Update your existing database actions to be compatible with MCP:

```typescript
// In your existing actions.ts file
export async function getDecksForUser(userId: string): Promise<DeckListItem[]> {
	// Your existing deck fetching logic
	const db = getDb();
	const userDecks = await db
		.select({
			id: decks.id,
			name: decks.name,
			description: decks.description,
			cardCount: sql<number>`count(${cards.id})`.as("cardCount"),
			// ... other fields
		})
		.from(decks)
		.where(eq(decks.userId, userId));
	// ... rest of your existing query

	return userDecks;
}

export async function getCardsForDeck(deckId: string, userId: string) {
	// Verify user owns the deck and return cards
	const db = getDb();
	const deckCards = await db
		.select()
		.from(cards)
		.leftJoin(decks, eq(cards.deckId, decks.id))
		.where(and(eq(cards.deckId, deckId), eq(decks.userId, userId)));

	return deckCards;
}
```

## Connecting AI Tools

### Claude Desktop

Add this configuration to Claude Desktop:

```json
{
	"mcpServers": {
		"anzii-flashcards": {
			"url": "http://localhost:3000/api/mcp"
		}
	}
}
```

### Cursor IDE

Add this to your Cursor configuration:

```json
{
	"mcpServers": {
		"anzii-flashcards": {
			"url": "http://localhost:3000/api/mcp"
		}
	}
}
```

### Production Setup

For production, update the URL to your deployed application:

```json
{
	"mcpServers": {
		"anzii-flashcards": {
			"url": "https://anzii.vercel.app/api/mcp"
		}
	}
}
```

## Use Cases for Anzii

With MCP integration, users can:

1. **Study with AI**: Ask Claude to quiz them using their flashcard decks
2. **Generate Content**: Have AI create new decks based on study topics
3. **Review Progress**: Get AI-powered insights about their learning progress
4. **Smart Scheduling**: AI can suggest optimal study times based on spaced repetition
5. **Content Enhancement**: AI can improve existing flashcards with better examples

## Example AI Interactions

Once configured, users can interact with AI tools like this:

```
User: "Show me my flashcard decks and quiz me on my Spanish vocabulary deck"

AI: *Calls get-user-decks tool*
"I can see you have 5 decks including 'Spanish Vocabulary'. Let me quiz you with some cards from that deck."
*Calls get-deck-cards tool*
"Here's your first card: What's the Spanish word for 'house'?"
```

```
User: "Create a new deck about Machine Learning basics with 10 cards"

AI: *Calls create-deck tool*
"I've created a new 'Machine Learning Basics' deck for you. Would you like me to add some fundamental concepts and definitions?"
```

## Security Considerations

- ✅ **User Authorization**: Only authenticated users can access their own data
- ✅ **Scope Control**: Tools only access specific user data, not global data
- ✅ **Permission-Based**: Users must explicitly grant AI access
- ✅ **Audit Trail**: All AI interactions can be logged and monitored

## Testing Your MCP Server

1. Start your development server: `pnpm dev`
2. Configure your AI tool with the localhost URL
3. Test authentication and basic tool calls
4. Verify data access is properly scoped to the authenticated user

## Documentation References

- [Clerk MCP Documentation](https://clerk.com/docs/mcp)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Vercel MCP Adapter](https://github.com/vercel/mcp-adapter)

## Next Steps

1. Install the required dependencies
2. Implement the MCP route handler
3. Test with your preferred AI tool
4. Deploy to production
5. Document the new capabilities for your users

This integration opens up powerful new ways for your users to interact with their flashcard data through AI assistants while maintaining full security and control over their information.
