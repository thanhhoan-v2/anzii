# Anzii Codebase Overview

## Project Summary

**Anzii** is an AI-powered spaced repetition learning system that transforms any content into optimized flashcards. The application uses scientifically-proven spaced repetition algorithms (SM-2) to improve retention by up to 89%.

### Core Value Proposition

- **AI-Powered Generation**: Transform any content (PDFs, text, markdown) into flashcards using Google Gemini AI
- **Spaced Repetition**: Scientifically-proven SM-2 algorithm for optimal learning intervals
- **Multi-format Support**: Import from various formats and export capabilities
- **Cross-platform**: Synchronization across all devices
- **Accessibility**: 17 curated themes with WCAG 2.1 AA compliance

## Tech Stack

### Frontend

- **Next.js 15** with App Router and Turbopack
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom design system
- **Framer Motion** for animations
- **Radix UI** for accessible component primitives
- **React Hook Form** with Zod validation

### Backend & Data

- **Next.js API Routes** (serverless functions)
- **PostgreSQL** with Neon serverless database
- **Drizzle ORM** for type-safe database operations
- **Stack** for authentication and user management

### State Management & Data Fetching

- **TanStack Query (React Query)** for server state management
- **Custom hooks** for domain-specific logic
- **Optimistic updates** for better UX
- **Error boundaries** for graceful error handling

### AI Integration

- **Google Gemini** via Genkit framework
- **Structured AI flows** for flashcard generation
- **Topic summarization** for intelligent deck naming

### Testing & Quality

- **Jest** for unit testing
- **Playwright** for E2E testing
- **ESLint** + **Prettier** for code quality
- **TypeScript** for type safety

### DevOps & Deployment

- **Vercel** for hosting and deployment
- **Vercel Analytics** and **Speed Insights**
- **GitHub Actions** for CI/CD

## Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── dashboard/         # Main dashboard
│   ├── deck/[deckId]/     # Individual deck pages
│   └── review/[deckId]/   # Study session pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix-based)
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and core logic
├── db/                   # Database schema and operations
├── ai/                   # AI integration flows
├── types/                # TypeScript type definitions
└── data/                 # Static data and constants
```

### Key Architectural Patterns

#### 1. **Domain-Driven Design**

- Clear separation between features (study, deck management, AI generation)
- Domain-specific hooks (`use-decks.ts`, `use-cards.ts`)
- Feature-based component organization

#### 2. **Server Actions Pattern**

- All database operations use Next.js Server Actions
- Type-safe with Zod validation
- Centralized in `src/lib/actions.ts`

#### 3. **React Query Integration**

- Optimized caching with 5-minute stale time
- Background refetching for data freshness
- Optimistic updates for better UX
- Centralized query keys in `src/lib/query-keys.ts`

#### 4. **Component Architecture**

- **Atomic Design**: UI components → Feature components → Page sections
- **Composition over inheritance**: Flexible component composition
- **Accessibility-first**: All components built on Radix UI primitives

## Core Features Implementation

### 1. Spaced Repetition Algorithm (SM-2)

**Location**: `src/lib/srs.ts`

```typescript
export function calculateNextReview(card: Card, rating: Rating): Card {
	// SM-2 algorithm implementation
	// - New cards: 1, 3, or 5 days based on rating
	// - Mature cards: interval * easeFactor
	// - Ease factor adjustments based on performance
}
```

**Key Features**:

- Scientifically-proven SM-2 algorithm
- Dynamic ease factor adjustments
- Minimum interval enforcement (1 day)
- Rating-based interval calculations

### 2. AI-Powered Flashcard Generation

**Location**: `src/ai/flows/`

**Flow Structure**:

- `generate-deck-from-topic.ts` - Topic-based generation
- `generate-cards-from-markdown.ts` - Markdown parsing
- `summarize-topic.ts` - Intelligent deck naming

**AI Integration**:

- Google Gemini via Genkit framework
- Structured prompts with Zod validation
- Error handling and retry logic

### 3. Database Schema

**Location**: `src/db/schema.ts`

```typescript
export const decks = pgTable("decks", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cards = pgTable("cards", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	deckId: text("deck_id")
		.notNull()
		.references(() => decks.id),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	interval: integer("interval").notNull().default(0),
	easeFactor: real("ease_factor").notNull().default(2.5),
	dueDate: timestamp("due_date").defaultNow().notNull(),
});
```

**Key Design Decisions**:

- UUID primary keys for scalability
- Proper foreign key relationships
- SRS-specific fields (interval, easeFactor, dueDate)
- Timestamp tracking for analytics

### 4. State Management with React Query

**Location**: `src/hooks/use-decks.ts`

**Patterns**:

- **Query Keys**: Centralized and consistent
- **Optimistic Updates**: Instant UI feedback
- **Error Handling**: Graceful fallbacks
- **Cache Invalidation**: Smart invalidation strategies

```typescript
export function useDecks() {
	return useQuery({
		queryKey: queryKeys.decks,
		queryFn: async (): Promise<DeckListItem[]> => {
			return await getDecksWithCounts();
		},
		staleTime: 30 * 1000, // 30 seconds
	});
}
```

### 5. Flashcard Study Interface

**Location**: `src/components/features/study/flash-card.tsx`

**Features**:

- **Multiple Animation Types**: Flip, fade, slide
- **Markdown Support**: Rich text rendering
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Screen reader support

```typescript
const getAnimationProps = () => {
	switch (userDeckAnimation) {
		case "fade":
			return {
				/* fade animation */
			};
		case "slide":
			return {
				/* slide animation */
			};
		case "flip":
		default:
			return {
				/* 3D flip animation */
			};
	}
};
```

## Key Implementation Details

### 1. Performance Optimizations

- **Turbopack**: Next.js 15's fast bundler
- **React Query**: Intelligent caching and background updates
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Bundle Analysis**: Regular bundle size monitoring

### 2. Security Considerations

- **Server Actions**: All mutations go through server-side validation
- **Zod Validation**: Type-safe input validation
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **Authentication**: Stack-based secure auth
- **CORS**: Proper API route protection

### 3. Accessibility Features

- **WCAG 2.1 AA Compliance**: 17 accessible themes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: High contrast ratios
- **Focus Management**: Logical tab order

### 4. Error Handling Strategy

- **React Query Error Boundaries**: Graceful error states
- **Toast Notifications**: User-friendly error messages
- **Fallback UI**: Loading skeletons and error states
- **Retry Logic**: Automatic retry for transient failures

## Development Workflow

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code quality rules
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

### Testing Strategy

- **Unit Tests**: Jest for component and utility testing
- **E2E Tests**: Playwright for critical user flows
- **Integration Tests**: API route testing

### Deployment Pipeline

- **Vercel**: Automatic deployments from main branch
- **Preview Deployments**: Feature branch previews
- **Analytics**: Performance monitoring

## Scalability Considerations

### Database

- **Neon Serverless**: Auto-scaling PostgreSQL
- **Connection Pooling**: Efficient connection management
- **Indexing Strategy**: Optimized query performance

### Frontend

- **Code Splitting**: Route-based and component-based
- **Lazy Loading**: Images and non-critical components
- **Caching Strategy**: Aggressive caching with React Query

### API

- **Serverless Functions**: Auto-scaling API routes
- **Edge Functions**: Global CDN distribution
- **Rate Limiting**: Protection against abuse

## Interview-Ready Talking Points

### 1. **Technical Architecture**

- "I built this using Next.js 15 with the App Router for optimal performance and developer experience"
- "The state management uses TanStack Query for efficient server state handling with optimistic updates"
- "Database operations are type-safe using Drizzle ORM with PostgreSQL"

### 2. **AI Integration**

- "I implemented structured AI flows using Google Gemini via the Genkit framework"
- "The AI generates flashcards from any content with intelligent topic summarization"
- "All AI operations are validated with Zod schemas for type safety"

### 3. **Learning Algorithm**

- "I implemented the scientifically-proven SM-2 spaced repetition algorithm"
- "The system adapts to user performance with dynamic ease factor adjustments"
- "Cards are scheduled based on cognitive science principles for optimal retention"

### 4. **Performance & UX**

- "I prioritized performance with Turbopack, code splitting, and intelligent caching"
- "The UI is fully accessible with WCAG 2.1 AA compliance and 17 themes"
- "I implemented smooth animations and optimistic updates for better user experience"

### 5. **Code Quality**

- "I maintained high code quality with TypeScript, ESLint, and comprehensive testing"
- "The codebase follows domain-driven design principles with clear separation of concerns"
- "I used modern React patterns like custom hooks and server actions"

## Potential Interview Questions & Answers

### Q: "Walk me through your database schema design"

**A**: "I designed a simple but effective schema with two main tables: `decks` and `cards`. The cards table includes SRS-specific fields like `interval`, `easeFactor`, and `dueDate` to implement the spaced repetition algorithm. I used UUIDs for scalability and proper foreign key relationships for data integrity."

### Q: "How did you implement the spaced repetition algorithm?"

**A**: "I implemented the SM-2 algorithm in `src/lib/srs.ts`. For new cards, ratings determine initial intervals (1, 3, or 5 days). For mature cards, the interval is calculated as `currentInterval * easeFactor`. The ease factor adjusts based on performance - it decreases for hard ratings and increases for easy ratings, with a minimum of 1.3."

### Q: "How do you handle state management?"

**A**: "I use TanStack Query for server state management with custom hooks for domain-specific logic. The system includes optimistic updates for better UX, intelligent caching with 5-minute stale times, and proper error boundaries. All mutations go through server actions for security."

### Q: "What's your approach to testing?"

**A**: "I have a comprehensive testing strategy with Jest for unit tests, Playwright for E2E tests, and React Testing Library for component testing. I focus on testing critical user flows like deck creation, study sessions, and AI generation."

### Q: "How do you ensure code quality?"

**A**: "I use TypeScript for type safety, ESLint for code quality, Prettier for formatting, and Husky for pre-commit hooks. The codebase follows consistent patterns and is well-documented. I also use domain-driven design principles for clear separation of concerns."

This codebase demonstrates modern web development best practices with a focus on performance, accessibility, and user experience. The combination of Next.js 15, React Query, and AI integration shows proficiency with current technologies while the spaced repetition algorithm demonstrates understanding of educational technology principles.
