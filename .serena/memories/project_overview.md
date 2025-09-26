# Anzii - Project Overview

## Purpose
Anzii is an AI-powered spaced repetition learning system built with Next.js 15, React 19, and TypeScript. It transforms any content into optimized flashcards using Google Gemini AI and implements the scientifically-proven SM-2 spaced repetition algorithm.

## Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, PostgreSQL with Neon, Drizzle ORM
- **State Management**: TanStack Query (React Query) with custom hooks
- **AI Integration**: Google Gemini via @ai-sdk/google
- **Authentication**: Stack (@stackframe/stack)
- **Styling**: Tailwind CSS with Radix UI components
- **Animations**: Framer Motion (motion package)
- **Testing**: Jest for unit tests, Playwright for E2E tests

## Core Features
- **Spaced Repetition**: SM-2 algorithm implementation
- **AI Generation**: Content-to-flashcard flows using Google Gemini
- **Study Sessions**: Interactive flashcard interface with animations
- **Deck Management**: CRUD operations with optimistic updates
- **User Preferences**: Theme/font customization with 17 accessible themes

## Database Schema (Drizzle ORM)
Key tables:
- `decks` - Flashcard decks with like/user counts
- `cards` - Individual flashcards with SRS fields (interval, easeFactor, dueDate)
- `users` - User profiles with theme/font preferences
- `userLikes` - Deck likes for social features