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

# Database Setup

Set up PostgreSQL database and configure Drizzle ORM for Anzii.

## 🗄️ Database Overview

Anzii uses:

* **PostgreSQL** - Primary database
* **Drizzle ORM** - Type-safe database operations
* **Drizzle Kit** - Migration and schema management

## 📋 Prerequisites

### Install PostgreSQL

**macOS (Homebrew)**

```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows**

* Download from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
* Install with default settings

**Docker (Alternative)**

```bash
docker run --name anzii-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=anzii \
  -p 5432:5432 \
  -d postgres:15
```

## 🔧 Database Configuration

### 1. Create Database and User

```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create database and user
CREATE DATABASE anzii;
CREATE USER anzii_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE anzii TO anzii_user;
GRANT ALL ON SCHEMA public TO anzii_user;

# Exit PostgreSQL
\q
```

### 2. Test Connection

```bash
# Test with psql
psql -h localhost -U anzii_user -d anzii

# Or test with connection string
psql "postgresql://anzii_user:your_secure_password@localhost:5432/anzii"
```

### 3. Update Environment Variables

```env
DATABASE_URL="postgresql://anzii_user:your_secure_password@localhost:5432/anzii"
```

## 🚀 Drizzle ORM Setup

### 1. Generate Migrations

```bash
# Generate migration from schema changes
pnpm db:generate

# This creates files in drizzle/ directory
```

### 2. Run Migrations

```bash
# Apply migrations to database
pnpm db:migrate

# Check migration status
pnpm db:studio
```

### 3. Seed Database (Optional)

```bash
# Add sample data
pnpm db:seed
```

## 📊 Database Schema

### Core Tables

**Users Table**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Decks Table**

```sql
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Cards Table**

```sql
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Schema Management

**View Current Schema**

```bash
# Open Drizzle Studio
pnpm db:studio

# Or check via SQL
psql -d anzii -c "\d+"
```

**Reset Database**

```bash
# Drop and recreate database
dropdb anzii
createdb anzii

# Run migrations
pnpm db:migrate

# Seed data
pnpm db:seed
```

## 🔍 Database Tools

### Drizzle Studio

```bash
# Open database browser
pnpm db:studio
```

Features:

* Browse tables and data
* Execute SQL queries
* View relationships
* Export data

### Migration Commands

```bash
# Generate new migration
pnpm db:generate

# Apply pending migrations
pnpm db:migrate

# Check migration status
pnpm db:push  # Push schema changes directly (development only)
```

### Backup and Restore

**Create Backup**

```bash
pg_dump -h localhost -U anzii_user -d anzii > backup.sql
```

**Restore Backup**

```bash
psql -h localhost -U anzii_user -d anzii < backup.sql
```

## 🐛 Common Database Issues

### Connection Issues

**Error: `connection refused`**

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Start service
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

**Error: `authentication failed`**

```bash
# Check pg_hba.conf for authentication method
sudo -u postgres cat /etc/postgresql/*/main/pg_hba.conf

# Verify user exists
sudo -u postgres psql -c "SELECT usename FROM pg_user;"
```

### Migration Issues

**Error: `relation already exists`**

```bash
# Reset database
dropdb anzii
createdb anzii
pnpm db:migrate
```

**Error: `migration out of order`**

```bash
# Check migration files in drizzle/
# Ensure they're in chronological order
# Delete problematic migration files and regenerate
```

### Performance Issues

**Slow Queries**

```sql
-- Enable query logging
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- Check slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

**Connection Pooling**

```bash
# Install pgBouncer for connection pooling
brew install pgbouncer  # macOS
sudo apt install pgbouncer  # Ubuntu
```

## 📚 Database Best Practices

### 1. Indexing

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_cards_deck_id ON cards(deck_id);
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_users_email ON users(email);
```

### 2. Constraints

```sql
-- Add constraints for data integrity
ALTER TABLE cards ADD CONSTRAINT check_front_not_empty CHECK (length(front) > 0);
ALTER TABLE decks ADD CONSTRAINT check_name_not_empty CHECK (length(name) > 0);
```

### 3. Monitoring

```sql
-- Monitor database size
SELECT pg_size_pretty(pg_database_size('anzii'));

-- Monitor table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🔄 Development Workflow

### 1. Schema Changes

```bash
# 1. Modify schema in src/db/schema.ts
# 2. Generate migration
pnpm db:generate

# 3. Review generated migration
cat drizzle/*.sql

# 4. Apply migration
pnpm db:migrate

# 5. Test changes
pnpm test
```

### 2. Data Seeding

```bash
# Add seed data
pnpm db:seed

# Custom seed script
node -e "
const { db } = require('./src/db');
const { users, decks } = require('./src/db/schema');

async function seed() {
  // Add your seed data here
  console.log('Database seeded successfully');
}

seed().catch(console.error);
"
```

## 📚 Related Documentation

* [**Environment Setup**](environment-setup.md) - Configure database connection
* [**Quick Start**](quick-start.md) - Get up and running quickly
* [**Development Workflow**](../architecture-and-development/development-workflow.md) - Database development practices
* [**Deployment Guide**](../deployment-and-support/deployment.md) - Production database setup

***

**Need help with database operations?** Check the [Debugging Guide](../deployment-and-support/debugging.md) for troubleshooting database issues!
