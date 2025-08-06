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

# Environment Setup

Configure your development environment with all necessary API keys and services.

## 🔑 Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# AI Services
GEMINI_API_KEY="your-gemini-api-key"

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1.  **Install PostgreSQL**

    ```bash
    # macOS (using Homebrew)
    brew install postgresql
    brew services start postgresql

    # Ubuntu/Debian
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql

    # Windows
    # Download from https://www.postgresql.org/download/windows/
    ```
2.  **Create Database**

    ```bash
    # Connect to PostgreSQL
    sudo -u postgres psql

    # Create database and user
    CREATE DATABASE anzii;
    CREATE USER anzii_user WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE anzii TO anzii_user;
    \q
    ```
3.  **Update DATABASE\_URL**

    ```env
    DATABASE_URL="postgresql://anzii_user:your_password@localhost:5432/anzii"
    ```

### Option 2: Neon (Cloud Database)

1. **Create Neon Account**
   * Visit [neon.tech](https://neon.tech)
   * Sign up for a free account
   * Create a new project
2.  **Get Connection String**

    * Copy the connection string from your Neon dashboard
    * Update your `.env.local`:

    ```env
    DATABASE_URL="postgresql://user:password@ep-xxx-xxx-xxx.region.aws.neon.tech/anzii?sslmode=require"
    ```

## 🤖 Google Gemini API Setup

1. **Get API Key**
   * Visit [Google AI Studio](https://aistudio.google.com/)
   * Sign in with your Google account
   * Create a new API key
2.  **Configure Environment**

    ```env
    GEMINI_API_KEY="your-gemini-api-key"
    ```
3.  **Verify Setup**

    ```bash
    # Test the API key
    curl -H "Content-Type: application/json" \
         -H "x-goog-api-key: YOUR_API_KEY" \
         -d '{"contents":[{"parts":[{"text":"Hello, how are you?"}]}]}' \
         https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
    ```

## 🔐 Stack Auth Setup

Anzii uses Stack Auth for authentication (replacing NextAuth.js).

### 1. Create Stack Auth Project

1. **Visit Stack Auth**
   * Go to [stack-auth.com](https://stack-auth.com)
   * Sign up for an account
   * Create a new project
2. **Configure Project**
   * Set your project name (e.g., "Anzii")
   * Choose your preferred authentication methods
   * Configure redirect URLs

### 2. Get Credentials

From your Stack Auth dashboard, copy these values:

```env
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-client-key"
STACK_SECRET_SERVER_KEY="your-server-key"
```

### 3. Configure Redirect URLs

Add these URLs to your Stack Auth project settings:

```
http://localhost:3000/handler/sign-in
http://localhost:3000/handler/sign-up
http://localhost:3000/handler/forgot-password
```

## 📊 Analytics (Optional)

### Vercel Analytics

1. **Enable Analytics**
   * Go to your Vercel project dashboard
   * Navigate to Analytics tab
   * Enable analytics for your project
2.  **Get Analytics ID**

    ```env
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
    ```

## 🔍 Environment Validation

Create a validation script to check your environment:

```bash
# Create scripts/validate-env.js
node -e "
const required = ['DATABASE_URL', 'GEMINI_API_KEY', 'NEXT_PUBLIC_STACK_PROJECT_ID'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing environment variables:', missing.join(', '));
  process.exit(1);
}

console.log('✅ All required environment variables are set');
"
```

## 🛠️ Development Tools

### Environment File Templates

Create different environment files for different environments:

```bash
# Development
cp .env.example .env.local

# Production
cp .env.example .env.production

# Testing
cp .env.example .env.test
```

### Environment Validation

Add this to your `package.json` scripts:

```json
{
	"scripts": {
		"validate-env": "node scripts/validate-env.js",
		"dev": "npm run validate-env && next dev"
	}
}
```

## 🐛 Common Issues

### Database Connection Issues

**Error: `connection refused`**

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Start PostgreSQL service
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

**Error: `authentication failed`**

```bash
# Check your DATABASE_URL format
# Should be: postgresql://username:password@host:port/database

# Verify user permissions
sudo -u postgres psql -c "SELECT usename, usecreatedb, usesuper FROM pg_user;"
```

### AI API Issues

**Error: `API key invalid`**

* Verify your Gemini API key is correct
* Check API quota limits in Google AI Studio
* Ensure the key has proper permissions

**Error: `rate limit exceeded`**

* Check your API usage in Google AI Studio
* Consider upgrading your plan if needed
* Implement rate limiting in your application

### Authentication Issues

**Error: `Stack Auth configuration invalid`**

* Verify all Stack Auth environment variables are set
* Check project configuration in Stack Auth dashboard
* Ensure redirect URLs are correctly configured

## 📚 Related Documentation

* [**Quick Start**](quick-start.md) - Get up and running quickly
* [**Database Setup**](database-setup.md) - Detailed database configuration
* [**Deployment Guide**](../deployment-and-support/deployment.md) - Production environment setup
* [**Debugging Guide**](../deployment-and-support/debugging.md) - Troubleshooting common issues

***

**Need help with a specific service?** Check the [Debugging Guide](../deployment-and-support/debugging.md) for detailed troubleshooting steps!
