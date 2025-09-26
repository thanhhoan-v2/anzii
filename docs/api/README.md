# API Documentation

Anzii provides a comprehensive REST API for managing decks, cards, users, and social features. All API endpoints are built using Next.js API routes with TypeScript and Zod validation.

## Base URL

```
# Development
http://localhost:3000/api

# Production
https://anzii.space/api
```

## Authentication

Most endpoints require authentication using Stack Auth. Include the authentication header in your requests:

```http
Authorization: Bearer <your-auth-token>
```

## Response Format

All API responses follow a consistent format:

```typescript
// Success Response
{
  "success": true,
  "data": <response_data>,
  "message": "Optional success message"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE" // Optional error code
}
```

## API Endpoints

### 🃏 Decks

#### Like/Unlike Deck
Toggle like status for a deck with optimistic UI updates.

```http
POST /api/decks/[deckId]/like
```

**Parameters:**
- `deckId` (path): UUID of the deck to like/unlike

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "liked": true,
  "deckId": "deck-uuid"
}
```

**Features:**
- Idempotent operations (safe to call multiple times)
- Automatic like count updates
- User-specific like tracking
- Database constraints prevent duplicate likes

#### Increment User Count
Track when a user finishes studying a deck.

```http
POST /api/decks/[deckId]/increment-user-count
```

**Parameters:**
- `deckId` (path): UUID of the deck

**Response:**
```json
{
  "success": true,
  "userCount": 15
}
```

### 👤 User Management

#### Get User Preferences
Retrieve current user's theme and display preferences.

```http
GET /api/user/preferences
```

**Response:**
```json
{
  "displayName": "John Doe",
  "theme": "slate",
  "font": "space-grotesk"
}
```

#### Update User Preferences
Update user's display preferences and theme settings.

```http
PUT /api/user/preferences
```

**Request Body:**
```json
{
  "displayName": "Updated Name",
  "theme": "emerald",
  "font": "inter"
}
```

**Available Themes:**
- `slate`, `gray`, `zinc`, `neutral`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`
- `green`, `emerald`, `teal`, `cyan`, `sky`
- `blue`, `indigo`, `violet`, `purple`

**Available Fonts:**
- `space-grotesk`, `inter`, `system`

#### Get User Liked Decks
Retrieve list of decks liked by the current user.

```http
GET /api/user/likes
```

**Response:**
```json
{
  "likedDecks": [
    {
      "id": "deck-uuid",
      "name": "Spanish Vocabulary",
      "description": "Essential Spanish words",
      "likeCount": 24,
      "userCount": 156,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 📧 Contact

#### Send Contact Message
Send a contact form message via email.

```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Feature Request",
  "message": "I would like to suggest..."
}
```

**Response:**
```json
{
  "message": "Email sent successfully",
  "id": "email-id"
}
```

**Validation:**
- All fields are required
- Email must be valid format
- Uses Resend for email delivery
- Automatic reply-to configuration

## Database Schema

### Tables Overview

```sql
-- Decks: Flashcard collections
CREATE TABLE "decks" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "user_id" text,
  "like_count" integer DEFAULT 0,
  "user_count" integer DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Cards: Individual flashcards
CREATE TABLE "cards" (
  "id" text PRIMARY KEY,
  "deck_id" text NOT NULL REFERENCES "decks"("id") ON DELETE CASCADE,
  "question" text NOT NULL,
  "answer" text NOT NULL,
  "card_type" varchar(20) DEFAULT 'flashcard',
  "interval" integer DEFAULT 0,
  "ease_factor" real DEFAULT 2.5,
  "due_date" timestamp with time zone DEFAULT now(),
  "created_at" timestamp with time zone DEFAULT now()
);

-- Users: User profiles and preferences
CREATE TABLE "users" (
  "id" text PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "display_name" varchar(255),
  "theme" varchar(50) DEFAULT 'space-grotesk',
  "font" varchar(50) DEFAULT 'space-grotesk',
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- User Likes: Social engagement tracking
CREATE TABLE "user_likes" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "deck_id" text NOT NULL REFERENCES "decks"("id") ON DELETE CASCADE,
  "created_at" timestamp with time zone DEFAULT now(),
  UNIQUE("user_id", "deck_id")
);
```

### Relationships

- **Decks** have many **Cards** (1:N)
- **Users** have many **Decks** (1:N)
- **Users** can like many **Decks** via **UserLikes** (N:M)
- **Decks** track `like_count` and `user_count` for performance

## Server Actions

Anzii uses Next.js Server Actions for database mutations with type safety and validation.

### Key Server Actions

```typescript
// Toggle deck like status
toggleDeckLike(deckId: string, userId: string)

// Create new deck from AI
createDeckFromTopic(topic: string, numCards: number)

// Create deck from markdown
createDeckFromMarkdown(content: string, deckName: string)

// Update card after review
updateCardAfterReview(cardId: string, rating: Rating)

// Delete deck and all cards
deleteDeck(deckId: string, userId: string)
```

## Error Handling

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid auth)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Common Error Responses

```typescript
// Validation Error
{
  "success": false,
  "error": "All fields are required",
  "code": "VALIDATION_ERROR"
}

// Authentication Error
{
  "success": false,
  "error": "Unauthorized",
  "code": "AUTH_ERROR"
}

// Database Error
{
  "success": false,
  "error": "Failed to update database",
  "code": "DATABASE_ERROR"
}
```

## Rate Limiting

Currently, no rate limiting is implemented, but it's recommended for production:

- **Contact endpoint**: 5 requests per minute per IP
- **Like endpoint**: 60 requests per minute per user
- **Preferences**: 10 requests per minute per user

## Security

### Protection Measures

- **SQL Injection**: Prevented by Drizzle ORM parameterized queries
- **XSS**: Input sanitization and validation
- **CSRF**: Next.js built-in CSRF protection
- **Auth**: Stack Auth JWT validation
- **Rate Limiting**: Recommended for production

### Best Practices

- Always validate input data
- Use TypeScript for type safety
- Implement proper error handling
- Log security events
- Use HTTPS in production

## Development

### Testing API Endpoints

```bash
# Using curl
curl -X POST http://localhost:3000/api/decks/deck-id/like \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"

# Using Postman
# Import the API collection from /docs/api/postman-collection.json
```

### Local Development

```bash
# Start development server
npm run dev

# Run database migrations
npm run db:migrate

# Seed database with test data
npm run db:seed
```

## Monitoring

### Recommended Metrics

- **Response Times**: API endpoint performance
- **Error Rates**: Failed request percentages
- **Like Success Rate**: Social feature reliability
- **Database Performance**: Query execution times

### Logging

All API routes include comprehensive error logging:

```typescript
console.error("Error details:", {
  endpoint: "/api/decks/like",
  error: error.message,
  userId,
  timestamp: new Date().toISOString()
});
```

## Future Enhancements

### Planned Features

- **GraphQL API**: For complex queries and real-time updates
- **WebSocket Support**: Live collaboration features
- **API Versioning**: Backward compatibility
- **Bulk Operations**: Batch deck/card operations
- **Advanced Analytics**: Detailed usage metrics

### Performance Optimizations

- **Redis Caching**: For frequently accessed data
- **Database Indexing**: Optimized query performance
- **CDN Integration**: Static asset delivery
- **Connection Pooling**: Database connection optimization

## Support

For API support and questions:

- **Documentation Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **API Questions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Bug Reports**: Use the contact form or GitHub issues
- **Feature Requests**: GitHub issues with `enhancement` label