import { NextRequest, NextResponse } from "next/server";

import { UserService } from "@/lib/user-service";
import { stackServerApp } from "@/stack";

export async function GET() {
	try {
		const user = await stackServerApp.getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const preferences = await UserService.getUserPreferences(user.primaryEmail);
		return NextResponse.json(preferences);
	} catch (error) {
		console.error("Error fetching user preferences:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user preferences" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const user = await stackServerApp.getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { displayName, theme, font } = body;

		const updatedUser = await UserService.updateUserPreferences(
			user.primaryEmail,
			{
				displayName,
				theme,
				font,
			}
		);

		return NextResponse.json({
			displayName: updatedUser.displayName,
			theme: updatedUser.theme,
			font: updatedUser.font,
		});
	} catch (error) {
		console.error("Error updating user preferences:", error);
		return NextResponse.json(
			{ error: "Failed to update user preferences" },
			{ status: 500 }
		);
	}
}
