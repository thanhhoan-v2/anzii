export const queryKeys = {
	// Decks
	decks: ["decks"] as const,
	deck: (id: string) => ["decks", id] as const,
	deckCards: (deckId: string) => ["decks", deckId, "cards"] as const,

	// Cards
	cards: ["cards"] as const,
	card: (id: string) => ["cards", id] as const,

	// User
	user: ["user"] as const,
	userProfile: (id: string) => ["user", id] as const,
	userDecks: (userId: string) => ["user", userId, "decks"] as const,
	userStats: (userId: string) => ["user", userId, "stats"] as const,

	// Study Sessions
	studySessions: ["study-sessions"] as const,
	studySession: (id: string) => ["study-sessions", id] as const,
	userStudySessions: (userId: string) =>
		["user", userId, "study-sessions"] as const,

	// AI Generated Content
	aiQuestions: (topic: string) => ["ai", "questions", topic] as const,
	aiDeck: (topic: string) => ["ai", "deck", topic] as const,
};
