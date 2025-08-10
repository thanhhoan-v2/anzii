import AppHeader from "@/components/layout/app-header";
import ExploreDecks from '@/components/sections/explore/explore.client';
import { getDecksWithCounts } from "@/lib/actions";

export default async function ExplorePage() {
	const decks = await getDecksWithCounts();

	return (
		<div className="bg-background min-h-screen font-sans text-foreground">
			<AppHeader />
			<main className="mx-auto p-4 md:p-8 container">
				<ExploreDecks decks={decks} />
			</main>
		</div>
	);
}
