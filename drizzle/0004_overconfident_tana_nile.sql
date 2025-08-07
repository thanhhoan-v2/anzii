ALTER TABLE "decks" ADD COLUMN "like_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "decks" ADD COLUMN "user_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "decks" DROP COLUMN IF EXISTS "related_topics";