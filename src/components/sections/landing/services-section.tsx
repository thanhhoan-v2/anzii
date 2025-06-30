import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/landing-data";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
	return (
		<section id="services" className="px-4 md:px-24 py-12 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="Features" />

				<div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
					{services.map((service, serviceIndex) => (
						<Card
							key={`service-${serviceIndex}`}
							className="bg-zinc-950 shadow-brand-sm md:shadow-brand-md hover:shadow-brand-lg border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
						>
							<CardContent className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 p-6 md:p-12">
								<div className="flex-1 space-y-4 md:space-y-6">
									<div className="space-y-1 md:space-y-2">
										{service.title.map((line, lineIndex) => (
											<Heading title={line} />
										))}
									</div>
									<div className="flex items-center gap-3">
										<div className="flex justify-center items-center bg-lime-400 rounded-full w-8 md:w-10 h-8 md:h-10">
											<ArrowRight className="w-4 md:w-5 h-4 md:h-5 text-black" />
										</div>
										<span className="font-medium text-lime-300 text-sm md:text-base">
											Learn more
										</span>
									</div>
								</div>
								<div className="opacity-80 text-4xl md:text-6xl">
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
