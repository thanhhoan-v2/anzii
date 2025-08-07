import { NextRequest, NextResponse } from "next/server";

import { getUserLikedDecks } from "@/lib/actions";

export async function GET(request: NextRequest) {
	try {
		// For now, we'll use a placeholder user ID since we don't have user authentication yet
		// In a real app, you'd get this from the session
		const userId = "placeholder-user-id";

		const likedDeckIds = await getUserLikedDecks(userId);

		return NextResponse.json({
			success: true,
			likedDeckIds,
		});
	} catch (error) {
		console.error("Error getting user likes:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
