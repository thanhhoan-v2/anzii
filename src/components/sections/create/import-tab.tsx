"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addCard, createDeck } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";

export default function ImportTab() {
	const router = useRouter();
	const { toast } = useToast();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// File import state
	const [isImporting, setIsImporting] = useState(false);

	const handleFileImport = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.type !== "application/json") {
			toast({
				variant: "destructive",
				title: "Invalid File Type",
				description: "Please select a JSON file.",
			});
			return;
		}

		setIsImporting(true);
		try {
			const text = await file.text();
			const data = JSON.parse(text);

			// Validate the JSON structure
			if (!data.name || !Array.isArray(data.cards)) {
				throw new Error("Invalid deck format");
			}

			// Create the deck
			const deckResult = await createDeck({ name: data.name });
			if (!deckResult.success) {
				throw new Error(deckResult.error);
			}

			// Add all cards
			for (const card of data.cards) {
				if (card.question && card.answer) {
					await addCard({
						deckId: deckResult.deckId!,
						question: card.question,
						answer: card.answer,
					});
				}
			}

			toast({
				title: "Import Successful!",
				description: `Imported "${data.name}" with ${data.cards.length} cards.`,
			});
			router.push(ROUTES.HOME);
		} catch {
			toast({
				variant: "destructive",
				title: "Import Failed",
				description: "Could not import the file. Please check the format.",
			});
		} finally {
			setIsImporting(false);
			// Reset the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Upload className="w-5 h-5" />
					Import from File
				</CardTitle>
				<CardDescription>
					Import a deck from a JSON file with the following format:
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="bg-muted p-4 rounded-lg">
					<pre className="text-muted-foreground [&_*]:text-muted-foreground text-sm">
						{`{
  "name": "My Deck",
  "cards": [
    {
      "question": "What is the capital of France?",
      "answer": "Paris"
    },
    {
      "question": "What is 2 + 2?",
      "answer": "4"
    }
  ]
}`}
					</pre>
				</div>

				<Button
					onClick={handleFileImport}
					disabled={isImporting}
					className="w-full"
				>
					{isImporting ? (
						<>
							<Loader2 className="mr-2 w-4 h-4 animate-spin" />
							Importing...
						</>
					) : (
						<>
							<Upload className="mr-2 w-4 h-4" />
							Select JSON File
						</>
					)}
				</Button>

				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept=".json"
					className="hidden"
				/>
			</CardContent>
		</Card>
	);
}
