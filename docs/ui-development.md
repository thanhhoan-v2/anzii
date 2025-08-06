# UI Development

Build beautiful, accessible components using Anzii's design system and theme architecture.

## 🎨 Design System Overview

Anzii uses a comprehensive design system built on:

- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Class Variance Authority** - Component variants
- **17 Curated Themes** - WCAG 2.1 AA compliant

## 🧩 Component Architecture

### 1. Base UI Components

Located in `src/components/ui/`, these are the foundational components:

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "underline-offset-4 hover:underline text-primary",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-3 rounded-md",
				lg: "h-11 px-8 rounded-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### 2. Feature Components

Located in `src/components/features/`, these are domain-specific components:

```tsx
// components/features/deck/deck-card.tsx
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Deck } from "@/types";

interface DeckCardProps {
	deck: Deck;
	onEdit?: (deck: Deck) => void;
	onDelete?: (deck: Deck) => void;
	onStudy?: (deck: Deck) => void;
}

export function DeckCard({ deck, onEdit, onDelete, onStudy }: DeckCardProps) {
	return (
		<Card className="transition-shadow hover:shadow-md">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					{deck.name}
					<div className="flex gap-2">
						{onEdit && (
							<Button variant="ghost" size="sm" onClick={() => onEdit(deck)}>
								Edit
							</Button>
						)}
						{onDelete && (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => onDelete(deck)}
							>
								Delete
							</Button>
						)}
					</div>
				</CardTitle>
				{deck.description && (
					<CardDescription>{deck.description}</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">
						{deck.cardCount} cards
					</span>
					{onStudy && (
						<Button onClick={() => onStudy(deck)}>Start Studying</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
```

### 3. Layout Components

Located in `src/components/layout/`, these handle page structure:

```tsx
// components/layout/app-header.tsx
import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";
import { AppLogo } from "@/components/common/app-logo";

export function AppHeader() {
	const user = useUser();

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<AppLogo />

				<nav className="ml-6 flex items-center space-x-6 text-sm font-medium">
					<a
						href="/dashboard"
						className="transition-colors hover:text-foreground/80"
					>
						Dashboard
					</a>
					<a
						href="/create"
						className="transition-colors hover:text-foreground/80"
					>
						Create
					</a>
				</nav>

				<div className="ml-auto flex items-center space-x-4">
					{user ? (
						<UserButton />
					) : (
						<Button asChild>
							<a href="/sign-in">Sign In</a>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
```

## 🎨 Theme System

### 1. Theme Configuration

Anzii includes 17 curated themes with full accessibility compliance:

```tsx
// lib/colors.ts
export const colorSchemes = {
	default: {
		background: "hsl(0 0% 100%)",
		foreground: "hsl(222.2 84% 4.9%)",
		card: "hsl(0 0% 100%)",
		"card-foreground": "hsl(222.2 84% 4.9%)",
		popover: "hsl(0 0% 100%)",
		"popover-foreground": "hsl(222.2 84% 4.9%)",
		primary: "hsl(222.2 47.4% 11.2%)",
		"primary-foreground": "hsl(210 40% 98%)",
		secondary: "hsl(210 40% 96%)",
		"secondary-foreground": "hsl(222.2 47.4% 11.2%)",
		muted: "hsl(210 40% 96%)",
		"muted-foreground": "hsl(215.4 16.3% 46.9%)",
		accent: "hsl(210 40% 96%)",
		"accent-foreground": "hsl(222.2 47.4% 11.2%)",
		destructive: "hsl(0 84.2% 60.2%)",
		"destructive-foreground": "hsl(210 40% 98%)",
		border: "hsl(214.3 31.8% 91.4%)",
		input: "hsl(214.3 31.8% 91.4%)",
		ring: "hsl(222.2 84% 4.9%)",
		radius: "0.5rem",
	},
	// ... 16 more themes
};
```

### 2. Theme Usage

```tsx
// hooks/use-color-scheme.tsx
import { useColorScheme } from "@stackframe/stack";

export function useColorScheme() {
	const { colorScheme, setColorScheme } = useColorScheme();

	return {
		colorScheme,
		setColorScheme,
		isDark: colorScheme === "dark",
	};
}
```

### 3. Theme Switching

```tsx
// components/common/theme-toggle.tsx
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function ThemeToggle() {
	const { colorScheme, setColorScheme } = useColorScheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
```

## 🎯 Component Guidelines

### 1. Accessibility First

```tsx
// Always include proper ARIA labels and roles
<Button aria-label="Delete deck" onClick={handleDelete}>
  <Trash className="h-4 w-4" />
</Button>

// Use semantic HTML
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
  </ul>
</nav>
```

