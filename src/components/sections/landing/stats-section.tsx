import { BookOpen, Star, Target, WandSparkles } from "lucide-react";

const statsData = [
	{ Icon: WandSparkles, label: "AI-powered" },
	{ Icon: BookOpen, label: "Easy to use" },
	{ Icon: Star, label: "Rating" },
	{ Icon: Target, label: "Retention rate" },
];

export default function FeatureSummarySection() {
	return (
		<section className="px-4 py-4 md:px-24 md:py-8">
			<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 opacity-60 md:gap-8 md:text-lg">
				{statsData.map((stat, index) => (
					<div key={index} className="flex items-center gap-2">
						<stat.Icon className="h-4 w-4 md:h-5 md:w-5" />
						<span>{stat.label}</span>
					</div>
				))}
			</div>
		</section>
	);
}
