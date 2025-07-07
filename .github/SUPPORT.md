# Getting Help with Anzii

Thank you for using Anzii! We're here to help you get the most out of our AI-powered spaced repetition learning platform.

## Documentation & Resources

- 📚 [README](../README.md) - Complete setup instructions and project overview
- 🔧 [Contributing Guidelines](CONTRIBUTING.md) - Development setup and contribution workflow
- 🎯 [Product Requirements](../docs/PRD-Anzii.md) - Detailed project specifications
- 🏗️ [Blueprint Documentation](../docs/blueprint.md) - Architecture and design decisions
- 🎯 [Roadmap](https://anzii.space/roadmap) - Upcoming features and development timeline

## Quick Start

New to Anzii? Here's how to get started:

1. **Installation**: Follow the [setup guide](../README.md#installation) for local development
2. **First Steps**: Create your first flashcard deck at [anzii.space/create](https://anzii.space/create)
3. **Learning**: Import content or let AI generate cards from any topic
4. **Study**: Use spaced repetition to optimize your learning schedule

## Getting Support

### 🐛 Bug Reports

Found a bug? Please help us fix it:

- **Search existing issues** first to avoid duplicates
- Use the **bug report template** when creating new issues
- Include steps to reproduce, expected vs actual behavior
- Add screenshots or error messages when applicable

### 💡 Feature Requests

Have an idea to improve Anzii?

- Use the **feature request template**
- Explain the problem you're trying to solve
- Describe your proposed solution
- Consider alternative approaches

### ❓ Questions & Discussion

- **General questions**: Use [GitHub Discussions](https://github.com/anzii/anzii/discussions)
- **Development help**: Join our community discussions
- **Study tips**: Share learning strategies with other users

### 🚨 Security Issues

**Do not report security vulnerabilities in public issues.**

- Email: security@anzii.space
- See our [Security Policy](SECURITY.md) for details

## Community Guidelines

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

## Response Times

- **Bug reports**: Triaged within 2-3 business days
- **Security issues**: Priority handling within 24 hours
- **Feature requests**: Evaluated during monthly planning cycles
- **General questions**: Community-driven responses

## Development Environment

Need help with local development?

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test:all

# Database setup
pnpm db:generate && pnpm db:migrate
```

Common development issues:

- **Database connection**: Check your `.env.local` configuration
- **AI features**: Ensure `GEMINI_API_KEY` is properly set
- **Build errors**: Run `pnpm typecheck` to catch TypeScript issues

## Additional Resources

- 🌐 **Live Application**: [anzii.space](https://anzii.space)
- 📊 **Analytics**: Built-in progress tracking and performance insights
- 🎨 **Themes**: 17 accessible themes with full WCAG 2.1 AA compliance
- 📱 **Cross-platform**: Sync your learning across all devices

We appreciate your interest in making learning more effective through AI and spaced repetition!
