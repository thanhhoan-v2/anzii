import { NextRequest, NextResponse } from "next/server";

import { toggleDeckLike } from "@/lib/actions";
import { stackServerApp } from "@/stack";

export async function POST(
	request: NextRequest,
	context: { params: Promise<{ deckId: string }> }
) {
	try {
		const { deckId } = await context.params;

		if (!deckId) {
			return NextResponse.json(
				{ error: "Deck ID is required" },
				{ status: 400 }
			);
		}

		// Use authenticated user when available
		const user = await stackServerApp.getUser();
		const userId = user?.id ?? "placeholder-user-id";

		const result = await toggleDeckLike(deckId, userId);

		if (result.success) {
			return NextResponse.json({
				success: true,
				liked: result.liked,
				deckId,
			});
		} else {
			return NextResponse.json(
				{
					success: false,
					error: result.error || "Failed to toggle like",
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error toggling deck like:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Internal server error",
			},
			{ status: 500 }
		);
	}
}
