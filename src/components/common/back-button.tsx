import { ArrowUpLeftIcon } from "lucide-react";

import { ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export default function BackButton({
	goBackTo = "dashboard",
}: {
	goBackTo?: string;
}) {
	let goBackToRoute = ROUTES.DECKS;
	let goBackToLabel = "Dashboard";

	if (goBackTo === "dashboard") {
		goBackToRoute = ROUTES.DECKS;
		goBackToLabel = "Dashboard";
	}

	return (
		<ButtonWithLink href={goBackToRoute} className="w-fit">
			<ArrowUpLeftIcon className="bg-black text-white" />
			{goBackToLabel}
		</ButtonWithLink>
	);
}
