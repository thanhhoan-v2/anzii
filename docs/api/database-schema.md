# Database Schema Documentation

This document provides a comprehensive overview of Anzii's database schema, relationships, and design decisions.

## Schema Overview

Anzii uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema is designed for optimal performance with the spaced repetition algorithm and social features.

## Core Tables

### 🃏 Decks Table

Stores flashcard deck information with engagement metrics.

```sql
CREATE TABLE "decks" (
  "id" text PRIMARY KEY,                    -- UUID primary key
  "name" text NOT NULL,                     -- Deck title
  "description" text,                       -- Optional deck description
  "user_id" text,                          -- Creator user ID (nullable for system decks)
  "like_count" integer NOT NULL DEFAULT 0, -- Cached like count for performance
  "user_count" integer NOT NULL DEFAULT 0, -- Number of users who studied this deck
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
```

**Indexes:**
```sql
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_decks_created_at ON decks(created_at);
CREATE INDEX idx_decks_like_count ON decks(like_count DESC);
```

**Design Decisions:**
- UUIDs for scalability and security
- Denormalized like_count for performance (avoids COUNT queries)
- Nullable user_id for system-generated decks
- Timestamps with timezone for global users

### 🎴 Cards Table

Individual flashcards with spaced repetition metadata.

```sql
CREATE TABLE "cards" (
  "id" text PRIMARY KEY,                    -- UUID primary key
  "deck_id" text NOT NULL,                  -- Foreign key to decks
  "question" text NOT NULL,                 -- Card front content
  "answer" text NOT NULL,                   -- Card back content
  "card_type" varchar(20) DEFAULT 'flashcard', -- Card type (flashcard, mcq, etc.)
  "interval" integer NOT NULL DEFAULT 0,    -- SRS interval in days
  "ease_factor" real NOT NULL DEFAULT 2.5,  -- SRS ease factor (1.3-2.5+)
  "due_date" timestamp with time zone DEFAULT now() NOT NULL, -- Next review date
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,

  CONSTRAINT fk_cards_deck_id
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);
```

**Indexes:**
```sql
CREATE INDEX idx_cards_deck_id ON cards(deck_id);
CREATE INDEX idx_cards_due_date ON cards(due_date);
CREATE INDEX idx_cards_due_date_deck ON cards(deck_id, due_date);
```

**Design Decisions:**
- Cascade delete when deck is removed
- Real type for ease_factor precision
- Composite index for efficient due card queries
- Card type column for future expansion (MCQ, fill-in-blank)

### 👤 Users Table

User profiles and preferences.

```sql
CREATE TABLE "users" (
  "id" text PRIMARY KEY,                    -- UUID primary key
  "email" varchar(255) NOT NULL UNIQUE,    -- User email (authentication)
  "display_name" varchar(255),             -- User's display name
  "theme" varchar(50) DEFAULT 'slate',     -- UI theme preference
  "font" varchar(50) DEFAULT 'space-grotesk', -- Font preference
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
```

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Design Decisions:**
- Email as unique identifier for Stack Auth integration
- Separate display_name from email for privacy
- Theme/font preferences for personalization
- Updated_at for tracking preference changes

### ❤️ User Likes Table

Social engagement tracking between users and decks.

```sql
CREATE TABLE "user_likes" (
  "id" text PRIMARY KEY,                    -- UUID primary key
  "user_id" text NOT NULL,                  -- Foreign key to users
  "deck_id" text NOT NULL,                  -- Foreign key to decks
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,

  CONSTRAINT fk_user_likes_user_id
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_likes_deck_id
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
  CONSTRAINT uk_user_likes_user_deck
    UNIQUE (user_id, deck_id) -- Prevent duplicate likes
);
```

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_user_likes_user_deck ON user_likes(user_id, deck_id);
CREATE INDEX idx_user_likes_deck_id ON user_likes(deck_id);
CREATE INDEX idx_user_likes_user_id ON user_likes(user_id);
```

**Design Decisions:**
- Composite unique constraint prevents duplicate likes
- Cascade delete maintains referential integrity
- Separate table allows for future like metadata (timestamps, reactions)

## Relationships

### Entity Relationship Diagram

```
Users (1) ──── (N) Decks
  │
  │
  └── (N) UserLikes (N) ──── Decks

Decks (1) ──── (N) Cards
```

### Drizzle ORM Relations

```typescript
// Deck relations
export const decksRelations = relations(decks, ({ many }) => ({
  cards: many(cards),
  userLikes: many(userLikes),
}));

// Card relations
export const cardsRelations = relations(cards, ({ one }) => ({
  deck: one(decks, {
    fields: [cards.deckId],
    references: [decks.id],
  }),
}));

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  decks: many(decks),
  userLikes: many(userLikes),
}));

// UserLikes relations
export const userLikesRelations = relations(userLikes, ({ one }) => ({
  user: one(users, {
    fields: [userLikes.userId],
    references: [users.id],
  }),
  deck: one(decks, {
    fields: [userLikes.deckId],
    references: [decks.id],
  }),
}));
```

## Data Types and Constraints

### UUID Generation

All primary keys use UUID v4 for:
- Scalability (no sequence conflicts)
- Security (non-guessable IDs)
- Distribution (works across multiple databases)

```typescript
import { randomUUID } from "node:crypto";

