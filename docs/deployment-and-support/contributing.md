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

# Contributing Guide

Learn how to contribute to Anzii and help improve the AI-powered learning platform.

## 🤝 How to Contribute

### 1. Getting Started

**Fork and Clone**

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/your-username/anzii.git
cd anzii

# Add upstream remote
git remote add upstream https://github.com/original-owner/anzii.git
```

**Setup Development Environment**

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Setup database
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

### 2. Development Workflow

**Create Feature Branch**

```bash
# Create a new branch for your feature
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/bug-description
```

**Make Changes**

```bash
# Make your changes
# Follow coding standards
# Add tests for new functionality
# Update documentation

# Check code quality
pnpm lint
pnpm typecheck
pnpm test:all
```

**Commit Changes**

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add amazing feature

- Added new AI-powered deck generation
- Implemented user preferences
- Added comprehensive tests
- Updated documentation

Closes #123"
```

**Push and Create PR**

```bash
# Push to your fork
git push origin feature/amazing-feature

# Create Pull Request on GitHub
# Fill out the PR template
# Request review from maintainers
```

## 📋 Contribution Guidelines

### 1. Code Standards

**TypeScript**

* Use strict TypeScript configuration
* Add proper type definitions
* Avoid `any` type when possible
* Use interfaces for object shapes

**React Components**

```tsx
// Use functional components with hooks
export function MyComponent({ prop }: MyComponentProps) {
	// Component logic
	return <div>Content</div>;
}

// Add proper prop types
interface MyComponentProps {
	prop: string;
	optional?: boolean;
}
```

**File Organization**

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and core logic
└── types/               # TypeScript definitions
```

### 2. Testing Requirements

**Unit Tests**

```tsx
// __tests__/components/my-component.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/my-component";

describe("MyComponent", () => {
	test("renders correctly", () => {
		render(<MyComponent prop="test" />);
		expect(screen.getByText("test")).toBeInTheDocument();
	});
});
```

**E2E Tests**

```tsx
// tests/e2e/my-feature.spec.ts
import { test, expect } from "@playwright/test";

test("user can use my feature", async ({ page }) => {
	await page.goto("/my-feature");
	await expect(page.locator("h1")).toContainText("My Feature");
});
```

**Test Coverage**

* Aim for 80%+ coverage on new code
* Test critical user flows
* Include error scenarios
* Test accessibility features

### 3. Documentation

**Code Documentation**

```tsx
/**
 * Generates flashcards from markdown content using AI
 * @param content - The markdown content to process
 * @param options - Configuration options
 * @returns Promise resolving to generated flashcards
 */
export async function generateFlashcards(
	content: string,
	options: GenerateOptions
): Promise<Flashcard[]> {
	// Implementation
}
```

**README Updates**

* Update README.md for new features
* Add usage examples
* Update installation instructions
* Document breaking changes

**API Documentation**

```tsx
// Document API endpoints
/**
 * @api {post} /api/decks Create a new deck
 * @apiName CreateDeck
 * @apiGroup Decks
 * @apiParam {String} name Deck name
 * @apiParam {String} [description] Deck description
 * @apiSuccess {Object} deck Created deck object
 */
```

## 🎯 Contribution Areas

### 1. Frontend Development

**UI Components**

* Build accessible components
* Follow design system guidelines
* Add proper ARIA labels
* Implement responsive design

**State Management**

* Use React Query for server state
* Use Zustand for client state
* Implement proper error handling
* Add loading states

**Performance**

* Optimize bundle size
* Implement code splitting
* Add proper caching
* Monitor Core Web Vitals

### 2. Backend Development

**API Development**

```tsx
// app/api/decks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/server";
import { createDeck } from "@/lib/actions";

export async function POST(request: NextRequest) {
	try {
		const user = await requireAuth();
		const body = await request.json();

		const deck = await createDeck({
			...body,
			userId: user.id,
		});

		return NextResponse.json(deck);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create deck" },
			{ status: 500 }
		);
	}
}
```

**Database Operations**

* Write efficient queries
* Add proper indexes
* Implement data validation
* Handle database errors

### 3. AI Integration

**AI Flows**

```tsx
// ai/flows/new-ai-feature.ts
export async function newAIFeature(input: string) {
	try {
		const result = await geminiModel.generateContent(input);
		return result.response.text();
	} catch (error) {
		console.error("AI Error:", error);
		throw new Error("AI service temporarily unavailable");
	}
}
```

**Error Handling**

* Add rate limiting
* Implement retry logic
* Cache AI responses
* Handle API failures gracefully

### 4. Testing

**Unit Tests**

```tsx
// __tests__/hooks/use-decks.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { useDecks } from "@/hooks/use-decks";

