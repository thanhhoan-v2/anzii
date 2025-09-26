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

# Debugging Guide

Troubleshoot common issues and debug problems in Anzii development and production.

## 🔍 Debugging Tools

### 1. Development Tools

**React Query DevTools**

```tsx
// Available in development mode
// Shows query cache, mutations, and performance
// Access via browser dev tools or standalone window
```

**Next.js DevTools**

```bash
# Built-in debugging tools
# Network tab for API calls
# Performance tab for bottlenecks
# Console for errors and logs
```

**Drizzle Studio**

```bash
# Database browser
pnpm db:studio

# View tables, data, and relationships
# Execute SQL queries
# Export data
```

### 2. Logging and Monitoring

**Structured Logging**

```tsx
// lib/logger.ts
export function log(
	level: "info" | "warn" | "error",
	message: string,
	data?: any
) {
	const logEntry = {
		level,
		message,
		data,
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
	};

	if (level === "error") {
		console.error(logEntry);
	} else if (level === "warn") {
		console.warn(logEntry);
	} else {
		console.log(logEntry);
	}
}
```

**Error Boundary**

```tsx
// components/common/error-boundary.tsx
"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error("Error caught by boundary:", error, errorInfo);

		// Send to error monitoring service
		log("error", "React Error Boundary caught error", {
			error: error.message,
			stack: error.stack,
			errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="flex min-h-screen flex-col items-center justify-center p-4">
						<h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
						<p className="mb-4 text-muted-foreground">
							An unexpected error occurred. Please try refreshing the page.
						</p>
						<Button onClick={() => window.location.reload()}>
							Refresh Page
						</Button>
					</div>
				)
			);
		}

		return this.props.children;
	}
}
```

## 🐛 Common Issues

### 1. Database Issues

**Connection Refused**

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Start PostgreSQL service
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux

# Check connection string format
DATABASE_URL="postgresql://username:password@host:port/database"

# For Neon database (cloud)
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"
```

**Authentication Failed**

```bash
# Check user permissions
sudo -u postgres psql -c "SELECT usename, usecreatedb, usesuper FROM pg_user;"

# Verify user exists
sudo -u postgres psql -c "SELECT usename FROM pg_user WHERE usename = 'anzii_user';"

# Reset user password
sudo -u postgres psql -c "ALTER USER anzii_user PASSWORD 'new_password';"

# For Neon database issues
# Check Neon dashboard for connection details
# Verify database name and endpoint
# Check for connection pooling settings
```

**Migration Errors**

```bash
# Check migration files
ls -la src/db/migrations/

# View current migration status
npm run db:studio

# Reset database (CAREFUL: destroys data)
npm run db:push --force

# Rollback specific migration
npm run db:rollback

# Generate new migration
npm run db:generate

# Apply migrations manually
npm run db:migrate
```

**Social Features Database Issues**

```bash
# Check if user_likes table exists
psql $DATABASE_URL -c "\dt user_likes"

# Verify like counts are accurate
psql $DATABASE_URL -c "
SELECT d.id, d.name, d.like_count,
       (SELECT COUNT(*) FROM user_likes ul WHERE ul.deck_id = d.id) as actual_likes
FROM decks d
WHERE d.like_count != (SELECT COUNT(*) FROM user_likes ul WHERE ul.deck_id = d.id);"

# Fix inconsistent like counts
psql $DATABASE_URL -c "
UPDATE decks SET like_count = (
  SELECT COUNT(*) FROM user_likes WHERE deck_id = decks.id
);"
```

### 2. AI API Issues

**Rate Limit Exceeded**

```bash
# Check API usage
# Visit Google AI Studio dashboard
# Monitor quota usage

# Implement rate limiting
# Add delays between requests
# Cache responses when possible
```

**Invalid API Key**

```bash
# Verify API key format
echo $GEMINI_API_KEY

# Test API key
curl -H "Content-Type: application/json" \
     -H "x-goog-api-key: YOUR_API_KEY" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

**API Response Errors**

```tsx
// Add error handling to AI flows
try {
	const result = await geminiModel.generateContent(prompt);
	const response = await result.response;
	return response.text();
} catch (error) {
	console.error("AI API Error:", error);

	if (error.message.includes("rate limit")) {
		throw new Error("Rate limit exceeded. Please try again later.");
	}

	if (error.message.includes("invalid")) {
		throw new Error("Invalid API key or configuration.");
	}

	throw new Error("AI service temporarily unavailable.");
}
```

### 3. Authentication Issues

**Stack Auth Configuration**

```bash
# Verify environment variables
echo $NEXT_PUBLIC_STACK_PROJECT_ID
echo $NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
echo $STACK_SECRET_SERVER_KEY

# Check Stack Auth dashboard
# Verify project configuration
# Check redirect URLs
```

**Session Problems**

```tsx
// Debug session state
const user = useUser();
console.log("Current user:", user);

// Check session in browser
// Application tab → Local Storage
// Look for Stack Auth session data
```

