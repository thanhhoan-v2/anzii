import { Button } from "@/components/ui/button";
import { FileText, Rocket, Upload } from "lucide-react";

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
			<Rocket className="mx-auto w-16 h-16 text-primary" />
			<h2 className="mt-6 font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
				Welcome to Anzii
			</h2>
			<p className="mt-4 text-muted-foreground text-lg">
				Your smart flashcard companion. Get started by creating your first deck.
			</p>
			<div className="flex flex-wrap justify-center gap-4 mt-8">
				<Button onClick={onImport} size="lg" variant="outline">
					<Upload className="mr-2" /> Import from File
				</Button>
				<Button onClick={onAiCreate} size="lg">
					<FileText className="mr-2" /> Create with AI
				</Button>
			</div>
		</div>
	);
}
