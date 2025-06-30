import { randomUUID } from "node:crypto";

import { relations } from "drizzle-orm";
import { integer, pgTable, real, text, timestamp } from "drizzle-orm/pg-core";

export const decks = pgTable("decks", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const decksRelations = relations(decks, ({ many }) => ({
	cards: many(cards),
}));

export const cards = pgTable("cards", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	deckId: text("deck_id")
		.notNull()
		.references(() => decks.id, { onDelete: "cascade" }),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	interval: integer("interval").notNull().default(0),
	easeFactor: real("ease_factor").notNull().default(2.5),
	dueDate: timestamp("due_date", { withTimezone: true }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const cardsRelations = relations(cards, ({ one }) => ({
	deck: one(decks, {
		fields: [cards.deckId],
		references: [decks.id],
	}),
}));
