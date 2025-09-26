# Migration Guide: v1.x to v2.0

This guide covers the migration from Anzii v1.x to v2.0, which includes major upgrades to Next.js 15, React 19, and significant new social features.

## Overview of Changes

### 🚀 Major Upgrades

- **Next.js 15.4.5** with App Router and Turbopack
- **React 19.1.1** with new concurrent features
- **Enhanced TypeScript** configurations
- **Social Features** - Like system and engagement metrics
- **Embedded Review Sessions** - Simplified user experience
- **Unlimited Review Access** - Removed trial limitations

### 💔 Breaking Changes

- **Authentication**: Stack Auth integration changes
- **Review System**: Embedded sessions replace separate pages
- **Database Schema**: New tables for social features
- **API Routes**: New endpoints for likes and user engagement
- **Component Props**: Some component interfaces changed

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- PostgreSQL 14+
- Git for version control
- Full database backup

## Migration Steps

### Step 1: Backup Current Installation

```bash
# Backup database
pg_dump your_database > anzii_v1_backup.sql

# Create Git branch for migration
git checkout -b migration-v2
git add -A
git commit -m "Pre-migration backup"
```

### Step 2: Update Dependencies

```bash
# Update package.json
npm install next@15.4.5 react@19.1.1 react-dom@19.1.1

# Update TypeScript and related packages
npm install typescript@5.6.3 @types/react@19.0.1 @types/react-dom@19.0.1

# Install new dependencies for social features
npm install @tanstack/react-query@5.59.16
npm install framer-motion@11.11.17

# Update development dependencies
npm install --save-dev @next/eslint-config-next@15.4.5
```

**Package.json changes:**
```diff
{
  "dependencies": {
-   "next": "14.x.x",
-   "react": "18.x.x",
-   "react-dom": "18.x.x",
+   "next": "15.4.5",
+   "react": "19.1.1",
+   "react-dom": "19.1.1",
+   "@tanstack/react-query": "5.59.16",
+   "framer-motion": "11.11.17"
  }
}
```

### Step 3: Update Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for faster development
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // React 19 compatibility
  reactStrictMode: true,

  // Performance optimizations
  swcMinify: true,

  // Image optimization
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;
```

### Step 4: Database Schema Migration

Add new tables for social features:

```sql
-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY,
  "email" varchar(255) NOT NULL UNIQUE,
  "display_name" varchar(255),
  "theme" varchar(50) DEFAULT 'slate',
  "font" varchar(50) DEFAULT 'space-grotesk',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- User likes table
CREATE TABLE "user_likes" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "deck_id" text NOT NULL REFERENCES "decks"("id") ON DELETE CASCADE,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE("user_id", "deck_id")
);

-- Add engagement columns to decks
ALTER TABLE "decks"
ADD COLUMN IF NOT EXISTS "like_count" integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "user_count" integer NOT NULL DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_likes_user_id ON user_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_likes_deck_id ON user_likes(deck_id);
CREATE INDEX IF NOT EXISTS idx_decks_like_count ON decks(like_count DESC);
```

Run the migration:

```bash
npm run db:generate
npm run db:migrate
```

### Step 5: Update Authentication System

#### Stack Auth Integration

Update your authentication configuration:

```typescript
// src/stack.ts
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
});
```

#### Environment Variables

Add new required environment variables:

```bash
# .env.local
STACK_PROJECT_ID=your_project_id
STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
STACK_SECRET_SERVER_KEY=your_secret_key
```

### Step 6: Update React Query Integration

#### Provider Setup

Update `src/app/providers.tsx`:

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,   // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

#### Custom Hooks

Update your custom hooks to use React Query:

```typescript
// src/hooks/use-decks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useDecks(userId: string) {
  return useQuery({
    queryKey: ['decks', userId],
    queryFn: async () => {
      const response = await fetch('/api/decks');
      return response.json();
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useDeckLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ deckId, userId }: { deckId: string; userId: string }) => {
      const response = await fetch(`/api/decks/${deckId}/like`, {
        method: 'POST',
      });
      return response.json();
    },
    onMutate: async ({ deckId, userId }) => {
      // Optimistic update implementation
      await queryClient.cancelQueries({ queryKey: ['decks', userId] });

      const previousDecks = queryClient.getQueryData(['decks', userId]);

      queryClient.setQueryData(['decks', userId], (oldDecks: any[]) => {
        return oldDecks.map((deck) =>
          deck.id === deckId
            ? {
                ...deck,
                likedByUser: !deck.likedByUser,
                likeCount: deck.likeCount + (deck.likedByUser ? -1 : 1),
              }
            : deck
        );
      });

      return { previousDecks };
    },
    onError: (err, { userId }, context) => {
      if (context?.previousDecks) {
        queryClient.setQueryData(['decks', userId], context.previousDecks);
      }
    },
    onSettled: (data, error, { deckId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ['decks', userId] });
      queryClient.invalidateQueries({ queryKey: ['deck', deckId] });
    },
  });
}
```

### Step 7: Update Component Architecture

#### Remove Review Pages

The v2.0 update embeds review sessions within deck detail pages. Remove or update:

```bash
# Remove separate review pages if they exist
rm -rf src/app/review/
```

#### Update Deck Components

Add social features to deck components:

```typescript
// src/components/features/deck/like-button.tsx
'use client';

