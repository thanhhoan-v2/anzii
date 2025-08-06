# Quick Start Guide

Get Anzii up and running on your local machine in minutes!

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js 18+](https://nodejs.org/en/)** - JavaScript runtime
- **[pnpm](https://pnpm.io/installation)** - Package manager (recommended over npm)
- **[PostgreSQL](https://www.postgresql.org/download/)** - Database (or [Neon](https://neon.tech/) for cloud)
- **[Git](https://git-scm.com/)** - Version control

## 📋 Step-by-Step Setup

### 1. Clone the Repository

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

**Need help setting up environment variables?** See [Environment Setup](environment-setup.md) for detailed instructions.

### 3. Database Setup

```bash
# Generate database migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Optional: Seed with sample data
pnpm db:seed
```

**Need help with database setup?** See [Database Setup](database-setup.md) for detailed instructions.

### 4. Start Development Server

```bash
# Start the development server
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

## ✅ Verification

To verify everything is working correctly:

1. **Check the homepage** - You should see the Anzii landing page
2. **Test authentication** - Try signing up or signing in
3. **Create a deck** - Test the AI-powered deck creation
4. **Run tests** - Execute `pnpm test:all` to verify the test suite

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Verify your DATABASE_URL format
# Should be: postgresql://username:password@host:port/database
```

**AI API Errors**

- Verify your `GEMINI_API_KEY` is valid
- Check API quota limits
- Ensure the key has proper permissions

**Authentication Issues**

- Verify Stack Auth configuration
- Check environment variables are set correctly
- Ensure the project is properly configured in Stack Auth dashboard

### Still Having Issues?

- Check the [Debugging Guide](debugging.md) for detailed troubleshooting
- Review [Environment Setup](environment-setup.md) for configuration help
- Create a GitHub issue with your specific error

## 🎯 Next Steps

Now that you have Anzii running locally, explore these areas:

- **[Project Architecture](architecture.md)** - Understand the tech stack
- **[Development Workflow](development-workflow.md)** - Learn about scripts and testing
- **[UI Development](ui-development.md)** - Build with the design system
- **[AI Integration](ai-integration.md)** - Work with AI features

## 📚 Quick Reference

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start development server |
| `pnpm build`     | Build for production     |
| `pnpm test:all`  | Run all tests            |
| `pnpm db:studio` | Open database browser    |
| `pnpm lint`      | Check code quality       |

---

**Ready to dive deeper?** Explore the [Project Architecture](architecture.md) to understand how Anzii is built!
