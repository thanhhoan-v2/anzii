import { NextRequest, NextResponse } from "next/server";

import { incrementUserCount } from "@/lib/actions";

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

		const result = await incrementUserCount(deckId);

		if (result.success) {
			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json({ error: result.error }, { status: 500 });
		}
	} catch (error) {
		console.error("Error incrementing user count:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
