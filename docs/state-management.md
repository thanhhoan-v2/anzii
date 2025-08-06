# State Management

Learn how to manage state effectively in Anzii using React Query and Zustand.

## 📊 State Management Strategy

Anzii uses a hybrid approach to state management:

- **TanStack Query (React Query)** - Server state (API data, caching)
- **Zustand** - Client state (UI state, user preferences)
- **React Hook Form** - Form state management

## 🔄 React Query (TanStack Query)

### 1. Query Client Configuration

```tsx
// app/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			cacheTime: 10 * 60 * 1000, // 10 minutes
			retry: 3,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
```

### 2. Query Keys Organization

```tsx
// lib/query-keys.ts
export const queryKeys = {
	decks: {
		all: ["decks"] as const,
		lists: () => [...queryKeys.decks.all, "list"] as const,
		list: (filters: string) =>
			[...queryKeys.decks.lists(), { filters }] as const,
		details: () => [...queryKeys.decks.all, "detail"] as const,
		detail: (id: string) => [...queryKeys.decks.details(), id] as const,
	},
	cards: {
		all: ["cards"] as const,
		lists: () => [...queryKeys.cards.all, "list"] as const,
		list: (deckId: string) => [...queryKeys.cards.lists(), deckId] as const,
		details: () => [...queryKeys.cards.all, "detail"] as const,
		detail: (id: string) => [...queryKeys.cards.details(), id] as const,
	},
	user: {
		profile: ["user", "profile"] as const,
		settings: ["user", "settings"] as const,
	},
} as const;
```

### 3. Custom Hooks for Queries

```tsx
// hooks/use-decks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getDecks, createDeck, updateDeck, deleteDeck } from "@/lib/actions";

export function useDecks(filters?: string) {
	return useQuery({
		queryKey: queryKeys.decks.list(filters || ""),
		queryFn: () => getDecks(filters),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useDeck(id: string) {
	return useQuery({
		queryKey: queryKeys.decks.detail(id),
		queryFn: () => getDeck(id),
		enabled: !!id,
	});
}

export function useCreateDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createDeck,
		onSuccess: (newDeck) => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: queryKeys.decks.lists() });

			// Optimistically update cache
			queryClient.setQueryData(queryKeys.decks.detail(newDeck.id), newDeck);
		},
	});
}

export function useUpdateDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateDeck,
		onSuccess: (updatedDeck) => {
			// Update cache
			queryClient.setQueryData(
				queryKeys.decks.detail(updatedDeck.id),
				updatedDeck
			);

			// Invalidate lists
			queryClient.invalidateQueries({ queryKey: queryKeys.decks.lists() });
		},
	});
}

export function useDeleteDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteDeck,
		onSuccess: (_, deletedId) => {
			// Remove from cache
			queryClient.removeQueries({
				queryKey: queryKeys.decks.detail(deletedId),
			});

			// Invalidate lists
			queryClient.invalidateQueries({ queryKey: queryKeys.decks.lists() });
		},
	});
}
```

### 4. Cards Management

```tsx
// hooks/use-cards.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getCards, createCard, updateCard, deleteCard } from "@/lib/actions";

export function useCards(deckId: string) {
	return useQuery({
		queryKey: queryKeys.cards.list(deckId),
		queryFn: () => getCards(deckId),
		enabled: !!deckId,
	});
}

export function useCreateCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCard,
		onSuccess: (newCard) => {
			// Update cards list
			queryClient.invalidateQueries({
				queryKey: queryKeys.cards.list(newCard.deckId),
			});

			// Update deck card count
			queryClient.invalidateQueries({
				queryKey: queryKeys.decks.detail(newCard.deckId),
			});
		},
	});
}

export function useUpdateCard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCard,
		onSuccess: (updatedCard) => {
			// Update specific card
			queryClient.setQueryData(
				queryKeys.cards.detail(updatedCard.id),
				updatedCard
			);

			// Invalidate cards list
			queryClient.invalidateQueries({
				queryKey: queryKeys.cards.list(updatedCard.deckId),
			});
		},
	});
}
```

## 🗃️ Zustand for Client State

### 1. Settings Store

```tsx
// lib/stores/settings-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
	theme: string;
	fontSize: "small" | "medium" | "large";
	autoPlay: boolean;
	soundEnabled: boolean;
	notifications: boolean;
}

interface SettingsActions {
	setTheme: (theme: string) => void;
	setFontSize: (size: "small" | "medium" | "large") => void;
	setAutoPlay: (enabled: boolean) => void;
	setSoundEnabled: (enabled: boolean) => void;
	setNotifications: (enabled: boolean) => void;
	resetSettings: () => void;
}

const initialState: SettingsState = {
	theme: "default",
	fontSize: "medium",
	autoPlay: true,
	soundEnabled: true,
	notifications: true,
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
	persist(
		(set) => ({
			...initialState,
			setTheme: (theme) => set({ theme }),
			setFontSize: (fontSize) => set({ fontSize }),
			setAutoPlay: (autoPlay) => set({ autoPlay }),
			setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
			setNotifications: (notifications) => set({ notifications }),
			resetSettings: () => set(initialState),
		}),
		{
			name: "anzii-settings",
			partialize: (state) => ({
				theme: state.theme,
				fontSize: state.fontSize,
				autoPlay: state.autoPlay,
				soundEnabled: state.soundEnabled,
				notifications: state.notifications,
			}),
		}
	)
);
```

