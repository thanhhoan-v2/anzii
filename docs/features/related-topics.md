# Related Topics Feature

## Overview

The Related Topics feature automatically generates 3 closely related topics for AI-generated flashcard decks. This helps users discover additional learning opportunities and expand their knowledge in related areas.

## How It Works

When a user creates a deck using AI generation, the system:

1. **Generates the main deck** with cards based on the user's topic
2. **Creates 3 related topics** using AI that are closely related to the original topic
3. **Displays the related topics** as badges on the deck card in the deck list

## Implementation Details

### AI Flow

- **File**: `src/ai/flows/generate-related-topics.ts`
- **Function**: `generateRelatedTopics()`
- **Input**: Topic string
- **Output**: Array of exactly 3 related topics

### Database Schema

- **Table**: `decks`
- **Column**: `related_topics` (JSON array of strings)
- **Migration**: `drizzle/0004_add_related_topics.sql`

### UI Components

- **DeckCard**: Displays related topics as badges below the deck description
- **Styling**: Uses secondary badge variant with small text size

## Example

**Original Topic**: "Python Programming Basics"

**Generated Related Topics**:

- "Python Data Structures"
- "Python Functions and Classes"
- "Python File Handling"

## Benefits

1. **Learning Path Discovery**: Users can see logical next steps in their learning journey
2. **Content Expansion**: Encourages users to create additional decks on related subjects
3. **Better Organization**: Related topics help users understand the scope and connections between different subjects
4. **AI-Powered Suggestions**: Leverages AI to provide intelligent, contextually relevant topic suggestions

## Technical Notes

- Related topics are only generated for AI-created decks
- The feature uses the same AI model as other deck generation features
- Topics are stored as a JSON array in the database
- The UI gracefully handles cases where related topics are not available
