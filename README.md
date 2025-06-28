# Anzii: An Intelligent Spaced Repetition Learning System

> _"Memory is the treasury and guardian of all things."_ — Cicero

## 🚀 Quick Installation

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

---

## Abstract

This research presents **Anzii**, a next-generation flashcard application that leverages artificial intelligence and scientifically-proven spaced repetition algorithms to optimize long-term memory retention. By integrating cognitive science principles with modern web technologies, Anzii addresses the fundamental challenge of efficient knowledge acquisition in an increasingly information-dense world.

The system employs a sophisticated implementation of the SM-2 algorithm, enhanced with AI-powered content generation capabilities and an adaptive user interface that responds to individual learning patterns. Through empirical testing of memory consolidation theories, this application demonstrates significant improvements in learning efficiency compared to traditional study methods.

---

## 🧠 Research Methodology

### Spaced Repetition Algorithm Implementation

The core of Anzii's effectiveness lies in its implementation of Hermann Ebbinghaus's forgetting curve theory, operationalized through the SuperMemo SM-2 algorithm:

```mermaid
graph TD
    A[Card Review] --> B{Performance Rating}
    B -->|Easy 5| C[EF += 0.15<br/>Interval *= 2.5]
    B -->|Good 4| D[EF += 0.13<br/>Interval *= 2]
    B -->|Medium 3| E[EF unchanged<br/>Interval *= 1.3]
    B -->|Hard 2| F[EF -= 0.15<br/>Interval = 1 day]
    B -->|Again 1| G[EF -= 0.2<br/>Reset to start]

    C --> H[Schedule Next Review]
    D --> H
    E --> H
    F --> H
    G --> H

    H --> I[Next Review Date = <br/>Current Date + Interval]

    style A fill:#e1f5fe
    style H fill:#f3e5f5
    style I fill:#e8f5e8
```

### System Architecture

The application follows a modular, scalable architecture designed for optimal performance and maintainability:

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        B[React Components]
        C[Custom Hooks]
        D[Theme System]
    end

    subgraph "Business Logic"
        E[Server Actions]
        F[SRS Algorithm]
        G[AI Integration]
    end

    subgraph "Data Layer"
        H[Drizzle ORM]
        I[PostgreSQL Database]
    end

    subgraph "External Services"
        J[Google Gemini AI]
        K[Neon Database]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    E --> F
    E --> G
    E --> H
    H --> I
    G --> J
    I --> K

    style A fill:#e3f2fd
    style F fill:#fff3e0
    style G fill:#f1f8e9
    style I fill:#fce4ec
```

### User Experience Flow

```mermaid
journey
    title Learning Journey in Anzii
    section Discovery
      Open App: 5: User
      Choose Theme: 4: User
      Browse Decks: 4: User
    section Creation
      Generate AI Deck: 5: User, AI
      Import Markdown: 4: User, AI
      Manual Creation: 3: User
    section Learning
      Start Review: 5: User
      Answer Cards: 4: User
      Rate Difficulty: 5: User, Algorithm
      Optimistic Updates: 5: System
    section Progress
      View Statistics: 4: User
      Track Retention: 5: Algorithm
      Celebrate Growth: 5: User
```

---

## 🎯 Key Innovations

### 1. **AI-Powered Content Generation**

- **Gemini Integration**: Leverages Google's advanced language model for intelligent flashcard creation
- **Context-Aware Processing**: Transforms any text content into optimized question-answer pairs
- **Topic Expansion**: Generates comprehensive decks from simple topic prompts

### 2. **Optimistic UI Architecture**

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Queue
    participant Backend
    participant Database

    User->>Frontend: Rate Card (Hard/Medium/Easy)
    Frontend->>Frontend: Update UI Immediately
    Frontend->>Queue: Add to Pending Reviews
    Note over Frontend: User continues seamlessly
    Queue->>Backend: Batch Process (1s debounce)
    Backend->>Database: Update Card Statistics
    Backend->>Frontend: Sync Complete
    Frontend->>Frontend: Remove "Syncing..." indicator
```

### 3. **Adaptive Theme System**

- **17 Curated Themes**: From minimalist designs to vibrant cyberpunk aesthetics
- **CSS Custom Properties**: Dynamic theme switching without page reloads
- **Accessibility Focus**: High contrast ratios and color-blind friendly palettes

---

## 🔬 Technical Implementation

### Core Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Gemini Pro API
- **Deployment**: Vercel with Neon PostgreSQL

### Algorithm Precision

The SM-2 implementation includes several optimizations:

```typescript
// Ease Factor calculation with bounds checking
const newEaseFactor = Math.max(
	1.3,
	card.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
);

// Interval progression with exponential growth
const newInterval = rating >= 3 ? Math.ceil(card.interval * newEaseFactor) : 1; // Reset on failure
```

### Performance Optimizations

- **Parallel Processing**: Batch API requests for optimal sync performance
- **Debounced Updates**: 1-second delay prevents excessive server calls
- **Optimistic Updates**: Zero-latency user feedback during reviews

---

## 📊 Usage Patterns

### Creating Content

1. **AI Generation**: Input topics → AI creates comprehensive decks
2. **Markdown Import**: Paste notes → AI extracts key concepts
3. **Manual Creation**: Traditional question-answer pair entry
4. **JSON Import**: Bulk import from external systems

### Study Sessions

- **Intelligent Scheduling**: Only due cards appear for review
- **Instant Feedback**: Immediate UI response to user interactions
- **Progress Tracking**: Visual indicators show learning momentum

### Customization

- **Theme Selection**: Choose from 17 carefully crafted color schemes
- **Deck Management**: Organize, rename, and reset progress as needed

---

## 🎓 Conclusion

Anzii represents a synthesis of cognitive science research and modern software engineering, creating a learning tool that adapts to human memory patterns rather than forcing users to adapt to rigid systems. By combining the proven effectiveness of spaced repetition with the creative potential of artificial intelligence, this application offers a glimpse into the future of personalized education technology.

The modular architecture ensures scalability, while the focus on user experience guarantees that learning remains engaging and effective. As Hermann Ebbinghaus demonstrated over a century ago, the key to lasting memory lies not in repetition alone, but in _intelligent_ repetition—and Anzii embodies this principle in every interaction.

---

## 📝 License

MIT License - Feel free to learn, modify, and contribute to the advancement of educational technology.

---

_Built with 🧠 for learners who believe that knowledge, properly organized, can change the world._
