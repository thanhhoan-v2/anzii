import { NextRequest, NextResponse } from "next/server";

import { toggleDeckLike } from "@/lib/actions";

export async function POST(
	request: NextRequest,
	{ params }: { params: { deckId: string } }
) {
	try {
		const { deckId } = params;

		if (!deckId) {
			return NextResponse.json(
				{ error: "Deck ID is required" },
				{ status: 400 }
			);
		}

		// For now, we'll use a placeholder user ID since we don't have user authentication yet
		// In a real app, you'd get this from the session
		const userId = "placeholder-user-id";

		const result = await toggleDeckLike(deckId, userId);

		if (result.success) {
			return NextResponse.json({
				success: true,
				liked: result.liked,
			});
		} else {
			return NextResponse.json({ error: result.error }, { status: 500 });
		}
	} catch (error) {
		console.error("Error toggling deck like:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
