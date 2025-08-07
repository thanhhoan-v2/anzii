import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { users } from "@/db/schema";

export interface UserPreferences {
	displayName?: string;
	theme: string;
	font: string;
}

export class UserService {
	static async getUserByEmail(email: string) {
		const db = getDb();
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);
		return result[0] || null;
	}

	static async createUser(
		email: string,
		preferences?: Partial<UserPreferences>
	) {
		const db = getDb();
		const [user] = await db
			.insert(users)
			.values({
				email,
				displayName: preferences?.displayName,
				theme: preferences?.theme || "space-grotesk",
				font: preferences?.font || "space-grotesk",
			})
			.returning();
		return user;
	}

	static async updateUserPreferences(
		email: string,
		preferences: Partial<UserPreferences>
	) {
		const db = getDb();
		const updateData: Record<string, unknown> = {
			updatedAt: new Date(),
		};

		if (preferences.displayName !== undefined) {
			updateData.displayName = preferences.displayName;
		}
		if (preferences.theme !== undefined) {
			updateData.theme = preferences.theme;
		}
		if (preferences.font !== undefined) {
			updateData.font = preferences.font;
		}

		const [user] = await db
			.update(users)
			.set(updateData)
			.where(eq(users.email, email))
			.returning();
		return user;
	}

	static async getUserPreferences(
		email: string
	): Promise<UserPreferences | null> {
		const user = await this.getUserByEmail(email);
		if (!user) return null;

		return {
			displayName: user.displayName || undefined,
			theme: user.theme || "space-grotesk",
			font: user.font || "space-grotesk",
		};
	}

	static async upsertUser(
		email: string,
		preferences?: Partial<UserPreferences>
	) {
		const existingUser = await this.getUserByEmail(email);

		if (existingUser) {
			return this.updateUserPreferences(email, preferences || {});
		} else {
			return this.createUser(email, preferences);
		}
	}
}
