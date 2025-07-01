import { ArrowRight } from "lucide-react";

import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/landing-data";

export default function ServicesSection() {
	return (
		<section id="services" className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="Features" />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
					{services.map((service, serviceIndex) => (
						<Card
							key={`service-${serviceIndex}`}
							className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm transition-all duration-300 hover:shadow-brand-lg md:rounded-[45px] md:shadow-brand-md"
						>
							<CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center md:p-12">
								<div className="flex-1 space-y-4 md:space-y-6">
									<div className="space-y-1 md:space-y-2">
										{service.title.map((line, lineIndex) => (
											<Heading key={lineIndex} title={line} />
										))}
									</div>
									<div className="flex items-center gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 md:h-10 md:w-10">
											<ArrowRight className="h-4 w-4 text-black md:h-5 md:w-5" />
										</div>
										<span className="text-sm font-medium text-lime-300 md:text-base">
											Learn more
										</span>
									</div>
								</div>
								<div className="text-4xl opacity-80 md:text-6xl">
									{service.illustration}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
