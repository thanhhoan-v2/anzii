"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function MigratePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const runMigration = async () => {
		setIsLoading(true);
		setResult(null);
		setError(null);

		try {
			const response = await fetch("/api/migrate", {
				method: "POST",
			});

			const data = await response.json();

			if (response.ok) {
				setResult(data.message);
			} else {
				setError(data.error || "Migration failed");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Network error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto p-8 max-w-2xl container">
			<Card>
				<CardHeader>
					<CardTitle>🗃️ Database Migration</CardTitle>
					<CardDescription>
						Create the required database tables in production
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
						<p className="text-yellow-800 text-sm">
							<strong>⚠️ Important:</strong> This should only be run once to set
							up your production database tables.
						</p>
					</div>

					<Button
						onClick={runMigration}
						disabled={isLoading}
						className="w-full"
					>
						{isLoading ? "Running Migration..." : "Run Database Migration"}
					</Button>

					{result && (
						<div className="bg-green-50 p-4 border border-green-200 rounded-lg">
							<p className="text-green-800">
								<strong>✅ Success:</strong> {result}
							</p>
						</div>
					)}

					{error && (
						<div className="bg-red-50 p-4 border border-red-200 rounded-lg">
							<p className="text-red-800">
								<strong>❌ Error:</strong> {error}
							</p>
						</div>
					)}

					<div className="space-y-2 text-muted-foreground text-sm">
						<p>
							<strong>What this does:</strong>
						</p>
						<ul className="space-y-1 list-disc list-inside">
							<li>Creates the "decks" table</li>
							<li>Creates the "cards" table</li>
							<li>Sets up foreign key relationships</li>
						</ul>
						<p className="mt-4">
							<strong>After migration:</strong> Your app will be able to store
							and retrieve flashcard data.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