test("fetches decks successfully", async () => {
	const { result } = renderHook(() => useDecks());

	await waitFor(() => {
		expect(result.current.isSuccess).toBe(true);
	});
});
```

**Integration Tests**

* Test API endpoints
* Test database operations
* Test authentication flows
* Test AI integration

### 5. Documentation

**Technical Documentation**

* Update architecture docs
* Document API changes
* Add code examples
* Explain complex logic

**User Documentation**

* Update user guides
* Add feature tutorials
* Document best practices
* Create troubleshooting guides

## 🔄 Pull Request Process

### 1. PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)

## Screenshots (if applicable)

Add screenshots for UI changes

## Additional Notes

Any additional context or notes
```

### 2. Review Process

**Code Review Checklist**

* [ ] Code follows project standards
* [ ] Tests are comprehensive
* [ ] Documentation is updated
* [ ] No security vulnerabilities
* [ ] Performance impact considered
* [ ] Accessibility requirements met

**Review Guidelines**

* Be constructive and respectful
* Focus on code quality and functionality
* Suggest improvements when possible
* Test the changes locally if needed

### 3. Merge Process

**Before Merging**

* All tests must pass
* Code review approved
* Documentation updated
* No conflicts with main branch

**After Merging**

* Delete feature branch
* Update release notes
* Deploy to staging (if applicable)
* Monitor for issues

## 🐛 Bug Reports

### 1. Bug Report Template

```markdown
## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

## Additional Context

Screenshots, logs, or other relevant information
```

### 2. Issue Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `priority: high` - High priority issue
* `priority: low` - Low priority issue

## 🚀 Feature Requests

### 1. Feature Request Template

```markdown
## Feature Description

Clear description of the feature

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How should this feature work?

## Alternative Solutions

Other ways to solve this problem

## Additional Context

Screenshots, mockups, or examples
```

### 2. Feature Development Process

1. **Discussion**
   * Create issue for discussion
   * Gather feedback from community
   * Define requirements clearly
2. **Planning**
   * Break down into smaller tasks
   * Estimate effort required
   * Plan testing strategy
3. **Implementation**
   * Follow development workflow
   * Write comprehensive tests
   * Update documentation
4. **Review**
   * Code review process
   * User testing (if applicable)
   * Performance testing

## 📚 Learning Resources

### 1. Project-Specific

* [**Getting Started**](../) - Setup development environment
* [**Architecture**](../architecture-and-development/architecture.md) - Understand the codebase
* [**Development Workflow**](../architecture-and-development/development-workflow.md) - Development practices
* [**Testing Guide**](../testing.md) - Testing strategies

### 2. Technology Stack

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://react.dev)
* [TypeScript Handbook](https://www.typescriptlang.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [TanStack Query Documentation](https://tanstack.com/query/latest)

### 3. Best Practices

* [React Best Practices](https://react.dev/learn)
* [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Testing Best Practices](https://testing-library.com/docs/guiding-principles)
* [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 Recognition

### 1. Contributors

All contributors are recognized in:

* GitHub contributors list
* Project README
* Release notes
* Contributor hall of fame

### 2. Contribution Levels

* **First Time Contributor** - First PR merged
* **Regular Contributor** - Multiple PRs merged
* **Core Contributor** - Significant contributions
* **Maintainer** - Project maintenance responsibilities

### 3. Rewards

* Recognition in project documentation
* Contributor badges
* Special mentions in releases
* Invitation to maintainer team (for significant contributions)

## 📞 Getting Help

### 1. Communication Channels

* **GitHub Issues** - Bug reports and feature requests
* **GitHub Discussions** - Questions and general discussion
* **Discord/Slack** - Real-time chat (if available)
* **Email** - Direct contact for sensitive issues

### 2. Asking Questions

**Before Asking**

* Check existing issues and discussions
* Read the documentation
* Try to reproduce the issue
* Provide clear, detailed information

**Question Template**

```markdown
## Question

Clear description of your question

## What I've Tried

Steps you've already taken

## Environment

Relevant environment details

## Additional Context

Any other relevant information
```

## 📚 Related Documentation

* [**Getting Started**](../) - Setup development environment
* [**Development Workflow**](../architecture-and-development/development-workflow.md) - Development practices
* [**Testing Guide**](../testing.md) - Testing strategies
* [**Debugging Guide**](debugging.md) - Troubleshooting issues

***

**Ready to contribute?** Start with the [Getting Started](../) guide to set up your development environment!
