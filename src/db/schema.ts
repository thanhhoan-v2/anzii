import { randomUUID } from "node:crypto";

import { relations } from "drizzle-orm";
import {
	integer,
	json,
	pgTable,
	real,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const decks = pgTable("decks", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	description: text("description"),
	relatedTopics: json("related_topics").$type<string[]>(),
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
	cardType: varchar("card_type", { length: 20 }).default("flashcard"),
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

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	email: varchar("email", { length: 255 }).notNull().unique(),
	displayName: varchar("display_name", { length: 255 }),
	theme: varchar("theme", { length: 50 }).default("space-grotesk"),
	font: varchar("font", { length: 50 }).default("space-grotesk"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	decks: many(decks),
}));
