# Codebase Structure

## Directory Overview

### `src/app/` - Next.js App Router
- **Pages**: Route-based file structure
- **API routes**: Server-side endpoints in `api/` subdirectories
- **Layouts**: Layout components for route groups
- **Special files**: `layout.tsx`, `loading.tsx`, `page.tsx`

### `src/components/` - React Components
- **`ui/`**: Base UI components built on Radix UI primitives
- **`features/`**: Feature-specific components (study, ai, deck, import)
- **`sections/`**: Page sections (landing, pricing, contact, etc.)
- **`layout/`**: Layout components (header, footer)
- **`common/`**: Shared utility components
- **`animations/`**: Animation components
- **`svgs/`**: SVG icon components

### `src/hooks/` - Custom React Hooks
- Domain-specific hooks with React Query integration
- Examples: `use-decks.ts`, `use-cards.ts`, `use-settings.ts`
- Centralizes server state management and mutations

### `src/lib/` - Utilities and Server Logic
- **`actions.ts`**: Next.js Server Actions for all mutations
- **`utils.ts`**: Utility functions and helpers
- **`constants.ts`**: Application constants
- **`query-keys.ts`**: React Query key management
- **`srs.ts`**: Spaced repetition algorithm implementation

### `src/db/` - Database Layer
- **`schema.ts`**: Drizzle ORM schema definitions
- **`index.ts`**: Database connection and utilities
- **`migrate.ts`**: Migration runner
- **`seed.ts`**: Database seeding scripts

### `src/ai/` - AI Integration
- **`flows/`**: Structured AI generation flows
- **`config.ts`**: AI configuration and settings
- Google Gemini integration via @ai-sdk/google

### `src/types/` - TypeScript Definitions
- **`index.ts`**: Core type definitions
- **`themes.ts`**: Theme and styling types
- **`global.d.ts`**: Global type declarations

### `src/data/` - Static Data
- Configuration data for landing page, pricing, features
- Constants and lookup tables

## Key Files
- **`src/app/layout.tsx`**: Root layout with providers
- **`src/app/providers.tsx`**: React Query and other providers
- **`src/stack.tsx`**: Authentication configuration
- **`src/db/schema.ts`**: Database schema definition
- **`src/lib/actions.ts`**: All server-side mutations