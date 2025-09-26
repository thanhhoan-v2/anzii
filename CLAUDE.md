# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anzii is an AI-powered spaced repetition learning system built with Next.js 15, React 19, and TypeScript. It transforms any content into optimized flashcards using Google Gemini AI and implements the scientifically-proven SM-2 spaced repetition algorithm.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run organize-imports` - Organize imports with ESLint

### Testing
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI mode
- `npm run test:e2e:headed` - Run E2E tests in headed mode
- `npm run test:all` - Run all tests (unit + E2E)

### Database Operations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with sample data
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate migration files

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, PostgreSQL with Neon, Drizzle ORM
- **State Management**: TanStack Query (React Query) with custom hooks
- **AI Integration**: Google Gemini via @ai-sdk/google
- **Authentication**: Stack (@stackframe/stack)
- **Styling**: Tailwind CSS with Radix UI components
- **Animations**: Framer Motion (motion package)

### Key Directory Structure
```
src/
├── app/                    # Next.js App Router (pages and API routes)
├── components/             # React components
│   ├── ui/                # Base UI components (Radix-based)
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── sections/          # Page sections
├── hooks/                 # Custom React hooks with domain logic
├── lib/                   # Utilities, constants, and server actions
├── db/                    # Database schema and operations (Drizzle)
├── ai/                    # AI integration flows (Google Gemini)
├── types/                 # TypeScript type definitions
└── data/                  # Static data and constants
```

### Core Features
- **Spaced Repetition**: SM-2 algorithm implementation in `src/lib/srs.ts`
- **AI Generation**: Content-to-flashcard flows in `src/ai/flows/`
- **Study Sessions**: Interactive flashcard interface with multiple animations
- **Deck Management**: CRUD operations with optimistic updates
- **User Preferences**: Theme/font customization with 17 accessible themes

## Development Patterns

### State Management with React Query
- All server state managed through TanStack Query
- Custom hooks in `src/hooks/` for domain-specific logic (e.g., `use-decks.ts`, `use-cards.ts`)
- Query keys centralized in `src/lib/query-keys.ts`
- Optimistic updates for better UX
- 5-minute stale time with background refetching

### Server Actions Pattern
- All database mutations use Next.js Server Actions
- Centralized in `src/lib/actions.ts`
- Type-safe with Zod validation
- Proper error handling and validation

### Component Architecture
- UI components built on Radix UI primitives
- Feature components in `src/components/features/`
- Atomic design principles
- Consistent styling with `src/components/ui/` base components

### Database Schema (Drizzle ORM)
Key tables:
- `decks` - Flashcard decks with like/user counts
- `cards` - Individual flashcards with SRS fields (interval, easeFactor, dueDate)
- `users` - User profiles with theme/font preferences
- `userLikes` - Deck likes for social features

### AI Integration
- Google Gemini integration via `@ai-sdk/google`
- Structured AI flows in `src/ai/flows/`
- Environment variables: `GEMINI_API_KEY` or `GOOGLE_API_KEY`
- Zod validation for AI responses

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Custom types in `src/types/`
- Consistent type definitions across components and hooks

### Testing
- Jest for unit tests (components, utilities)
- Playwright for E2E tests (critical user flows)
- React Testing Library for component testing
- Test utilities in `tests/utils/`

### Styling
- Tailwind CSS with custom design system
- CSS variables for theming
- Responsive design (mobile-first)
- Accessibility-compliant (WCAG 2.1 AA)

### Security
- Server Actions for all mutations
- Zod validation on all inputs
- Drizzle ORM prevents SQL injection
- Stack authentication integration

## Environment Setup

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` or `GOOGLE_API_KEY` - Google Gemini API key
- `STACK_*` variables for authentication (see Stack documentation)

## Common Development Tasks

### Adding a New Feature
1. Create database schema changes in `src/db/schema.ts`
2. Generate and run migrations with `npm run db:generate` and `npm run db:migrate`
3. Add server actions in `src/lib/actions.ts`
4. Create custom hooks in `src/hooks/`
5. Build UI components following existing patterns
6. Add tests for critical functionality

### Working with the Database
- Use Drizzle Studio (`npm run db:studio`) for visual database management
- Schema changes require migrations (`npm run db:generate`)
- Test with seed data (`npm run db:seed`)

### AI Development
- AI flows are in `src/ai/flows/`
- Follow existing patterns for structured generation
- Use Zod schemas for response validation
- Test with different content types (text, markdown, etc.)

## Important Notes

- Always run `npm run lint` and `npm run typecheck` before committing
- Use optimistic updates in React Query for better UX
- Follow accessibility guidelines for all UI components
- Keep AI prompts concise and well-structured
- Database operations should always use server actions
- Theme system supports 17 different color schemes and fonts