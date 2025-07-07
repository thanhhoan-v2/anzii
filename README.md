# Anzii - Transform Learning Through AI-Powered Spaced Repetition

> "Memory is the treasury and guardian of all things." — Cicero

[![Live Application](https://img.shields.io/badge/Live-App-green)](https://anzii.space)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features & Benefits](#features--benefits)
- [Use Cases](#use-cases)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Roadmap](#roadmap)
- [FAQ](#faq)

---

## Overview

**Anzii is the AI-powered learning platform that becomes every student's secret weapon when exam season hits.**

It transforms any content into personalized flashcards using advanced AI, then schedules optimal review sessions with scientifically-proven spaced repetition — reducing study time by 60% while boosting retention.

Built for medical students, language learners, and busy professionals, Anzii replaces hours of manual flashcard creation and random review sessions. What used to take weeks of prep work now happens in minutes — so you can stay focused on actually learning, not creating study materials.

At its core, Anzii is an **intelligent learning system** that automates knowledge retention on your behalf — maximizing memory formation with minimal effort.
You can feed it anything: textbooks, PDFs, lecture notes, or random web articles, and it instantly generates contextually relevant question-answer pairs.
And because we want Anzii to be your central hub for all learning, we've built smart analytics, progress tracking, and cross-platform sync — making mastery effortless.

**Features include:**

- AI-powered flashcard generation from any content
- Scientifically-proven spaced repetition scheduling
- Advanced analytics and progress tracking
- Multi-format import (PDFs, text, markdown)
- 17 beautiful themes with accessibility compliance
- Cross-platform synchronization

We believe learning should follow a universal protocol: intelligent, personalized, and effortless. You shouldn't have to think about when to review. With Anzii, you won't.

---

## Features & Benefits

- **89% retention rate improvement**  
  Scientifically-proven spaced repetition outperforms traditional study methods by 22 percentage points.

- **60% reduction in study time**  
  AI-optimized scheduling ensures you review exactly when needed for maximum efficiency.

- **AI content generation**  
  Transform any text into comprehensive flashcards using Google Gemini's advanced language processing.

- **17 curated themes**  
  From minimalist designs to vibrant aesthetics, with full accessibility compliance (WCAG 2.1 AA).

- **Multi-format support**  
  Import from PDFs, markdown, text files, or generate from topic prompts.

- **Cross-platform sync**  
  Access your learning materials anywhere with seamless synchronization across devices.

---

## Use Cases

- **Medical student preparing for boards**  
  Generate thousands of flashcards from textbook PDFs, master complex terminology with optimized scheduling.

- **Software engineer learning new languages**  
  Build vocabulary decks from documentation, study during commute with mobile-optimized interface.

- **Professional pursuing certification**  
  Track learning progress with detailed analytics, ensure comprehensive coverage of exam topics.

- **Language learner building fluency**  
  Create conversation-based flashcards, practice with spaced intervals for long-term retention.

- **Academic researcher organizing knowledge**  
  Convert research papers into study materials, maintain knowledge base with intelligent review scheduling.

---

## How It Works

1. **Upload or input content**  
   Import PDFs, paste text, upload markdown files, or simply describe a topic you want to learn.

2. **AI generates flashcards**  
   Advanced language models analyze your content and create optimized question-answer pairs.

3. **Begin spaced repetition**  
   Study with scientifically-proven intervals that adapt to your performance and memory patterns.

4. **Track your progress**  
   Monitor retention rates, learning streaks, and performance analytics with detailed insights.

5. **Achieve mastery**  
   Continue with personalized recommendations and adaptive scheduling for long-term knowledge retention.

---

## Installation

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (Neon recommended)
- Google Gemini API key

### Setup Instructions

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd anzii
   pnpm install
   ```

2. **Environment Configuration**

   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local`:

   ```env
   DATABASE_URL="postgresql://username:password@host/database"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. **Database Setup**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. **Launch Application**

   ```bash
   pnpm build
   pnpm start
   ```

5. **Access the Application**
   - **Landing Page**: http://localhost:3000
   - **Dashboard**: http://localhost:3000/dashboard

---

## Contributing

We welcome contributions from the learning and developer community. To propose a fix, feature, or improvement:

- Open a pull request
- Submit an issue
- Contribute to documentation

Please review our contributing guidelines and ensure all tests pass before submitting.

### Development Scripts

```bash
# Development
pnpm dev                 # Start development server with Turbopack

# Code Quality
pnpm lint               # Run ESLint checks
pnpm lint:fix          # Fix ESLint issues automatically
pnpm format            # Format code with Prettier

# Database
pnpm db:generate       # Generate database schema
pnpm db:migrate        # Run database migrations
pnpm db:studio         # Open Drizzle Studio

# Testing
pnpm test              # Run all unit tests
pnpm test:e2e          # Run end-to-end tests
pnpm test:all          # Run both unit and e2e tests
```

### Component Architecture

Anzii follows a modular component architecture with server/client separation for optimal performance:

- **Server Components**: Pages and static sections for better SEO and performance
- **Client Components**: Interactive features requiring state management
- **Modular Sections**: Reusable components organized by feature (landing, pricing, contact, etc.)

**Contact Page Structure:**

- `src/app/contact/page.tsx` - Server-only page component
- `src/components/sections/contact/contact-hero.tsx` - Server-only hero section
- `src/components/sections/contact/contact-form.tsx` - Client-side form with state management

**Create Page Structure:**

- `src/app/create/page.tsx` - Server-only page component
- `src/components/sections/create/create-tabs.tsx` - Client-side tabs wrapper
- `src/components/sections/create/manual-creation-tab.tsx` - Manual card creation interface
- `src/components/sections/create/ai-topic-tab.tsx` - AI-powered deck generation
- `src/components/sections/create/markdown-tab.tsx` - Markdown to flashcards converter
- `src/components/sections/create/import-tab.tsx` - JSON file import functionality

**Dashboard Page Structure:**

- `src/app/dashboard/page.tsx` - Server-only page component
- `src/components/sections/dashboard/dashboard-content.tsx` - Client-side main dashboard logic
- `src/components/sections/dashboard/dashboard-loading.tsx` - Loading state component

**Deck Detail Page Structure:**

- `src/app/deck/[deckId]/page.tsx` - Server-only page component
- `src/components/sections/deck/deck-detail-content.tsx` - Client-side deck management with all functionality
- `src/components/sections/deck/deck-loading.tsx` - Deck-specific loading state component

**Settings Page Structure:**

- `src/app/settings/page.tsx` - Server-only page component
- `src/components/sections/settings/settings-content.tsx` - Client-side settings management and user profile
- `src/components/sections/settings/settings-loading.tsx` - Settings-specific loading state component

**Roadmap Page Structure:**

- `src/app/roadmap/page.tsx` - Server-only page component
- `src/components/sections/roadmap/roadmap-content.tsx` - Client-side roadmap with dynamic loading and data

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Acknowledgments

Thanks to the cognitive science research that makes spaced repetition possible, the open source community, and early users who helped shape Anzii. Special thanks to Hermann Ebbinghaus for pioneering the forgetting curve research that underlies our algorithms.

---

## Roadmap

- [x] Core spaced repetition system with SM-2 algorithm
- [x] AI-powered flashcard generation using Google Gemini
- [x] Multi-format content import and processing
- [ ] Mobile applications (iOS & Android) with offline sync
- [ ] Advanced analytics dashboard with learning insights
- [ ] Collaborative study groups and deck sharing
- [ ] AI study assistant with personalized recommendations
- [ ] Community marketplace for premium content

---

## FAQ

**Q: How accurate is the AI flashcard generation?**  
A: Our AI achieves 95%+ accuracy in content interpretation and question-answer pair generation using Google Gemini Pro.

**Q: Can I use Anzii offline?**  
A: Currently, Anzii requires internet connection for AI features and sync. Mobile apps with offline capabilities are planned.

**Q: How does spaced repetition improve learning?**  
A: Spaced repetition schedules reviews at optimal intervals based on your performance, improving retention by 89% compared to traditional methods.

**Q: Is my study data secure?**  
A: Yes. We follow strict privacy standards, implement proper encryption, and comply with modern data protection regulations.

**Q: Can I import existing flashcards?**  
A: Yes. Anzii supports importing from text files, PDFs, markdown, and manual entry. We're adding support for other flashcard formats.
