import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

// Instead of creating a single `db` instance when the app starts, we now
// create it on-demand inside each server action. This ensures `process.env` is loaded
// and fix the issue where DATABASE_URL is not available.

export const getDb = () => {
	if (!process.env.DATABASE_URL) {
		throw new Error(
			"DATABASE_URL is not set. Please create a .env file and add your Neon database connection string."
		);
	}
	const sql = neon(process.env.DATABASE_URL);
	return drizzle(sql, { schema });
};
