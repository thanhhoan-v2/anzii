# Deployment Guide

Deploy Anzii to production with proper configuration and best practices.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**

- Optimized for Next.js applications
- Automatic deployments from Git
- Built-in analytics and monitoring
- Edge functions and serverless support

**Setup Steps:**

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy from project directory
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required environment variables:

   ```env
   DATABASE_URL="your-production-database-url"
   GEMINI_API_KEY="your-production-gemini-key"
   NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
   STACK_SECRET_SERVER_KEY="your-stack-server-key"
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
   ```

3. **Configure Domains**
   - Go to Vercel Dashboard → Project Settings → Domains
   - Add your custom domain
   - Configure DNS records

### 2. Railway

**Setup Steps:**

1. **Connect Repository**

   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login to Railway
   railway login

   # Link project
   railway link

   # Deploy
   railway up
   ```

2. **Environment Variables**
   - Go to Railway Dashboard → Project → Variables
   - Add all required environment variables

### 3. Docker Deployment

**Dockerfile:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx drizzle-kit generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose:**

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - NEXT_PUBLIC_STACK_PROJECT_ID=${NEXT_PUBLIC_STACK_PROJECT_ID}
      - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=${NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY}
      - STACK_SECRET_SERVER_KEY=${STACK_SECRET_SERVER_KEY}
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=anzii
      - POSTGRES_USER=anzii_user
      - POSTGRES_PASSWORD=your_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🗄️ Production Database Setup

### 1. Neon (Recommended)

**Setup Steps:**

1. **Create Neon Project**
   - Visit [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Configure Environment**

   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx-xxx-xxx.region.aws.neon.tech/anzii?sslmode=require"
   ```

3. **Run Migrations**
   ```bash
   # Run migrations on production database
   DATABASE_URL="your-production-db-url" pnpm db:migrate
   ```

### 2. Supabase

**Setup Steps:**

1. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create a new project
   - Get the connection string

2. **Configure Environment**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```

### 3. AWS RDS

**Setup Steps:**

1. **Create RDS Instance**

   ```bash
   # Using AWS CLI
   aws rds create-db-instance \
     --db-instance-identifier anzii-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username anzii_user \
     --master-user-password your_secure_password \
     --allocated-storage 20
   ```

2. **Configure Security Groups**
   - Allow inbound traffic on port 5432
   - Restrict to your application's IP

## 🔧 Production Configuration

### 1. Next.js Configuration

```tsx
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@stackframe/stack"],
	},

	// Enable static optimization
	output: "standalone",

	// Security headers
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
				],
			},
		];
	},

	// Image optimization
	images: {
		domains: ["your-domain.com"],
		formats: ["image/webp", "image/avif"],
	},

	// Environment variables
	env: {
		CUSTOM_KEY: process.env.CUSTOM_KEY,
	},
};

export default nextConfig;
```

### 2. Environment Variables

**Production Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# AI Services
GEMINI_API_KEY="your-production-gemini-api-key"

# Authentication
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"

# Security
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-domain.com"

# Performance
NODE_ENV="production"
```

### 3. Security Configuration

**CORS Configuration:**

```tsx
// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

export function corsMiddleware(request: NextRequest) {
	const response = NextResponse.next();

	response.headers.set(
		"Access-Control-Allow-Origin",
		"https://your-domain.com"
	);
	response.headers.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	return response;
}
```

**Rate Limiting:**

```tsx
// lib/rate-limiting.ts
import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map();

export function rateLimitMiddleware(request: NextRequest) {
	const ip = request.ip || "unknown";
	const now = Date.now();
	const windowMs = 15 * 60 * 1000; // 15 minutes
	const maxRequests = 100;

	const requests = rateLimit.get(ip) || [];
	const validRequests = requests.filter((time) => now - time < windowMs);

	if (validRequests.length >= maxRequests) {
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });
	}

	validRequests.push(now);
	rateLimit.set(ip, validRequests);

	return NextResponse.next();
}
```

## 📊 Monitoring and Analytics

### 1. Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
```

### 2. Error Monitoring

```tsx
// lib/error-monitoring.ts
export function logError(error: Error, context?: Record<string, any>) {
	// Send to your error monitoring service
	console.error("Application Error:", {
		message: error.message,
		stack: error.stack,
		context,
		timestamp: new Date().toISOString(),
	});
}

// Global error handler
window.addEventListener("error", (event) => {
	logError(event.error, {
		url: window.location.href,
		userAgent: navigator.userAgent,
	});
});
```

### 3. Performance Monitoring

```tsx
// lib/performance.ts
export function trackPerformance(metric: string, value: number) {
	// Send to your analytics service
	console.log("Performance Metric:", {
		metric,
		value,
		timestamp: new Date().toISOString(),
	});
}

// Track Core Web Vitals
export function trackWebVitals(metric: any) {
	trackPerformance(metric.name, metric.value);
}
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:all

      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### 2. Environment Variables in CI/CD

**GitHub Secrets:**

- `DATABASE_URL`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_STACK_PROJECT_ID`
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- `STACK_SECRET_SERVER_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] **Environment Variables**
  - [ ] Database URL configured
  - [ ] AI API key set
  - [ ] Authentication keys configured
  - [ ] Analytics ID set

- [ ] **Database**
  - [ ] Production database created
  - [ ] Migrations run successfully
  - [ ] Seed data added (if needed)

- [ ] **Security**
  - [ ] HTTPS enabled
  - [ ] Security headers configured
  - [ ] Rate limiting implemented
  - [ ] CORS configured

- [ ] **Performance**
  - [ ] Images optimized
  - [ ] Bundle size analyzed
  - [ ] Caching configured
  - [ ] CDN configured

### Post-Deployment

- [ ] **Monitoring**
  - [ ] Error tracking enabled
  - [ ] Performance monitoring active
  - [ ] Analytics configured
  - [ ] Uptime monitoring set

- [ ] **Testing**
  - [ ] All features working
  - [ ] Authentication flows tested
  - [ ] AI features working
  - [ ] Database operations successful

- [ ] **Documentation**
  - [ ] Deployment guide updated
  - [ ] Environment variables documented
  - [ ] Troubleshooting guide created

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors:**

```bash
# Check database connectivity
psql "your-database-url" -c "SELECT 1;"

# Verify SSL requirements
DATABASE_URL="postgresql://user:password@host:port/db?sslmode=require"
```

**Build Errors:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run typecheck
```

**Environment Variable Issues:**

```bash
# Verify environment variables are set
echo $DATABASE_URL
echo $GEMINI_API_KEY

# Check in Vercel dashboard
# Project Settings → Environment Variables
```

## 📚 Related Documentation

- **[Environment Setup](environment-setup.md)** - Configure development environment
- **[Database Setup](database-setup.md)** - Production database configuration
- **[Authentication](authentication.md)** - Production auth setup
- **[Debugging Guide](debugging.md)** - Troubleshooting deployment issues

---

**Ready to deploy?** Check out the [Debugging Guide](debugging.md) for troubleshooting production issues!
