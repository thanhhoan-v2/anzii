CREATE TABLE IF NOT EXISTS "user_likes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"deck_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
-- Add unique constraint to prevent duplicate likes
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_user_deck_unique" UNIQUE ("user_id", "deck_id");
