# Getting Started with Anzii

Welcome to Anzii! This guide will help you set up the development environment and get started with contributing to our AI-powered spaced repetition learning platform.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js 18+](https://nodejs.org/en/)** - JavaScript runtime
- **[pnpm](https://pnpm.io/installation)** - Package manager (recommended over npm)
- **[PostgreSQL](https://www.postgresql.org/download/)** - Database (or [Neon](https://neon.tech/) for cloud)
- **[Git](https://git-scm.com/)** - Version control

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/anzii.git
cd anzii

# Install dependencies
pnpm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local
```

Configure your `.env.local` with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host/database"

# AI Services
GEMINI_API_KEY="your-gemini-api-key"

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

### 3. Database Setup

```bash
# Generate database migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Optional: Seed with sample data
pnpm db:seed
```

### 4. Start Development Server

```bash
# Start the development server
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Project Architecture

### Tech Stack

- **Frontend**: Next.js 15 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Gemini API for content generation
- **Authentication**: Stack Auth (replacing NextAuth.js)
- **State Management**: TanStack Query (React Query) + Zustand
- **Testing**: Jest + Playwright for E2E
- **Animations**: GSAP + Framer Motion

### Key Directories

```
src/
├── app/                    # Next.js app router pages & API routes
├── components/             # Reusable UI components
│   ├── ui/               # Base UI components (Radix + Tailwind)
│   ├── features/         # Feature-specific components
│   └── layout/           # Layout components
├── db/                   # Database schema & migrations
├── ai/                   # AI integration flows
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & core logic
└── types/                # TypeScript definitions
```

## 🧪 Development Workflow

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm typecheck        # TypeScript type checking

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:e2e         # Run E2E tests with Playwright
pnpm test:all         # Run all tests

# Database
pnpm db:generate      # Generate new migration
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Drizzle Studio
```

### Database Management

```bash
# Create a new migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# View database in browser
pnpm db:studio
```

### Testing Strategy

- **Unit Tests**: Jest + React Testing Library for component testing
- **E2E Tests**: Playwright for full user journey testing
- **Test Coverage**: Aim for 80%+ coverage on critical paths

## 🎨 UI Development

### Component Guidelines

1. **Use Radix UI primitives** for accessible components
2. **Follow the design system** in `src/components/ui/`
3. **Implement responsive design** with Tailwind breakpoints
4. **Add proper TypeScript types** for all props

### Theme System

Anzii includes 17 curated themes with WCAG 2.1 AA compliance:

```tsx
// Example theme usage
import { useColorScheme } from "@/hooks/use-color-scheme";

function MyComponent() {
	const { colorScheme, setColorScheme } = useColorScheme();

	return (
		<div className="bg-background text-foreground">
			{/* Your themed component */}
		</div>
	);
}
```

## 🤖 AI Integration

### AI Flows

The AI system is located in `src/ai/flows/`:

- **generate-cards-from-markdown.ts** - Convert markdown to flashcards
- **generate-deck-from-topic.ts** - Create decks from topics
- **generate-deck-description.ts** - Generate deck descriptions
- **suggest-questions.ts** - Suggest additional questions

### Adding New AI Features

1. Create a new flow in `src/ai/flows/`
2. Add proper error handling and rate limiting
3. Include TypeScript types for all inputs/outputs
4. Add tests for the AI flow

## 📊 State Management

### React Query (TanStack Query)

Used for server state management:

```tsx
// Example query hook
import { useQuery } from "@tanstack/react-query";
import { getDecks } from "@/lib/actions";

function useDecks() {
	return useQuery({
		queryKey: ["decks"],
		queryFn: getDecks,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
```

### Zustand

Used for client state management:

```tsx
// Example store
import { create } from "zustand";

interface SettingsStore {
	theme: string;
	setTheme: (theme: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
	theme: "default",
	setTheme: (theme) => set({ theme }),
}));
```

## 🔐 Authentication

Anzii uses Stack Auth for authentication:

### Client Components

```tsx
import { useUser } from "@stackframe/stack";

function MyComponent() {
	const user = useUser();

	if (!user) return <div>Please sign in</div>;

	return <div>Welcome, {user.displayName}!</div>;
}
```

### Server Components

```tsx
import { stackServerApp } from "@/stack";

export default async function ServerComponent() {
	const user = await stackServerApp.getUser();

	return <div>Hello, {user?.displayName}</div>;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
GEMINI_API_KEY="your-production-gemini-key"
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"
```

## 🐛 Debugging

### Development Tools

- **React Query DevTools**: Available in development mode
- **Drizzle Studio**: `pnpm db:studio` for database inspection
- **Next.js DevTools**: Built-in debugging tools

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **AI API**: Verify GEMINI_API_KEY is valid and has sufficient quota
3. **Authentication**: Check Stack Auth configuration in environment variables

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Add tests** for new functionality
5. **Run the test suite**: `pnpm test:all`
6. **Submit a pull request** with a clear description

### Code Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Include tests for critical functionality

## 📞 Support

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the docs folder for detailed guides

---

Happy coding! 🎉
