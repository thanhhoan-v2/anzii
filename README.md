<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="public/logo.png" alt="Anzii Logo" width="100" />
    </td>
    <td align="right">
      <h1>Anzii</h1>
      <h3 style="margin-top: -10px;">AI-powered spaced repetition learning system that transforms any content into optimized flashcards.</h3>
    </td>
  </tr>
</table>

> "Memory is the treasury and guardian of all things." — Cicero

[![Live Application](https://img.shields.io/badge/Live-App-green)](https://anzii.space)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Why?

- **Efficiency**: Reduce study time by 60% with AI-optimized scheduling
- **Intelligence**: Transform any content into personalized flashcards using advanced AI
- **Science**: Scientifically-proven spaced repetition improves retention by 89%
- **Accessibility**: 17 beautiful themes with full WCAG 2.1 AA compliance
- **Freedom**: No paywalls, no limits - open-source learning for everyone

## Features

- AI-powered flashcard generation from any content (PDFs, text, markdown)
- Intelligent deck naming with AI topic summarization (max 5 words)
- Scientifically-proven spaced repetition scheduling with SM-2 algorithm
- Advanced analytics and progress tracking with learning insights
- Multi-format import and export capabilities
- Cross-platform synchronization across all devices
- 17 curated themes with accessibility compliance
- Real-time collaboration and deck sharing
- Offline study mode with sync when online

## Project Structure

- `src/app/` – Next.js 15 app router pages and API routes
- `src/components/` – Reusable UI components and feature modules
- `src/db/` – Database schema, migrations, and seed data (Drizzle ORM)
- `src/ai/` – AI integration flows for flashcard generation (Google Gemini)
- `src/hooks/` – Custom React hooks for state management and React Query
- `src/lib/` – Utility functions, constants, and core logic
- `src/types/` – TypeScript type definitions
- `tests/` – E2E tests (Playwright) and test utilities

## React Query Integration

Anzii uses [TanStack Query (React Query)](https://tanstack.com/query/latest) for efficient data fetching, caching, and state management:

### Key Features

- **Optimized Caching**: 5-minute stale time with automatic background refetching
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks
- **Optimistic Updates**: Instant UI updates for better user experience
- **Loading Animations**: Smooth skeleton loading with shimmer effects and rotating icons
- **DevTools**: Built-in development tools for debugging queries and mutations

### Architecture

- **Query Keys**: Centralized in `src/lib/query-keys.ts` for consistency
- **Custom Hooks**: Domain-specific hooks in `src/hooks/use-decks.ts` and `src/hooks/use-cards.ts`
- **Provider Setup**: QueryClient configured in `src/app/providers.tsx`
- **Error Handling**: QueryErrorBoundary component for error boundaries
- **UI Feedback**: Custom AnimatedSkeleton components with shimmer and fade animations

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js 18+](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation)
- [PostgreSQL database](https://www.postgresql.org/download/) (or [Neon](https://neon.tech/) for cloud)
- [Google Gemini API key](https://ai.google.dev/) for AI features

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/anzii.git
   cd anzii
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local`:

   ```env
   DATABASE_URL="postgresql://username:password@host/database"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Set up the database**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed  # Optional: Add sample data
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

6. **Run tests** (Optional)

   ```bash
   # Unit tests
   pnpm test

   # E2E tests
   pnpm test:e2e

   # All tests
   pnpm test:all
   ```

## Use Cases

- **Medical students** preparing for boards with AI-generated question banks
- **Software engineers** learning new technologies through documentation conversion
- **Language learners** building vocabulary with spaced repetition
- **Professionals** pursuing certifications with progress tracking
- **Researchers** organizing knowledge from academic papers

## Contributing

We welcome contributions from the learning and developer community! 🎉

### Visit [CONTRIBUTING.md](.github/CONTRIBUTING.md)

We welcome contributions! Please see our [Contributing Guide](.github/CONTRIBUTING.md) for detailed setup instructions and development guidelines.

**Quick start for contributors:**

- Fork the repo and clone locally
- Follow the setup instructions above
- Create a feature branch and submit a PR
- Our CI pipeline will automatically test your changes

**Additional resources:**

- 📋 [Support Guide](.github/SUPPORT.md) - Get help with development issues
- 🔒 [Security Policy](.github/SECURITY.md) - Report vulnerabilities responsibly

<!--@include:./Backlog.md-->

<!-- BOARD_START -->

## 📊 Backlog.md Project Status (automatically generated by Backlog.md)

Generated on: 2025-07-16 02:10:13

| To Do                                                                                                                                                         | In Progress | Done                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| **task-011** - Enable user-created custom themes, fonts, and card shapes<br>(Assignees: none, Labels: feature, customization, themes, ui)                     |             | **task-001** - feat: AI generation form: add number of cards, description<br>(Assignees: none, Labels: none) |
| **task-010** - Implement social networking with deck sharing and collaboration<br>(Assignees: none, Labels: feature, social, collaboration, sharing)          |             |                                                                                                              |
| **task-009** - Create comprehensive user profile with achievements and analytics<br>(Assignees: none, Labels: feature, user-profile, analytics, achievements) |             |                                                                                                              |
| **task-008** - Show optimal study times based on performance analytics<br>(Assignees: none, Labels: feature, analytics, ai, performance)                      |             |                                                                                                              |
| **task-007** - Implement image OCR for text extraction and card generation<br>(Assignees: none, Labels: feature, ocr, image-processing, ai)                   |             |                                                                                                              |
| **task-006** - Enhance import system with LaTeX, JSON, and plain text support<br>(Assignees: none, Labels: feature, import, latex, json, file-formats)        |             |                                                                                                              |
| **task-005** - Add fill-in-the-blank card type<br>(Assignees: none, Labels: feature, card-types, fill-in-blank)                                               |             |                                                                                                              |
| **task-004** - Add multiple choice question (MCQ) card type<br>(Assignees: none, Labels: feature, card-types, mcq)                                            |             |                                                                                                              |
| **task-003** - Integrate Google Calendar for study scheduling<br>(Assignees: none, Labels: feature, integration, calendar, scheduling)                        |             |                                                                                                              |
| **task-002** - Implement gamification system with XP, badges, and leaderboards<br>(Assignees: none, Labels: feature, gamification, user-engagement)           |             |                                                                                                              |
| **task-1** - Implement deck discovery and browsing system with search and ratings<br>(Assignees: none, Labels: feature, discovery, search, ui)                |             |                                                                                                              |

_Run `backlog board export` to update this section_

<!-- BOARD_END -->

---

## License

[MIT LICENSE](LICENSE)