import { Heart } from 'lucide-react';
import { useDeckLike } from '@/hooks/use-decks';
import { Button } from '@/components/ui/button';

interface LikeButtonProps {
  deck: {
    id: string;
    likedByUser: boolean;
    likeCount: number;
  };
  userId: string;
  className?: string;
  showCount?: boolean;
}

export default function LikeButton({
  deck,
  userId,
  className,
  showCount = true
}: LikeButtonProps) {
  const deckLikeMutation = useDeckLike();

  const handleLike = () => {
    deckLikeMutation.mutate({ deckId: deck.id, userId });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={className}
      disabled={deckLikeMutation.isPending}
    >
      <Heart
        className={`h-4 w-4 ${
          deck.likedByUser
            ? 'fill-red-500 text-red-500'
            : 'text-muted-foreground'
        }`}
      />
      {showCount && (
        <span className="ml-1 text-sm">
          {deck.likeCount}
        </span>
      )}
    </Button>
  );
}
```

### Step 8: Update API Routes

Add new API endpoints for social features:

```typescript
// src/app/api/decks/[deckId]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { toggleDeckLike } from "@/lib/actions";
import { stackServerApp } from "@/stack";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ deckId: string }> }
) {
  try {
    const { deckId } = await context.params;
    const user = await stackServerApp.getUser();
    const userId = user?.id ?? "placeholder-user-id";

    const result = await toggleDeckLike(deckId, userId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        liked: result.liked,
        deckId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Step 9: Update Server Actions

Add social features to server actions:

```typescript
// src/lib/actions.ts
import { db } from "@/db";
import { userLikes, decks } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";

export async function toggleDeckLike(deckId: string, userId: string) {
  try {
    // Ensure user exists
    await db.execute(sql`
      INSERT INTO "users" ("id", "email", "display_name")
      VALUES (${userId}, ${`user-${userId}@placeholder.com`}, ${`User ${userId.slice(0, 8)}`})
      ON CONFLICT ("id") DO NOTHING
    `);

    // Check existing like
    const existingLike = await db
      .select({ id: userLikes.id })
      .from(userLikes)
      .where(and(eq(userLikes.deckId, deckId), eq(userLikes.userId, userId)))
      .limit(1);

    let liked: boolean;

    if (existingLike.length > 0) {
      // Unlike
      await db
        .delete(userLikes)
        .where(and(eq(userLikes.deckId, deckId), eq(userLikes.userId, userId)));
      liked = false;
    } else {
      // Like
      const likeId = randomUUID();
      await db.execute(sql`
        INSERT INTO "user_likes" ("id", "user_id", "deck_id")
        VALUES (${likeId}, ${userId}, ${deckId})
        ON CONFLICT ("user_id", "deck_id") DO NOTHING
      `);
      liked = true;
    }

    // Update like count atomically
    await db.execute(sql`
      UPDATE "decks"
      SET "like_count" = (
        SELECT COUNT(*)::int
        FROM "user_likes"
        WHERE "deck_id" = ${deckId}
      )
      WHERE "id" = ${deckId}
    `);

    return { success: true, liked };
  } catch (error) {
    console.error("Error toggling deck like:", error);
    return { success: false, error: "Failed to toggle deck like." };
  }
}
```

### Step 10: Update TypeScript Configuration

Update `tsconfig.json` for React 19 compatibility:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Testing Migration

### Step 1: Test Core Functionality

```bash
# Start development server
npm run dev

# Test key features:
# - User authentication
# - Deck creation and management
# - Card review sessions
# - Like functionality
# - Theme switching
```

### Step 2: Run Test Suite

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

### Step 3: Database Integrity Check

```sql
-- Verify social features
SELECT COUNT(*) FROM user_likes;
SELECT deck_id, COUNT(*) as like_count FROM user_likes GROUP BY deck_id;

-- Check data integrity
SELECT d.id, d.like_count,
       (SELECT COUNT(*) FROM user_likes ul WHERE ul.deck_id = d.id) as actual_likes
FROM decks d
WHERE d.like_count > 0;
```

## Rollback Procedure

If migration fails, follow these steps:

### Step 1: Database Rollback

```bash
# Restore database backup
dropdb your_database
createdb your_database
psql your_database < anzii_v1_backup.sql
```

### Step 2: Code Rollback

```bash
# Revert to pre-migration state
git checkout main
git branch -D migration-v2

# Restore dependencies
npm ci
```

### Step 3: Verify Rollback

```bash
# Start development server
npm run dev

# Test core functionality
npm test
```

## Troubleshooting

### Common Issues

#### React 19 Hydration Mismatch

**Error:** Hydration failed because the initial UI does not match

**Solution:**
```typescript
// Use useEffect for client-only code
import { useEffect, useState } from 'react';

export function ClientOnlyComponent() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div>Client-only content</div>;
}
```

#### Next.js 15 App Router Issues

**Error:** Module not found or routing issues

**Solution:**
- Ensure all pages are in the `src/app` directory
- Use proper file naming conventions (`page.tsx`, `layout.tsx`)
- Update imports to use the new App Router patterns

#### React Query Stale Closures

**Error:** Optimistic updates not working correctly

**Solution:**
```typescript
// Use functional updates
queryClient.setQueryData(['decks'], (oldDecks) => {
  // Ensure oldDecks is properly typed and handled
  if (!Array.isArray(oldDecks)) return oldDecks;

  return oldDecks.map((deck) =>
    deck.id === deckId
      ? { ...deck, likedByUser: !deck.likedByUser }
      : deck
  );
});
```

#### TypeScript Errors

**Error:** Type errors after React 19 upgrade

**Solution:**
```bash
# Clear TypeScript cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
npm ci

# Regenerate types
npm run build
```

## Performance Optimizations

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      gcTime: 10 * 60 * 1000,          // 10 minutes (renamed from cacheTime)
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});
```

### Next.js 15 Optimizations

```javascript
// next.config.js
module.exports = {
  experimental: {
    // Enable Turbopack for faster builds
    turbo: {},
    // Optimize bundle size
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};
```

## Post-Migration Checklist

- [ ] ✅ All tests passing
- [ ] ✅ Core functionality working
- [ ] ✅ Social features (likes) working
- [ ] ✅ Authentication flow working
- [ ] ✅ Database migrations applied
- [ ] ✅ Performance is acceptable
- [ ] ✅ Error monitoring setup
- [ ] ✅ User acceptance testing completed
- [ ] ✅ Documentation updated
- [ ] ✅ Team training completed

## Getting Help

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting) above
2. Review the [debugging guide](../deployment-and-support/debugging.md)
3. Search [GitHub issues](https://github.com/your-repo/issues)
4. Create a new issue with:
   - Migration step where error occurred
   - Full error message and stack trace
   - Environment details (Node.js version, OS, etc.)
   - Steps to reproduce

## Next Steps

After successful migration:

1. **Monitor Performance**: Watch for any performance regressions
2. **User Feedback**: Collect feedback on new social features
3. **Feature Adoption**: Track usage of like system and engagement metrics
4. **Plan Next Features**: Consider additional social features based on usage
5. **Documentation**: Update internal documentation and user guides