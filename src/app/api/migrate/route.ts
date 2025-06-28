import { runMigrations } from "@/db/migrate";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        console.log("🔄 Starting database migration...");
        await runMigrations();

        return NextResponse.json(
            {
                success: true,
                message: "Database migration completed successfully!",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("❌ Migration failed:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Migration failed",
            },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Use POST method to run database migration",
        instructions:
            "Send a POST request to this endpoint to create database tables",
    });
}
