import { LucideIcon } from "lucide-react";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsCardHeaderProps {
	title: string;
	description: string;
	icon: LucideIcon;
	iconColor?: string;
	iconBgColor?: string;
}

export function SettingsCardHeader({
	title,
	description,
	icon: Icon,
	iconColor = "text-primary",
	iconBgColor = "bg-primary/10",
}: SettingsCardHeaderProps) {
	return (
		<CardHeader className="pb-4">
			<CardTitle className="flex items-center gap-3 text-gray-100">
				<div className={`rounded-lg p-2 ${iconBgColor}`}>
					<Icon className={`h-5 w-5 ${iconColor}`} />
				</div>
				{title}
			</CardTitle>
			<CardDescription className="text-gray-400">{description}</CardDescription>
		</CardHeader>
	);
}
