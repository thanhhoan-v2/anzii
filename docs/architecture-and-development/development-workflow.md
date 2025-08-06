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

# Development Workflow

Learn about development scripts, testing strategies, and best practices for contributing to Anzii.

## 🛠️ Available Scripts

### Development Commands

```bash
# Start development server
pnpm dev              # Start with Turbopack
pnpm dev:webpack      # Start with Webpack (fallback)

# Build and start production
pnpm build            # Build for production
pnpm start            # Start production server
```

### Code Quality

```bash
# Linting and formatting
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without fixing

# Type checking
pnpm typecheck        # TypeScript type checking

# Import organization
pnpm organize-imports # Organize imports automatically
```

### Testing

```bash
# Unit tests
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report

# E2E tests
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e:ui      # Run E2E tests with UI
pnpm test:e2e:headed  # Run E2E tests in headed mode

# All tests
pnpm test:all         # Run unit + E2E tests
```

### Database

```bash
# Database management
pnpm db:generate      # Generate new migration
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes (dev only)
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed database with sample data
```

## 🧪 Testing Strategy

### 1. Unit Testing (Jest + React Testing Library)

**Test Structure**

```tsx
// __tests__/components/deck-card.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeckCard } from "@/components/features/deck/deck-card";

describe("DeckCard", () => {
	const mockDeck = {
		id: "1",
		name: "Test Deck",
		description: "Test Description",
		cardCount: 10,
	};

	test("renders deck information correctly", () => {
		render(<DeckCard deck={mockDeck} />);

		expect(screen.getByText("Test Deck")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByText("10 cards")).toBeInTheDocument();
	});

	test("handles click events", async () => {
		const user = userEvent.setup();
		const mockOnClick = jest.fn();

		render(<DeckCard deck={mockDeck} onClick={mockOnClick} />);

		await user.click(screen.getByRole("button"));
		expect(mockOnClick).toHaveBeenCalledWith(mockDeck);
	});
});
```

**Testing Hooks**

```tsx
// __tests__/hooks/use-decks.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDecks } from "@/hooks/use-decks";

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});
	return ({ children }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

test("fetches decks successfully", async () => {
	const { result } = renderHook(() => useDecks(), {
		wrapper: createWrapper(),
	});

	await waitFor(() => {
		expect(result.current.isSuccess).toBe(true);
	});

	expect(result.current.data).toHaveLength(2);
});
```

### 2. E2E Testing (Playwright)

**Test Configuration**

```tsx
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	webServer: {
		command: "pnpm dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
```

**E2E Test Example**

```tsx
// tests/e2e/deck-creation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Deck Creation", () => {
	test("user can create a new deck", async ({ page }) => {
		// Navigate to create page
		await page.goto("/create");

		// Fill in deck details
		await page.fill('[data-testid="deck-name"]', "My New Deck");
		await page.fill('[data-testid="deck-description"]', "A test deck");

		// Submit form
		await page.click('[data-testid="create-deck"]');

		// Verify navigation to deck page
		await expect(page).toHaveURL(/\/deck\/.+/);
		await expect(page.locator("h1")).toContainText("My New Deck");
	});

	test("shows validation errors for invalid input", async ({ page }) => {
		await page.goto("/create");

		// Try to submit without required fields
		await page.click('[data-testid="create-deck"]');

		// Verify error message
		await expect(page.locator('[data-testid="error-message"]')).toContainText(
			"Deck name is required"
		);
	});
});
```

### 3. Test Utilities

**Test Helpers**

```tsx
// tests/utils/test-utils.tsx
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

function render(ui: React.ReactElement, options = {}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	const Wrapper = ({ children }) => (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="light">
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);

	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
```

## 🔄 Development Workflow

### 1. Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/amazing-feature

# 2. Make changes
# Edit files, add components, etc.

# 3. Run tests
pnpm test:all

# 4. Check code quality
pnpm lint
pnpm typecheck

# 5. Commit changes
git add .
git commit -m "feat: add amazing feature"

# 6. Push and create PR
git push origin feature/amazing-feature
```

### 2. Database Changes

```bash
# 1. Modify schema
# Edit src/db/schema.ts

# 2. Generate migration
pnpm db:generate

# 3. Review generated migration
cat drizzle/*.sql

# 4. Apply migration
pnpm db:migrate

# 5. Test changes
pnpm test

# 6. Commit migration
git add drizzle/
git commit -m "feat: add new database fields"
```

### 3. Component Development

```bash
# 1. Create component
mkdir -p src/components/features/new-feature
touch src/components/features/new-feature/index.tsx

# 2. Add tests
touch src/components/features/new-feature/__tests__/index.test.tsx

# 3. Test component
pnpm test src/components/features/new-feature

# 4. Check accessibility
# Use axe-core or similar tools
```

## 📋 Code Quality Standards

### 1. TypeScript

**Strict Configuration**

```json
// tsconfig.json
{
	"compilerOptions": {
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true
	}
}
```

**Type Definitions**

```tsx
// types/index.ts
export interface Deck {
	id: string;
	name: string;
	description?: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Card {
	id: string;
	front: string;
	back: string;
	deckId: string;
	createdAt: Date;
	updatedAt: Date;
}
```

### 2. ESLint Configuration

**Rules**

```json
// .eslintrc.json
{
	"extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
	"rules": {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"prefer-const": "error",
		"no-var": "error"
	}
}
```

### 3. Prettier Configuration

```json
// .prettierrc
{
	"semi": true,
	"trailingComma": "es5",
	"singleQuote": true,
	"printWidth": 80,
	"tabWidth": 2
}
```

## 🚀 Performance Monitoring

### 1. Bundle Analysis

```bash
# Analyze bundle size
pnpm build
npx @next/bundle-analyzer
```

### 2. Performance Testing

```tsx
// tests/performance/load-test.ts
import { test, expect } from "@playwright/test";

test("dashboard loads within 2 seconds", async ({ page }) => {
	const startTime = Date.now();

	await page.goto("/dashboard");
	await page.waitForLoadState("networkidle");

	const loadTime = Date.now() - startTime;
	expect(loadTime).toBeLessThan(2000);
});
```

### 3. Lighthouse Testing

```bash
# Install lighthouse
npm install -g lighthouse

# Run lighthouse
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

## 🔍 Debugging Tools

### 1. React Query DevTools

```tsx
// app/providers.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
```

### 2. Database Debugging

```bash
# Open Drizzle Studio
pnpm db:studio

# Check database logs
tail -f /var/log/postgresql/postgresql-*.log
```

### 3. Network Debugging

```bash
# Monitor API calls
npx next dev --inspect

# Use browser dev tools
# Network tab for API calls
# Performance tab for bottlenecks
```

## 📚 Related Documentation

* [**Quick Start**](../setup-and-installation/quick-start.md) - Get up and running quickly
* [**Project Architecture**](architecture.md) - Understanding the tech stack
* [**UI Development**](ui-development.md) - Building with the design system
* [**Database Setup**](../setup-and-installation/database-setup.md) - Database development practices
* [**Contributing Guide**](../deployment-and-support/contributing.md) - How to contribute code

***

**Ready to start coding?** Check out the [UI Development](ui-development.md) guide to learn about building components with the design system!
