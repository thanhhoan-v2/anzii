# Changelog

All notable changes to Anzii will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Facebook-style like system with optimistic updates
- Comprehensive search functionality for deck discovery
- Deck deletion with user confirmation
- Database seeding with sample data
- Enhanced UI components with better accessibility

### Changed
- Improved code quality and type naming conventions
- Renamed `RawCardData` to `DatabaseCardData` for better clarity
- Enhanced deck engagement features and user experience
- Updated routing structure and navigation

### Fixed
- DecksSearch visibility and AppHeader routing issues
- Unnecessary React Hook dependency warnings
- Auto-sorted imports and exports for consistency

### Removed
- Commented share button code from DeckCard component
- Related topics feature to simplify AI functionality

## [2.0.0] - 2024-12-15

### Added
- **Next.js 15 & React 19 Upgrade** - Latest framework features and performance improvements
- **Social Features** - Like system, user engagement metrics, and deck sharing
- **Enhanced Review Sessions** - Embedded review within deck detail pages
- **Unlimited Review Access** - Removed trial limitations for better user experience
- **Advanced Search** - Comprehensive deck discovery and filtering
- **17 Accessibility Themes** - WCAG 2.1 AA compliant color schemes
- **Performance Optimizations** - Turbopack, React Query caching, and bundle optimization

### Changed
- **Database Schema** - Simplified structure, removed related_topics column
- **AI Integration** - Streamlined AI flows, focused on core functionality
- **Review System** - Removed separate review pages, embedded in deck details
- **Authentication** - Migrated from Stack to enhanced auth system
- **State Management** - Full React Query integration with optimistic updates

### Fixed
- Review session access and navigation
- Card management and SRS algorithm accuracy
- UI responsiveness and mobile experience
- Database connection stability

### Removed
- Related topics feature from AI generation
- Limited trial restrictions
- Separate review pages (now embedded)

## [1.5.0] - 2024-11-20

### Added
- **React Query Integration** - Comprehensive state management with optimistic updates
- **AI-Generated Descriptions** - Intelligent deck descriptions using Google Gemini
- **Enhanced Flashcard Animations** - Multiple animation types (flip, fade, slide)
- **Deck Management UI** - Improved deck editing with confirmation dialogs
- **GitHub Workflows** - Automated CI/CD pipeline

### Changed
- **Component Architecture** - Refactored to atomic design principles
- **Theme System** - Enhanced color scheme provider and selector
- **Performance** - Lazy loading implementation across components
- **Code Quality** - ESLint, Prettier, and Husky integration

### Fixed
- Build errors and deployment issues
- Component import consistency
- Theme switching reliability

## [1.4.0] - 2024-10-25

### Added
- **Vercel Analytics** - Performance monitoring and user insights
- **Speed Insights** - Real-time performance tracking
- **Contact Form** - Email integration for user support
- **Landing Page** - Enhanced hero section and marketing content
- **Logo and Branding** - Professional visual identity

### Changed
- **Authentication Flow** - Improved user onboarding and routes
- **Meta Tags** - Enhanced SEO and social sharing
- **Responsive Design** - Mobile-first improvements

### Fixed
- Google site verification
- Deployment configuration
- Import organization and linting

## [1.3.0] - 2024-09-30

### Added
- **Database Migrations** - Production-ready migration system
- **Admin Interface** - Database management tools
- **Neon Database Integration** - Serverless PostgreSQL setup
- **Drizzle ORM** - Type-safe database operations

### Changed
- **Database Connection** - Improved connection handling and schema management
- **Font System** - Enhanced typography and readability
- **AppHeader Component** - Consistent navigation across pages

### Fixed
- Database schema synchronization
- Production deployment configuration
- Favicon and asset loading

## [1.2.0] - 2024-09-15

### Added
- **AI-Powered Generation** - Google Gemini integration for flashcard creation
- **Markdown Import** - Convert markdown content to flashcards
- **Spaced Repetition** - SM-2 algorithm implementation
- **Theme Toggle** - Dark/light mode switching
- **Deck Customization** - Individual deck settings and management

### Changed
- **Review System** - Enhanced spaced repetition logic
- **UI Components** - Improved card formatting and display
- **Database Schema** - Optimized for flashcard data

### Fixed
- AI generation failures
- Markdown parsing issues
- Review session state management

## [1.1.0] - 2024-08-20

### Added
- **Deck Management** - Create, edit, and organize flashcard decks
- **Review Sessions** - Interactive study interface
- **Progress Tracking** - Learning analytics and statistics
- **Export/Import** - Data portability features

### Changed
- **UI/UX** - Enhanced user interface design
- **Performance** - Optimized rendering and data loading
- **Navigation** - Improved routing and user flow

### Fixed
- Session persistence
- Card scheduling accuracy
- Mobile responsiveness

## [1.0.0] - 2024-08-01

### Added
- **Initial Release** - Core flashcard functionality
- **Basic AI Integration** - Simple content generation
- **User Authentication** - Account creation and management
- **Responsive Design** - Mobile and desktop support
- **PostgreSQL Backend** - Reliable data storage

### Features
- Create and study flashcards
- Basic spaced repetition
- User accounts and data persistence
- AI-assisted content creation
- Cross-platform compatibility

---

## Version History Summary

- **v2.0.0**: Major upgrade with Next.js 15, React 19, and social features
- **v1.5.0**: React Query integration and enhanced AI features
- **v1.4.0**: Analytics, performance monitoring, and branding
- **v1.3.0**: Database migrations and production deployment
- **v1.2.0**: AI integration and spaced repetition algorithm
- **v1.1.0**: Deck management and review system
- **v1.0.0**: Initial release with core functionality

## Contributing

For contribution guidelines, please see [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Support

For support and questions, please see [SUPPORT.md](.github/SUPPORT.md).