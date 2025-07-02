"use client";

import { useState } from "react";

import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { demoSteps } from "@/data/features-data";

export default function InActionSection() {
	const [activeFeature, setActiveFeature] = useState(0);

	return (
		<section className="px-4 py-12 md:px-24 md:py-20">
			<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 md:rounded-[45px]">
				<CardContent className="p-8 md:p-16">
					<div className="space-y-8 md:space-y-12">
						<Heading title="In Action" />

						<div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
							<div className="space-y-4 lg:w-1/3">
								{demoSteps.map((step, index) => (
									<button
										key={index}
										className={`w-full rounded-xl p-4 text-left transition-all duration-300 md:p-6 ${
											activeFeature === index
												? "bg-lime-400 text-black"
												: "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
										}`}
										onClick={() => setActiveFeature(index)}
									>
										<div className="flex items-center gap-3">
											<div
												className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
													activeFeature === index
														? "bg-black text-lime-400"
														: "bg-zinc-700 text-gray-400"
												}`}
											>
												{index + 1}
											</div>
											<span className="text-base font-semibold md:text-lg">
												{step.step}
											</span>
										</div>
									</button>
								))}
							</div>

							<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 lg:w-2/3">
								<div className="space-y-4">
									<h4 className="text-xl font-bold text-gray-100 md:text-2xl">
										{demoSteps[activeFeature].title}
									</h4>
									<p className="text-base text-gray-400 md:text-lg">
										{demoSteps[activeFeature].description}
									</p>
									<div className="pt-4">
										<div className="rounded-lg bg-zinc-800 p-4 font-mono text-sm text-lime-400">
											{demoSteps[activeFeature].demo}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
