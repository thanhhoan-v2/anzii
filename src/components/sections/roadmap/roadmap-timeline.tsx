import { Calendar } from "lucide-react";

import Heading from "@/components/common/heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface RoadmapItem {
	title: string;
	description: string;
	icon: React.ReactNode;
	completed: boolean;
}

interface RoadmapQuarter {
	quarter: string;
	status: string;
	items: RoadmapItem[];
}

interface RoadmapTimelineProps {
	roadmapItems: RoadmapQuarter[];
}

export default function RoadmapTimeline({
	roadmapItems,
}: RoadmapTimelineProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "in-progress":
				return "bg-lime-400";
			case "planned":
				return "bg-gray-500";
			default:
				return "bg-gray-500";
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "completed":
				return "Completed";
			case "in-progress":
				return "In Progress";
			case "planned":
				return "Planned";
			default:
				return "Planned";
		}
	};

	return (
		<section className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="Development Timeline" />

				<div className="space-y-8 md:space-y-12">
					{roadmapItems.map((quarter, quarterIndex) => (
						<Card
							key={quarterIndex}
							className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm md:rounded-[45px] md:shadow-brand-md"
						>
							<CardContent className="p-6 md:p-8">
								<div className="space-y-6 md:space-y-8">
									{/* Quarter Header */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4">
											<Calendar className="h-6 w-6 text-lime-400" />
											<h3 className="text-xl font-bold text-white md:text-2xl">
												{quarter.quarter}
											</h3>
										</div>
										<Badge
											variant="secondary"
											className={`${getStatusColor(
												quarter.status
											)} font-semibold text-black`}
										>
											{getStatusText(quarter.status)}
										</Badge>
									</div>

									{/* Quarter Items */}
									<div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
										{quarter.items.map((item, itemIndex) => (
											<div
												key={itemIndex}
												className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:p-6"
											>
												<div className="flex items-start gap-3">
													<div
														className={`${
															item.completed
																? "text-green-400"
																: "text-gray-400"
														}`}
													>
														{item.icon}
													</div>
													<div className="flex-1 space-y-2">
														<h4 className="text-base font-semibold text-white md:text-lg">
															{item.title}
														</h4>
														<p className="text-sm text-gray-400 md:text-base">
															{item.description}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
