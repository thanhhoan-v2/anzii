"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Plan } from "@/data/pricing-data";

interface PricingCardsProps {
	plans: Plan[];
	onGetStarted: (plan: string) => void;
}

export default function PricingCards({
	plans,
	onGetStarted,
}: PricingCardsProps) {
	return (
		<section className="px-4 py-12 md:px-24">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{plans.map((plan, index) => (
						<Card
							key={index}
							className={`relative rounded-[25px] border-2 shadow-brand-sm transition-all duration-300 hover:shadow-brand-lg md:rounded-[45px] md:shadow-brand-md ${
								plan.popular
									? "border-lime-400 bg-lime-400"
									: "border-zinc-800 bg-zinc-950"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
									<span className="rounded-full border border-lime-400 bg-black px-4 py-1 text-sm font-semibold text-lime-400">
										Popular
									</span>
								</div>
							)}
							<CardContent className="p-6 md:p-8">
								<div className="space-y-6 md:space-y-8">
									<div className="text-center">
										<h3
											className={`text-2xl font-bold ${
												plan.popular ? "text-black" : "text-gray-100"
											}`}
										>
											{plan.name}
										</h3>
									</div>

									<div className="space-y-2 text-center">
										<div className="flex items-baseline justify-center">
											<span
												className={`text-4xl font-bold ${
													plan.popular ? "text-black" : "text-gray-100"
												}`}
											>
												${plan.price}
											</span>
											<span
												className={`ml-1 text-lg ${
													plan.popular ? "text-gray-800" : "text-gray-400"
												}`}
											>
												{plan.period}
											</span>
										</div>
									</div>

									<div className="space-y-4">
										<Button
											className={`w-full rounded-xl py-3 font-semibold ${
												plan.popular
													? "bg-black text-lime-400 hover:bg-gray-900"
													: "bg-lime-400 text-black hover:bg-lime-500"
											}`}
											onClick={() => onGetStarted(plan.name)}
										>
											Get Started
										</Button>
										<Button
											variant="outline"
											className={`w-full rounded-xl py-3 font-semibold ${
												plan.popular
													? "border-black bg-lime-400 text-black hover:bg-black hover:text-lime-400"
													: "border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
											}`}
										>
											Request a quote
										</Button>
									</div>

									<div
										className={`border-t pt-4 ${plan.popular ? "border-gray-800" : "border-zinc-800"}`}
									>
										<ul className="space-y-3">
											{plan.features.map((feature, featureIndex) => (
												<li
													key={featureIndex}
													className="flex items-start gap-3"
												>
													<Check
														className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
															plan.popular ? "text-black" : "text-lime-400"
														}`}
													/>
													<span
														className={`text-sm leading-relaxed ${
															plan.popular ? "text-gray-800" : "text-gray-300"
														}`}
													>
														{feature}
													</span>
												</li>
											))}
										</ul>
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
