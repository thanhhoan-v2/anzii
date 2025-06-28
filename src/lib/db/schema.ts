import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, real, uuid } from 'drizzle-orm/pg-core';

export const decks = pgTable('decks', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const decksRelations = relations(decks, ({ many }) => ({
  cards: many(cards),
}));

export const cards = pgTable('cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  deckId: uuid('deck_id').notNull().references(() => decks.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  interval: integer('interval').default(0).notNull(),
  easeFactor: real('ease_factor').default(2.5).notNull(),
  dueDate: timestamp('due_date', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const cardsRelations = relations(cards, ({ one }) => ({
  deck: one(decks, {
    fields: [cards.deckId],
    references: [decks.id],
  }),
}));
