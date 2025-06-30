import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

async function runMigrations() {
	console.log("🔄 Running database migrations...");

	if (!process.env.DATABASE_URL) {
		throw new Error(
			"DATABASE_URL is not set. Please set your Neon database connection string."
		);
	}

	const sql = neon(process.env.DATABASE_URL);
	const db = drizzle(sql);

	try {
		await migrate(db, { migrationsFolder: "./drizzle" });
		console.log("✅ Migrations completed successfully!");
	} catch (error) {
		console.error("❌ Migration failed:", error);
		throw error;
	}
}

// Run migrations if this file is executed directly
if (require.main === module) {
	runMigrations()
		.then(() => {
			console.log("🎉 Database setup complete!");
			process.exit(0);
		})
		.catch((error) => {
			console.error("💥 Migration script failed:", error);
			process.exit(1);
		});
}

export { runMigrations };
