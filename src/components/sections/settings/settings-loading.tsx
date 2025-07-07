import { Loader2 } from "lucide-react";

import AppHeader from "@/components/layout/app-header";

export default function SettingsLoading() {
	return (
		<div className="bg-black min-h-screen">
			<AppHeader />
			<div className="flex flex-col justify-center items-center h-96">
				<Loader2 className="mb-4 w-12 h-12 text-lime-400 animate-spin" />
				<h2 className="mb-2 font-semibold text-gray-300 text-xl">
					Loading Settings
				</h2>
				<p className="text-gray-500">Fetching your account information...</p>
			</div>
		</div>
	);
}
