import { ColorSchemeSelector } from "@/components/common/ColorSchemeSelector";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AppLogo from "./AppLogo";

export default function AppHeader() {
	return (
		<header className="p-4 border-b">
			<div className="flex justify-between items-center mx-auto container">
				<AppLogo />
				<div className="flex items-center gap-4">
					<div className="flex gap-2">
						<Button asChild>
							<Link href="/create">
								<PlusIcon /> Create
							</Link>
						</Button>
					</div>
					<div className="flex items-center gap-2">
						<ColorSchemeSelector />
					</div>
				</div>
			</div>
		</header>
	);
}
