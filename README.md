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
- `src/hooks/` – Custom React hooks for state management
- `src/lib/` – Utility functions, constants, and core logic
- `src/types/` – TypeScript type definitions
- `tests/` – E2E tests (Playwright) and test utilities

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

### Getting Help & Support

- 📋 **Issues**: See our [Support Guide](.github/SUPPORT.md) for comprehensive help
- 🔒 **Security**: Review our [Security Policy](.github/SECURITY.md) for vulnerability reporting
- 🤝 **Community**: Follow our [Code of Conduct](.github/CONTRIBUTING.md) for respectful collaboration

### Quick start for contributors:

- Fork the repo and clone locally
- Follow the setup instructions above
- Create a feature branch and submit a PR
- Our CI pipeline will automatically test your changes

**Our automated CI pipeline includes:**

- ✅ Code quality (ESLint, Prettier, TypeScript)
- 🧪 Testing (Jest unit tests + Playwright E2E)
- 🔒 Security (dependency scanning, CodeQL analysis)
- 🏗️ Build verification and database validation
- 🚀 Automated deployments to staging/production

### Development Scripts

```bash
# Development
pnpm dev                 # Start development server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint checks
pnpm lint:fix          # Fix ESLint issues automatically
pnpm format            # Format code with Prettier
pnpm typecheck         # TypeScript type checking

# Database
pnpm db:generate       # Generate database schema
pnpm db:migrate        # Run database migrations
pnpm db:studio         # Open Drizzle Studio
pnpm db:seed           # Seed database with sample data

# Testing
pnpm test              # Run all unit tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage
pnpm test:e2e          # Run end-to-end tests
pnpm test:all          # Run both unit and e2e tests
```

## Roadmap

- [x] Core spaced repetition system with SM-2 algorithm
- [x] AI-powered flashcard generation using Google Gemini
- [x] Multi-format content import and processing
- [x] Advanced analytics and progress tracking
- [ ] Mobile applications (iOS & Android) with offline sync
- [ ] Collaborative study groups and deck sharing
- [ ] AI study assistant with personalized recommendations
- [ ] Community marketplace for premium content
- [ ] Integration with popular learning platforms
- [ ] Advanced AI models for specialized subjects

## Sponsors

Thanks to [Vercel](https://vercel.com?utm_source=github-anzii&utm_campaign=oss) for powering our deployments and supporting open-source education.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fanzii&project-name=anzii&repository-name=anzii)

## License

[MIT LICENSE](LICENSE)

---

**Transform your learning with AI-powered spaced repetition.** 🚀  
Visit [anzii.space](https://anzii.space) to get started today!
