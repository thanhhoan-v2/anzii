# Code Style and Conventions

## TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- Path aliases: `@/*` for `./src/*`, `@/assets/*` for `./assets/*`

## Code Formatting (Prettier)
- Uses tabs (not spaces)
- Tab width: 2
- Semicolons: required
- Quotes: double quotes (not single)
- Trailing comma: ES5 style
- Arrow parens: always
- Print width: 80 characters
- Bracket spacing: true
- End of line: LF

## ESLint Rules
- Extends Next.js core web vitals and TypeScript configs
- Import organization with simple-import-sort
- Console statements: warn (allow warn/error)
- React hooks exhaustive deps: warn
- Disabled rules: array index keys, non-null assertions, unused vars

## Naming Conventions
- **Components**: PascalCase (e.g., `DeckCard`, `StudySession`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDecks`, `useDeckLike`)
- **Functions**: camelCase (e.g., `addCard`, `createDeck`)
- **Types/Interfaces**: PascalCase (e.g., `DeckCardProps`, `ActionResponse`)
- **Files**: kebab-case for components, camelCase for utilities

## Code Organization Patterns
- **Server Actions**: Centralized in `src/lib/actions.ts` with Zod validation
- **Custom Hooks**: Domain-specific logic in `src/hooks/` with React Query
- **Components**: Atomic design - UI components in `src/components/ui/`, features in `src/components/features/`
- **Types**: Centralized in `src/types/`
- **Database**: Schema and operations in `src/db/` using Drizzle ORM