**Redirect Issues**

```tsx
// Verify redirect URLs in Stack Auth dashboard
// Should include:
// http://localhost:3000/handler/sign-in
// http://localhost:3000/handler/sign-up
// http://localhost:3000/handler/forgot-password
```

### 4. React Query and Social Features Issues

**Like System Not Working**

```tsx
// Debug like mutations
const deckLikeMutation = useDeckLike();

// Add logging to mutation
const handleLike = () => {
  console.log('Attempting to like deck:', deck.id);

  deckLikeMutation.mutate(
    { deckId: deck.id, userId },
    {
      onSuccess: (data) => {
        console.log('Like successful:', data);
      },
      onError: (error) => {
        console.error('Like failed:', error);
      }
    }
  );
};

// Check mutation state
console.log('Mutation state:', {
  isPending: deckLikeMutation.isPending,
  isError: deckLikeMutation.isError,
  error: deckLikeMutation.error
});
```

**Optimistic Updates Not Working**

```tsx
// Debug React Query cache
import { useQueryClient } from '@tanstack/react-query';

function DebugCache() {
  const queryClient = useQueryClient();

  // Inspect cache contents
  const cacheData = queryClient.getQueryData(['decks', userId]);
  console.log('Cache data:', cacheData);

  // Check if cache is being updated
  queryClient.setQueryData(['decks', userId], (oldData) => {
    console.log('Cache update - old data:', oldData);
    return oldData;
  });

  return null;
}
```

**Cache Invalidation Issues**

```bash
# Clear React Query cache manually
# In browser dev tools console:
window.queryClient?.clear()

# Or restart development server
npm run dev
```

**API Route Authentication Issues**

```tsx
// Debug authentication in API routes
// src/app/api/decks/[deckId]/like/route.ts
export async function POST(request: NextRequest, context) {
  try {
    const user = await stackServerApp.getUser();
    console.log('Authenticated user:', user);

    if (!user) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Continue with like logic...
  } catch (error) {
    console.error('Auth error:', error);
  }
}
```

### 5. Build and Deployment Issues

**Next.js 15 Build Errors**

```bash
# Clear Next.js cache and regenerate
rm -rf .next
rm -rf .next/cache

# Clear Turbopack cache
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run typecheck

# Check ESLint errors
npm run lint

# Test production build
npm run build
npm run start
```

**React 19 Compatibility Issues**

```bash
# Check for React 19 compatibility warnings
npm run build 2>&1 | grep -i "react"

# Verify React dependencies
npm ls react react-dom

# Check for conflicting React versions
npm ls | grep react
```

**Turbopack Build Issues**

```bash
# Disable Turbopack temporarily
TURBOPACK=0 npm run dev

# Check Turbopack specific errors
npm run dev 2>&1 | grep -i "turbo"

# Clear Turbopack cache
rm -rf node_modules/.cache/turbopack
```

**Environment Variable Issues**

```bash
# Verify environment variables
node -e "console.log(process.env.DATABASE_URL)"
node -e "console.log(process.env.GEMINI_API_KEY)"
node -e "console.log(process.env.STACK_PROJECT_ID)"

# Check .env.local file
cat .env.local

# Check for variable name typos
grep -r "process.env" src/ | grep -v node_modules

# Verify in production
# Vercel Dashboard → Project Settings → Environment Variables
```

**Deployment Failures**

```bash
# Check build logs
# Vercel Dashboard → Deployments → Latest deployment

# Test build locally with exact production environment
NODE_ENV=production npm run build

# Check for missing dependencies
npm ls --production

# Verify package.json scripts
npm run lint && npm run typecheck && npm run build

# Check for memory issues during build
node --max-old-space-size=4096 ./node_modules/.bin/next build
```

**Vercel Deployment Issues**

```bash
# Check deployment function sizes
vercel ls

# Monitor function execution time
# Vercel Dashboard → Functions → Execution time

# Check for serverless function timeouts
# Increase function timeout in vercel.json:
# {
#   "functions": {
#     "app/api/**/*.ts": {
#       "maxDuration": 30
#     }
#   }
# }
```

## 🔧 Debugging Techniques

### 1. Network Debugging

**API Request Monitoring**

```tsx
// Add request logging
const apiCall = async (url: string, options: RequestInit) => {
	console.log("API Request:", { url, options });

	try {
		const response = await fetch(url, options);
		console.log("API Response:", { status: response.status, url });
		return response;
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
};
```

**Database Query Logging**

```tsx
// Enable query logging in development
// lib/db/index.ts
const db = drizzle(pool, {
	logger: process.env.NODE_ENV === "development",
});
```

### 2. Performance Debugging

**Bundle Analysis**

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check for large dependencies
npm ls --depth=0
```

**Performance Monitoring**

```tsx
// Track component render times
import { useEffect, useRef } from "react";

