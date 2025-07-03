"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { FAQItem } from "@/data/pricing-data";

interface PricingFAQProps {
	faq: FAQItem[];
}

export default function PricingFAQ({ faq }: PricingFAQProps) {
	const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setExpandedFAQ(expandedFAQ === index ? null : index);
	};

	return (
		<section className="px-4 py-16 md:px-24">
			<div className="mx-auto max-w-4xl">
				<div className="space-y-8">
					<div className="text-center">
						<h2 className="inline-block rounded-lg bg-lime-400 px-6 py-2 text-2xl font-bold text-black">
							Frequently Asked Questions
						</h2>
					</div>

					<div className="space-y-4">
						{faq.map((item, index) => (
							<Card
								key={index}
								className="overflow-hidden rounded-[25px] border-2 border-zinc-800 bg-zinc-950"
							>
								<CardContent className="p-0">
									<button
										onClick={() => toggleFAQ(index)}
										className="w-full p-6 text-left transition-colors hover:bg-zinc-900"
									>
										<div className="flex items-center justify-between">
											<span className="pr-4 text-lg font-semibold text-gray-100">
												{item.question}
											</span>
											{expandedFAQ === index ? (
												<ChevronUp className="h-6 w-6 flex-shrink-0 text-lime-400" />
											) : (
												<ChevronDown className="h-6 w-6 flex-shrink-0 text-lime-400" />
											)}
										</div>
									</button>
									{expandedFAQ === index && (
										<div className="px-6 pb-6">
											<div className="border-t border-zinc-800 pt-4">
												<p className="leading-relaxed text-gray-400">
													{item.answer}
												</p>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
