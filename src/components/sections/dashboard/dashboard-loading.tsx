import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Loader2 className="w-8 h-8 animate-spin" />
			<p className="ml-4">Loading decks...</p>
		</div>
	);
}