### 2. Responsive Design

```tsx
// Use Tailwind's responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {decks.map(deck => (
    <DeckCard key={deck.id} deck={deck} />
  ))}
</div>

// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
    Welcome to Anzii
  </h1>
</div>
```

### 3. Performance Optimization

```tsx
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
	return <div>{/* Complex rendering logic */}</div>;
});

// Lazy load components
const LazyDeckEditor = lazy(() => import("./deck-editor"));

// Use proper key props
{
	items.map((item) => <Item key={item.id} item={item} />);
}
```

## 🧪 Component Testing

### 1. Unit Testing Components

```tsx
// __tests__/components/deck-card.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeckCard } from "@/components/features/deck/deck-card";

describe("DeckCard", () => {
	const mockDeck = {
		id: "1",
		name: "Test Deck",
		description: "Test Description",
		cardCount: 10,
	};

	test("renders deck information", () => {
		render(<DeckCard deck={mockDeck} />);

		expect(screen.getByText("Test Deck")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByText("10 cards")).toBeInTheDocument();
	});

	test("calls onStudy when study button is clicked", async () => {
		const mockOnStudy = jest.fn();
		const user = userEvent.setup();

		render(<DeckCard deck={mockDeck} onStudy={mockOnStudy} />);

		await user.click(screen.getByText("Start Studying"));
		expect(mockOnStudy).toHaveBeenCalledWith(mockDeck);
	});
});
```

### 2. Visual Testing

```tsx
// tests/visual/theme-test.tsx
import { render } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { DeckCard } from "@/components/features/deck/deck-card";

test("renders correctly in different themes", () => {
	const themes = ["light", "dark", "blue"];

	themes.forEach((theme) => {
		const { container } = render(
			<ThemeProvider attribute="class" defaultTheme={theme}>
				<DeckCard deck={mockDeck} />
			</ThemeProvider>
		);

		// Add visual regression testing here
		expect(container).toMatchSnapshot();
	});
});
```

## 🎨 Design Tokens

### 1. Spacing Scale

```css
/* Tailwind spacing scale */
.space-1 {
	margin: 0.25rem;
} /* 4px */
.space-2 {
	margin: 0.5rem;
} /* 8px */
.space-3 {
	margin: 0.75rem;
} /* 12px */
.space-4 {
	margin: 1rem;
} /* 16px */
.space-6 {
	margin: 1.5rem;
} /* 24px */
.space-8 {
	margin: 2rem;
} /* 32px */
```

### 2. Typography Scale

```css
/* Font sizes */
.text-xs {
	font-size: 0.75rem;
} /* 12px */
.text-sm {
	font-size: 0.875rem;
} /* 14px */
.text-base {
	font-size: 1rem;
} /* 16px */
.text-lg {
	font-size: 1.125rem;
} /* 18px */
.text-xl {
	font-size: 1.25rem;
} /* 20px */
.text-2xl {
	font-size: 1.5rem;
} /* 24px */
```

### 3. Color Palette

```css
/* Semantic color tokens */
.bg-primary {
	background-color: hsl(var(--primary));
}
.text-primary {
	color: hsl(var(--primary));
}
.bg-secondary {
	background-color: hsl(var(--secondary));
}
.text-secondary {
	color: hsl(var(--secondary));
}
```

## 🔧 Development Tools

### 1. Storybook (Optional)

```bash
# Install Storybook
npx storybook@latest init

# Create stories
// stories/deck-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DeckCard } from '@/components/features/deck/deck-card';

const meta: Meta<typeof DeckCard> = {
  title: 'Features/DeckCard',
  component: DeckCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deck: {
      id: '1',
      name: 'Sample Deck',
      description: 'A sample deck for testing',
      cardCount: 25,
    },
  },
};
```

### 2. Design System Documentation

```tsx
// Create a design system page
// app/design-system/page.tsx
export default function DesignSystemPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="mb-8 text-4xl font-bold">Design System</h1>

			<section className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">Buttons</h2>
				<div className="flex gap-4">
					<Button>Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="destructive">Destructive</Button>
				</div>
			</section>

			{/* Add more component examples */}
		</div>
	);
}
```

## 📚 Related Documentation

- **[Project Architecture](architecture.md)** - Understanding the tech stack
- **[Development Workflow](development-workflow.md)** - Development practices
- **[State Management](state-management.md)** - Managing component state
- **[AI Integration](ai-integration.md)** - Building AI-powered components

---

**Ready to build components?** Check out the [State Management](state-management.md) guide to learn about managing component state effectively!