export function usePerformanceTracking(componentName: string) {
	const startTime = useRef(Date.now());

	useEffect(() => {
		const renderTime = Date.now() - startTime.current;
		console.log(`${componentName} rendered in ${renderTime}ms`);
	});
}
```

### 3. State Debugging

**React Query Debugging**

```tsx
// Enable React Query DevTools
// Available in development mode
// Shows query cache, mutations, and performance

// Debug specific queries
const { data, error, isLoading } = useQuery({
	queryKey: ["decks"],
	queryFn: getDecks,
	onSuccess: (data) => console.log("Decks loaded:", data),
	onError: (error) => console.error("Decks error:", error),
});
```

**Zustand Store Debugging**

```tsx
// Add debugging to stores
import { devtools } from "zustand/middleware";

export const useSettingsStore = create<SettingsState & SettingsActions>()(
	devtools(
		persist(
			(set) => ({
				// ... store implementation
			}),
			{ name: "anzii-settings" }
		),
		{ name: "Settings Store" }
	)
);
```

## 🧪 Testing Debugging

### 1. Test Debugging

**Jest Debugging**

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- --testPathPattern=use-decks.test.ts

# Debug failing tests
npm test -- --detectOpenHandles
```

**Playwright Debugging**

```bash
# Run tests in headed mode
npm run test:e2e:headed

# Run tests with UI
npm run test:e2e:ui

# Debug specific test
npm run test:e2e -- --grep "user can sign in"
```

### 2. E2E Test Debugging

**Screenshot Debugging**

```tsx
// tests/e2e/debug.spec.ts
import { test, expect } from "@playwright/test";

test("debug test", async ({ page }) => {
	await page.goto("/dashboard");

	// Take screenshot on failure
	await page.screenshot({ path: "debug-screenshot.png" });

	// Check page content
	const content = await page.textContent("body");
	console.log("Page content:", content);
});
```

**Network Debugging**

```tsx
// Monitor network requests
test("debug network", async ({ page }) => {
	page.on("request", (request) => {
		console.log("Request:", request.url());
	});

	page.on("response", (response) => {
		console.log("Response:", response.url(), response.status());
	});

	await page.goto("/dashboard");
});
```

## 📊 Monitoring and Alerts

### 1. Error Monitoring

**Sentry Integration**

```tsx
// lib/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	environment: process.env.NODE_ENV,
	tracesSampleRate: 1.0,
});

export function captureError(error: Error, context?: any) {
	Sentry.captureException(error, {
		extra: context,
	});
}
```

**Custom Error Tracking**

```tsx
// lib/error-tracking.ts
export function trackError(error: Error, context?: Record<string, any>) {
	const errorData = {
		message: error.message,
		stack: error.stack,
		context,
		timestamp: new Date().toISOString(),
		url: typeof window !== "undefined" ? window.location.href : "",
		userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
	};

	// Send to your error tracking service
	console.error("Tracked Error:", errorData);
}
```

### 2. Performance Monitoring

**Core Web Vitals**

```tsx
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric: any) {
	console.log("Web Vital:", metric);
	// Send to your analytics service
}

export function trackWebVitals() {
	getCLS(sendToAnalytics);
	getFID(sendToAnalytics);
	getFCP(sendToAnalytics);
	getLCP(sendToAnalytics);
	getTTFB(sendToAnalytics);
}
```

**Custom Performance Metrics**

```tsx
// lib/performance.ts
export function trackPerformance(metric: string, value: number) {
	const performanceData = {
		metric,
		value,
		timestamp: new Date().toISOString(),
		url: typeof window !== "undefined" ? window.location.href : "",
	};

	console.log("Performance Metric:", performanceData);
	// Send to your analytics service
}
```

## 🚨 Emergency Procedures

### 1. Database Recovery

**Backup and Restore**

```bash
# Create backup
pg_dump -h localhost -U anzii_user -d anzii > backup.sql

# Restore from backup
psql -h localhost -U anzii_user -d anzii < backup.sql

# Reset database
dropdb anzii
createdb anzii
pnpm db:migrate
pnpm db:seed
```

### 2. Application Recovery

**Rollback Deployment**

```bash
# Vercel rollback
vercel rollback

# Docker rollback
docker-compose down
docker-compose up -d --scale app=1
```

**Emergency Environment Variables**

```bash
# Set emergency environment variables
export DATABASE_URL="emergency-database-url"
export GEMINI_API_KEY="emergency-api-key"

# Restart application
npm run dev
```

## 📚 Related Documentation

* [**Environment Setup**](../setup-and-installation/environment-setup.md) - Configure development environment
* [**Database Setup**](../setup-and-installation/database-setup.md) - Database troubleshooting
* [**Deployment Guide**](deployment.md) - Production debugging
* [**Development Workflow**](../architecture-and-development/development-workflow.md) - Testing and debugging

***

**Need more help?** Check out the [Contributing Guide](contributing.md) for how to report issues and contribute fixes!
