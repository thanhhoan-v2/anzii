import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData } from "@/data/features-data";

export default function CoreFeaturesSection() {
	return (
		<section className="px-4 py-8 md:px-24 md:py-10">
			<div className="space-y-8 md:space-y-12">
				<Heading title="Core Features" />
				<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
					{featuresData.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<Card
								key={index}
								className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm transition-all duration-300 hover:shadow-brand-lg md:rounded-[45px] md:shadow-brand-md"
							>
								<CardContent className="space-y-6 p-6 md:space-y-8 md:p-8">
									<div className="flex items-start gap-4">
										<div className="text-lime-400">
											<IconComponent className="h-8 w-8" />
										</div>
										<div className="flex-1 space-y-2">
											<h3 className="text-lg font-bold text-white md:text-xl">
												{feature.title}
											</h3>
											<p className="text-sm text-gray-400 md:text-base">
												{feature.description}
											</p>
										</div>
									</div>
									<div className="space-y-2">
										{feature.details.map((detail, detailIndex) => (
											<div
												key={detailIndex}
												className="flex items-center gap-3"
											>
												<div className="h-2 w-2 rounded-full bg-lime-400"></div>
												<span className="text-sm text-gray-300 md:text-base">
													{detail}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
