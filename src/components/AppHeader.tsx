import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { PlusCircle, Rocket, Upload } from "lucide-react";
import Link from "next/link";

interface AppHeaderProps {
	hasDecks: boolean;
	sessionInProgress: boolean;
	onImportClick: () => void;
	onCreateDeck: () => void;
}

export default function AppHeader({
	hasDecks,
	sessionInProgress,
	onImportClick,
	onCreateDeck,
}: AppHeaderProps) {
	return (
		<header className="p-4 border-b">
			<div className="flex justify-between items-center mx-auto container">
				<Link
					href="/"
					className="flex items-center gap-2 hover:scale-105 transition-transform"
				>
					<Rocket className="w-8 h-8 text-primary" />
					<h1 className="font-bold text-2xl tracking-tight">Anzii</h1>
				</Link>
				<div className="flex items-center gap-4">
					{hasDecks && !sessionInProgress && (
						<div className="flex gap-2">
							<Button onClick={onImportClick} variant="outline">
								<Upload /> Import
							</Button>
							<Button onClick={onCreateDeck}>
								<PlusCircle /> Create Deck
							</Button>
						</div>
					)}
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