### 2. Study Session Store

```tsx
// lib/stores/study-session-store.ts
import { create } from "zustand";

interface StudySession {
	deckId: string;
	currentCardIndex: number;
	totalCards: number;
	correctAnswers: number;
	incorrectAnswers: number;
	startTime: Date;
	isActive: boolean;
}

interface StudySessionActions {
	startSession: (deckId: string, totalCards: number) => void;
	nextCard: () => void;
	previousCard: () => void;
	markCorrect: () => void;
	markIncorrect: () => void;
	endSession: () => void;
	resetSession: () => void;
}

export const useStudySessionStore = create<StudySession & StudySessionActions>(
	(set, get) => ({
		deckId: "",
		currentCardIndex: 0,
		totalCards: 0,
		correctAnswers: 0,
		incorrectAnswers: 0,
		startTime: new Date(),
		isActive: false,

		startSession: (deckId, totalCards) =>
			set({
				deckId,
				totalCards,
				currentCardIndex: 0,
				correctAnswers: 0,
				incorrectAnswers: 0,
				startTime: new Date(),
				isActive: true,
			}),

		nextCard: () => {
			const { currentCardIndex, totalCards } = get();
			if (currentCardIndex < totalCards - 1) {
				set({ currentCardIndex: currentCardIndex + 1 });
			}
		},

		previousCard: () => {
			const { currentCardIndex } = get();
			if (currentCardIndex > 0) {
				set({ currentCardIndex: currentCardIndex - 1 });
			}
		},

		markCorrect: () => {
			const { correctAnswers } = get();
			set({ correctAnswers: correctAnswers + 1 });
		},

		markIncorrect: () => {
			const { incorrectAnswers } = get();
			set({ incorrectAnswers: incorrectAnswers + 1 });
		},

		endSession: () => set({ isActive: false }),

		resetSession: () =>
			set({
				deckId: "",
				currentCardIndex: 0,
				totalCards: 0,
				correctAnswers: 0,
				incorrectAnswers: 0,
				startTime: new Date(),
				isActive: false,
			}),
	})
);
```

### 3. UI State Store

```tsx
// lib/stores/ui-store.ts
import { create } from "zustand";

interface UIState {
	sidebarOpen: boolean;
	modalOpen: boolean;
	modalType: string | null;
	toastQueue: Array<{
		id: string;
		message: string;
		type: "success" | "error" | "info";
	}>;
}

interface UIActions {
	toggleSidebar: () => void;
	openModal: (type: string) => void;
	closeModal: () => void;
	addToast: (message: string, type: "success" | "error" | "info") => void;
	removeToast: (id: string) => void;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
	sidebarOpen: false,
	modalOpen: false,
	modalType: null,
	toastQueue: [],

	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

	openModal: (type) => set({ modalOpen: true, modalType: type }),

	closeModal: () => set({ modalOpen: false, modalType: null }),

	addToast: (message, type) => {
		const id = Math.random().toString(36).substr(2, 9);
		set((state) => ({
			toastQueue: [...state.toastQueue, { id, message, type }],
		}));

		// Auto-remove after 5 seconds
		setTimeout(() => {
			get().removeToast(id);
		}, 5000);
	},

	removeToast: (id) =>
		set((state) => ({
			toastQueue: state.toastQueue.filter((toast) => toast.id !== id),
		})),
}));
```

## 🎯 Using State in Components

### 1. Server State with React Query

```tsx
// components/features/deck/deck-list.tsx
"use client";

import { useDecks, useCreateDeck, useDeleteDeck } from "@/hooks/use-decks";
import { DeckCard } from "./deck-card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function DeckList() {
	const { data: decks, isLoading, error } = useDecks();
	const createDeckMutation = useCreateDeck();
	const deleteDeckMutation = useDeleteDeck();

	if (isLoading) return <LoadingSpinner />;
	if (error) return <div>Error loading decks: {error.message}</div>;

	const handleCreateDeck = async () => {
		try {
			await createDeckMutation.mutateAsync({
				name: "New Deck",
				description: "A new deck for your cards",
			});
		} catch (error) {
			console.error("Failed to create deck:", error);
		}
	};

	const handleDeleteDeck = async (deckId: string) => {
		try {
			await deleteDeckMutation.mutateAsync(deckId);
		} catch (error) {
			console.error("Failed to delete deck:", error);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Your Decks</h2>
				<Button
					onClick={handleCreateDeck}
					disabled={createDeckMutation.isPending}
				>
					{createDeckMutation.isPending ? "Creating..." : "Create Deck"}
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{decks?.map((deck) => (
					<DeckCard
						key={deck.id}
						deck={deck}
						onDelete={() => handleDeleteDeck(deck.id)}
					/>
				))}
			</div>
		</div>
	);
}
```

