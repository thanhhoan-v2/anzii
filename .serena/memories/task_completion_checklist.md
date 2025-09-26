# Task Completion Checklist

## When a Development Task is Completed

### 1. Code Quality Checks (Required)
- `npm run lint` - Check for linting errors
- `npm run typecheck` - Ensure no TypeScript errors
- `npm run format:check` - Verify code formatting

### 2. Fix Issues (If Any)
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Auto-format code
- `npm run organize-imports` - Organize imports properly

### 3. Testing (If Applicable)
- `npm test` - Run unit tests for affected components
- `npm run test:e2e` - Run E2E tests for critical user flows
- `npm run test:coverage` - Check test coverage if adding new features

### 4. Database Operations (If Schema Changed)
- `npm run db:generate` - Generate migration files
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Verify changes in Drizzle Studio

### 5. Build Verification
- `npm run build` - Ensure production build succeeds
- Review build output for any warnings or errors

### 6. Git Operations (If Committing)
- Only commit when explicitly requested by user
- Use descriptive commit messages
- Never include "Co-authored-by" or Claude signatures

## Critical Notes
- NEVER commit changes unless explicitly asked by the user
- Always run lint and typecheck before considering task complete
- Database changes require migration generation and testing
- All server actions must have proper Zod validation
- Components should follow existing patterns and use Radix UI primitives