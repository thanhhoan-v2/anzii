import BackButton from "@/components/common/back-button";
import AppHeader from "@/components/layout/app-header";
import { CreateTabs } from "@/components/sections/create";

export default function Page() {
	return (
		<div className="bg-background min-h-screen text-foreground">
			<AppHeader>
				<BackButton />
			</AppHeader>

			<main className="mx-auto p-4 md:p-8 max-w-4xl container">
				<CreateTabs />
			</main>
		</div>
	);
}