### 2. Client State with Zustand

```tsx
// components/features/study/study-session.tsx
"use client";

import { useStudySessionStore } from "@/lib/stores/study-session-store";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function StudySession() {
	const {
		currentCardIndex,
		totalCards,
		correctAnswers,
		incorrectAnswers,
		isActive,
		nextCard,
		previousCard,
		markCorrect,
		markIncorrect,
		endSession,
	} = useStudySessionStore();

	const { autoPlay, soundEnabled } = useSettingsStore();

	const progress = (currentCardIndex / totalCards) * 100;
	const accuracy = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;

	const handleCorrect = () => {
		markCorrect();
		if (autoPlay) {
			nextCard();
		}
	};

	const handleIncorrect = () => {
		markIncorrect();
		if (autoPlay) {
			nextCard();
		}
	};

	if (!isActive) {
		return <div>No active study session</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					Card {currentCardIndex + 1} of {totalCards}
				</div>
				<div className="text-sm text-muted-foreground">
					Accuracy: {accuracy.toFixed(1)}%
				</div>
			</div>

			<Progress value={progress} className="w-full" />

			<div className="flex justify-between">
				<Button
					onClick={previousCard}
					disabled={currentCardIndex === 0}
					variant="outline"
				>
					Previous
				</Button>

				<div className="flex gap-2">
					<Button onClick={handleIncorrect} variant="destructive">
						Incorrect
					</Button>
					<Button onClick={handleCorrect} variant="default">
						Correct
					</Button>
				</div>

				<Button
					onClick={nextCard}
					disabled={currentCardIndex === totalCards - 1}
					variant="outline"
				>
					Next
				</Button>
			</div>

			<Button onClick={endSession} variant="outline" className="w-full">
				End Session
			</Button>
		</div>
	);
}
```

## 🔄 State Synchronization

### 1. Optimistic Updates

```tsx
// hooks/use-optimistic-updates.ts
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export function useOptimisticUpdates() {
	const queryClient = useQueryClient();

	const optimisticUpdate = (queryKey: any[], updater: (old: any) => any) => {
		queryClient.setQueryData(queryKey, updater);
	};

	const rollbackUpdate = (queryKey: any[]) => {
		queryClient.invalidateQueries({ queryKey });
	};

	return { optimisticUpdate, rollbackUpdate };
}
```

### 2. Cross-Store Communication

```tsx
// lib/stores/root-store.ts
import { create } from "zustand";
import { useSettingsStore } from "./settings-store";
import { useStudySessionStore } from "./study-session-store";

// Example: Update settings when study session ends
export const useRootStore = create((set, get) => ({
	// Root store logic
}));

// In study session component
const { endSession } = useStudySessionStore();
const { setNotifications } = useSettingsStore();

const handleEndSession = () => {
	endSession();

	// Update settings based on session results
	const { correctAnswers, totalCards } = useStudySessionStore.getState();
	const accuracy = (correctAnswers / totalCards) * 100;

	if (accuracy > 80) {
		setNotifications(true); // Enable notifications for good performance
	}
};
```

## 🧪 Testing State Management

### 1. Testing React Query Hooks

```tsx
// __tests__/hooks/use-decks.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDecks } from "@/hooks/use-decks";

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});
	return ({ children }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

test("fetches decks successfully", async () => {
	const { result } = renderHook(() => useDecks(), {
		wrapper: createWrapper(),
	});

	await waitFor(() => {
		expect(result.current.isSuccess).toBe(true);
	});

	expect(result.current.data).toHaveLength(2);
});
```

### 2. Testing Zustand Stores

```tsx
// __tests__/stores/settings-store.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSettingsStore } from "@/lib/stores/settings-store";

test("updates theme correctly", () => {
	const { result } = renderHook(() => useSettingsStore());

	act(() => {
		result.current.setTheme("dark");
	});

	expect(result.current.theme).toBe("dark");
});

test("resets settings to initial state", () => {
	const { result } = renderHook(() => useSettingsStore());

	act(() => {
		result.current.setTheme("dark");
		result.current.setFontSize("large");
	});

	act(() => {
		result.current.resetSettings();
	});

	expect(result.current.theme).toBe("default");
	expect(result.current.fontSize).toBe("medium");
});
```

## 📚 Related Documentation

- **[Project Architecture](architecture.md)** - Understanding the tech stack
- **[UI Development](ui-development.md)** - Building stateful components
- **[AI Integration](ai-integration.md)** - Managing AI state
- **[Development Workflow](development-workflow.md)** - Testing state management

---

**Ready to manage state effectively?** Check out the [Authentication](authentication.md) guide to learn about user state management!
