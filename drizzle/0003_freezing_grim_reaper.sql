CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"theme" varchar(50) DEFAULT 'space-grotesk',
	"font" varchar(50) DEFAULT 'space-grotesk',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "card_type" SET DEFAULT 'flashcard';--> statement-breakpoint
ALTER TABLE "decks" ADD COLUMN "related_topics" json;