import { FileText, Rocket, Upload, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
	onImport: () => void;
	onAiCreate: () => void;
}

export default function WelcomeScreen({
	onImport,
	onAiCreate,
}: WelcomeScreenProps) {
	return (
		<div className="px-4 py-16 text-center">
			<Rocket className="mx-auto h-16 w-16 text-primary" />
			<h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				Welcome to Anzii
			</h2>
			<p className="mt-4 text-lg text-muted-foreground">
				Your smart flashcard companion. Get started by creating your first deck.
			</p>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				<Button asChild size="lg">
					<Link href="/create">
						<Zap className="mr-2" /> Create Cards
					</Link>
				</Button>
				<Button onClick={onImport} size="lg" variant="outline">
					<Upload className="mr-2" /> Import from File
				</Button>
				<Button onClick={onAiCreate} size="lg" variant="outline">
					<FileText className="mr-2" /> Quick AI
				</Button>
			</div>
		</div>
	);
}