export const decks = pgTable("decks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  // ...
});
```

### Spaced Repetition Fields

Cards table includes specific fields for the SM-2 algorithm:

```typescript
interval: integer("interval").notNull().default(0),     // Days until next review
easeFactor: real("ease_factor").notNull().default(2.5), // Difficulty multiplier
dueDate: timestamp("due_date").defaultNow().notNull(),  // When card is due
```

**Value Ranges:**
- `interval`: 0-36500 (0 days to ~100 years)
- `easeFactor`: 1.3-3.0+ (algorithm bounds)
- `dueDate`: Any future timestamp

### Performance Optimizations

#### Denormalized Counters

The `decks` table includes denormalized counters for performance:

```sql
"like_count" integer NOT NULL DEFAULT 0,  -- Avoids COUNT(*) queries
"user_count" integer NOT NULL DEFAULT 0,  -- Tracks completion metrics
```

**Update Strategy:**
```typescript
// Atomic counter updates
await db.execute(sql`
  UPDATE "decks"
  SET "like_count" = (
    SELECT COUNT(*)::int
    FROM "user_likes"
    WHERE "deck_id" = ${deckId}
  )
  WHERE "id" = ${deckId}
`);
```

#### Composite Indexes

Critical queries use composite indexes:

```sql
-- Efficient due card lookups
CREATE INDEX idx_cards_due_date_deck ON cards(deck_id, due_date);

-- Fast user like checks
CREATE UNIQUE INDEX idx_user_likes_user_deck ON user_likes(user_id, deck_id);
```

## Migration Strategy

### Version Control

Database schema changes are tracked using Drizzle migrations:

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:migrate

# Rollback migration
npm run db:rollback
```

### Migration Files

Located in `src/db/migrations/`, each migration includes:
- SQL up migration
- SQL down migration (for rollbacks)
- Metadata (timestamp, description)

### Safe Migration Practices

1. **Backward Compatible**: New columns are nullable or have defaults
2. **Data Preservation**: Never drop columns with data
3. **Index Management**: Add indexes during maintenance windows
4. **Rollback Plan**: Always test rollback procedures

## Common Queries

### Performance-Critical Queries

#### Get Due Cards for Deck
```sql
SELECT * FROM cards
WHERE deck_id = $1
  AND due_date <= NOW()
ORDER BY due_date ASC;
```

#### Check User Like Status
```sql
SELECT EXISTS(
  SELECT 1 FROM user_likes
  WHERE user_id = $1 AND deck_id = $2
);
```

#### Get Popular Decks
```sql
SELECT * FROM decks
WHERE like_count > 0
ORDER BY like_count DESC, created_at DESC
LIMIT 10;
```

### Analytics Queries

#### User Engagement Metrics
```sql
SELECT
  COUNT(*) as total_users,
  COUNT(DISTINCT ul.user_id) as active_users,
  AVG(d.like_count) as avg_likes_per_deck
FROM users u
LEFT JOIN user_likes ul ON u.id = ul.user_id
LEFT JOIN decks d ON ul.deck_id = d.id;
```

#### Study Session Analytics
```sql
SELECT
  deck_id,
  COUNT(*) as total_reviews,
  AVG(interval) as avg_interval
FROM cards
WHERE interval > 0
GROUP BY deck_id;
```

## Data Seeding

### Development Data

The `db:seed` command populates the database with realistic test data:

```typescript
// Sample decks with varied content
const sampleDecks = [
  {
    name: "Spanish Vocabulary",
    description: "Essential Spanish words for beginners",
    cards: generateSpanishCards(20)
  },
  // ... more sample data
];
```

### Production Considerations

- Never seed production with test data
- Use environment variables to control seeding
- Backup before running any seed operations

## Security Considerations

### Access Control

- Row-level security policies (planned)
- User-scoped queries via authentication
- Parameterized queries prevent SQL injection

### Data Privacy

- Email addresses are the only PII stored
- Display names are optional
- No sensitive card content validation

### Audit Trail

Future enhancement to track:
- Card review history
- Deck modification logs
- User action timestamps

## Backup and Recovery

### Backup Strategy

1. **Daily Backups**: Automated via Neon/hosting provider
2. **Point-in-Time Recovery**: Transaction log backups
3. **Schema Versioning**: Git-tracked migration files

### Recovery Procedures

1. Restore from backup
2. Apply recent migrations
3. Verify data integrity
4. Test critical functionality

## Monitoring

### Key Metrics

- **Query Performance**: Slow query detection
- **Connection Pool**: Usage and wait times
- **Storage Growth**: Table size monitoring
- **Index Usage**: Effectiveness tracking

### Alerting

Set up alerts for:
- Query execution time > 1s
- Connection pool exhaustion
- Failed migrations
- Unusual data patterns

## Future Enhancements

### Planned Schema Changes

1. **Card History**: Track review performance over time
2. **Deck Categories**: Organize decks by subject/topic
3. **User Groups**: Collaborative learning features
4. **Content Tags**: Flexible content organization

### Scaling Considerations

1. **Read Replicas**: For analytics and reporting
2. **Sharding**: Partition by user or deck ID
3. **Caching Layer**: Redis for hot data
4. **Archive Strategy**: Move old cards to cold storage

### Performance Improvements

1. **Materialized Views**: Pre-computed analytics
2. **Partial Indexes**: More targeted indexing
3. **Compression**: Reduce storage costs
4. **Query Optimization**: Analyze and improve slow queries