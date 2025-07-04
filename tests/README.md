# Testing Guide

This project uses a comprehensive testing setup with Jest + React Testing Library for unit/integration tests and Playwright for end-to-end testing.

## 🧪 Test Structure

```
tests/
├── e2e/                    # Playwright e2e tests
│   └── homepage.spec.ts    # Example e2e test
├── fixtures/               # Test fixtures and mock data
├── utils/                  # Test utilities and helpers
│   └── test-utils.tsx      # Custom render function with providers
└── README.md               # This file

src/
└── components/
    └── __tests__/          # Unit tests for components
        └── app-logo.test.tsx
```

## 🚀 Running Tests

### Unit/Integration Tests (Jest + RTL)

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (great for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests with UI mode (visual test runner)
npm run test:e2e:ui

# Run e2e tests in headed mode (see browser)
npm run test:e2e:headed
```

### Run All Tests

```bash
# Run both unit and e2e tests
npm run test:all
```

## 📝 Writing Tests

### Unit Tests

Unit tests should be placed in `__tests__` folders next to the component being tested or with `.test.tsx` suffix.

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

### Integration Tests

For components that need providers (themes, context, etc.), use the custom render function:

```typescript
import { render, screen } from '../../../tests/utils/test-utils'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('renders with theme provider', () => {
    render(<MyComponent />)
    // Test will automatically have ThemeProvider wrapped
  })
})
```

### E2E Tests

E2E tests should be placed in the `tests/e2e/` directory:

```typescript
import { test, expect } from "@playwright/test";

test("user can complete signup flow", async ({ page }) => {
	await page.goto("/sign-up");

	await page.fill('[name="email"]', "test@example.com");
	await page.fill('[name="password"]', "password123");
	await page.click('[type="submit"]');

	await expect(page).toHaveURL("/dashboard");
});
```

## 🛠️ Configuration

### Jest Configuration

- **File**: `jest.config.js`
- **Setup**: `jest.setup.js`
- Configured for Next.js with automatic module mapping
- Includes coverage collection
- Mocks for Next.js components and hooks

### Playwright Configuration

- **File**: `playwright.config.ts`
- Tests multiple browsers (Chrome, Firefox, Safari)
- Mobile viewport testing
- Automatic dev server startup
- Screenshots and videos on failure

## 🎯 Best Practices

### Unit Tests

- Test component behavior, not implementation details
- Use `screen.getByRole()` over `getByTestId()` when possible
- Mock external dependencies
- Test edge cases and error states

### E2E Tests

- Test complete user workflows
- Keep tests independent (don't rely on other tests)
- Use page object models for complex interactions
- Test on multiple viewports when UI responsive

### General

- Write descriptive test names
- Group related tests with `describe` blocks
- Clean up after tests (mocks, local storage, etc.)
- Keep tests fast and reliable

## 🔧 Available Utilities

### Test Utils

- `render()`: Custom render with providers
- `mockConsoleError()`: Mock console.error
- `mockConsoleWarn()`: Mock console.warn
- `mockLocalStorage()`: Mock localStorage API

### Jest Matchers

- `toBeInTheDocument()`
- `toHaveClass()`
- `toHaveTextContent()`
- `toHaveAttribute()`
- And all standard Jest matchers

## 🐛 Troubleshooting

### Common Issues

**TypeScript errors with Jest globals:**

- Ensure `@types/jest` is installed
- Check `tsconfig.json` includes test files

**Tests failing due to Next.js features:**

- Check `jest.setup.js` for proper mocks
- Add custom mocks for Next.js components as needed

**Playwright tests timing out:**

- Increase timeout in `playwright.config.ts`
- Ensure dev server starts properly
- Check network conditions

### Debug Tips

```bash
# Debug Jest tests
npm run test -- --verbose

# Debug Playwright tests
npm run test:e2e -- --debug

# Generate Playwright test code
npx playwright codegen http://localhost:3000
```
