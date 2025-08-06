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
```

**Authentication Failed**

```bash
# Check user permissions
sudo -u postgres psql -c "SELECT usename, usecreatedb, usesuper FROM pg_user;"

# Verify user exists
sudo -u postgres psql -c "SELECT usename FROM pg_user WHERE usename = 'anzii_user';"

# Reset user password
sudo -u postgres psql -c "ALTER USER anzii_user PASSWORD 'new_password';"
```

**Migration Errors**

```bash
# Check migration files
ls -la drizzle/

# Reset database
dropdb anzii
createdb anzii
pnpm db:migrate

# Check migration status
pnpm db:studio
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

### 4. Build and Deployment Issues

**Build Errors**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run typecheck

# Check ESLint errors
npm run lint
```

**Environment Variable Issues**

```bash
# Verify environment variables
node -e "console.log(process.env.DATABASE_URL)"
node -e "console.log(process.env.GEMINI_API_KEY)"

# Check .env.local file
cat .env.local

# Verify in production
# Vercel Dashboard → Project Settings → Environment Variables
```

**Deployment Failures**

```bash
# Check build logs
# Vercel Dashboard → Deployments → Latest deployment

# Test build locally
npm run build

# Check for missing dependencies
npm ls
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
