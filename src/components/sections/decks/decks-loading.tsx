import { Loader2 } from "lucide-react";

export default function DecksLoading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Loader2 className="h-8 w-8 animate-spin" />
			<p className="ml-4">Loading decks...</p>
		</div>
	);
}
