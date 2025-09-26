# Migration Guides

This directory contains comprehensive migration guides for major Anzii upgrades and breaking changes.

## Available Migration Guides

### Major Version Upgrades

- [**v1.x to v2.0**](v1-to-v2.md) - Next.js 15, React 19, and social features
- [**Stack Auth Integration**](stack-auth-migration.md) - Authentication system upgrade
- [**React Query Migration**](react-query-migration.md) - State management modernization

### Database Migrations

- [**Schema Changes**](database-migrations.md) - Database structure updates
- [**Data Migration**](data-migration.md) - Moving existing data safely

### Framework Upgrades

- [**Next.js 15 Upgrade**](nextjs-15-upgrade.md) - App Router and performance improvements
- [**React 19 Upgrade**](react-19-upgrade.md) - New React features and patterns

## Migration Checklist

Before starting any migration:

### 🔍 Pre-Migration Assessment

- [ ] **Backup your data** - Database and file backups
- [ ] **Review breaking changes** - Check changelog and migration notes
- [ ] **Test in development** - Full migration on development environment
- [ ] **Update dependencies** - Check for compatible package versions
- [ ] **Plan rollback strategy** - Have a way to revert changes

### 🚀 Migration Process

- [ ] **Follow guide step-by-step** - Don't skip or modify steps
- [ ] **Run tests after each step** - Verify functionality works
- [ ] **Monitor for errors** - Check logs and error tracking
- [ ] **Update documentation** - Reflect changes in your docs
- [ ] **Deploy incrementally** - Gradual rollout if possible

### ✅ Post-Migration Validation

- [ ] **Functionality testing** - All features work as expected
- [ ] **Performance testing** - No degradation in speed
- [ ] **Data integrity** - All data migrated correctly
- [ ] **User acceptance** - Key users validate the changes
- [ ] **Monitoring setup** - Alerts for any new issues

## Getting Help

If you encounter issues during migration:

1. **Check the troubleshooting section** in each guide
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed error information
4. **Join the community discussion** for help and tips

## Version Compatibility Matrix

| Anzii Version | Node.js | Next.js | React | TypeScript | Database |
|---------------|---------|---------|-------|------------|----------|
| v2.0.x        | 18+     | 15.x    | 19.x  | 5.x        | PostgreSQL 14+ |
| v1.5.x        | 18+     | 14.x    | 18.x  | 5.x        | PostgreSQL 12+ |
| v1.4.x        | 16+     | 13.x    | 18.x  | 4.x        | PostgreSQL 12+ |
| v1.3.x        | 16+     | 13.x    | 18.x  | 4.x        | PostgreSQL 12+ |

## Common Migration Patterns

### Environment Variables

```bash
# Check for new required environment variables
cp .env.example .env.local
diff .env.example .env.local
```

### Package Dependencies

```bash
# Update package.json
npm update
npm audit fix

# Check for breaking changes
npm outdated
```

### Database Schema

```bash
# Generate and apply migrations
npm run db:generate
npm run db:migrate

# Verify schema
npm run db:studio
```

### Configuration Files

- Update `next.config.js` for new features
- Modify `tailwind.config.js` for theme changes
- Check `tsconfig.json` for TypeScript updates

## Emergency Rollback

If migration fails and you need to rollback:

### Database Rollback

```bash
# Rollback database migrations
npm run db:rollback

# Restore from backup if needed
psql -U username -d database < backup.sql
```

### Code Rollback

```bash
# Revert to previous Git commit
git log --oneline -5
git reset --hard <previous-commit-hash>

# Restore dependencies
npm ci
```

### Deployment Rollback

```bash
# Vercel rollback
vercel --prod --rollback

# Manual deployment of previous version
git checkout <stable-tag>
vercel --prod
```

## Best Practices

### 🔄 Gradual Migration

- Migrate in small, incremental steps
- Test each step thoroughly before proceeding
- Keep migration commits separate and descriptive

### 📊 Monitoring During Migration

- Set up error tracking (Sentry, LogRocket)
- Monitor key metrics (response times, error rates)
- Have team members available during migration

### 🔐 Security Considerations

- Review new security practices in each version
- Update authentication and authorization logic
- Check for new security vulnerabilities

### 📈 Performance Optimization

- Benchmark before and after migration
- Optimize new features and patterns
- Update caching strategies if needed

## Contributing to Migration Guides

When creating new migration guides:

1. **Follow the template** provided in each guide
2. **Test the migration process** on a fresh setup
3. **Include troubleshooting** for common issues
4. **Add rollback instructions** for each step
5. **Update the version matrix** in this README

## Support Timeline

| Version | Active Support | Security Support | End of Life |
|---------|----------------|------------------|-------------|
| v2.0.x  | ✅ Current     | ✅ Current       | TBD         |
| v1.5.x  | 🔶 Maintenance | ✅ 6 months      | 2025-06-01  |
| v1.4.x  | ❌ Ended       | 🔶 Critical only | 2025-03-01  |
| v1.3.x  | ❌ Ended       | ❌ Ended         | 2024-12-01  |

## Resources

- [Changelog](../../CHANGELOG.md) - Full version history
- [API Documentation](../api/README.md) - Current API reference
- [Troubleshooting](../deployment-and-support/debugging.md) - Common issues and solutions
- [Contributing](../../.github/CONTRIBUTING.md) - How to contribute improvements