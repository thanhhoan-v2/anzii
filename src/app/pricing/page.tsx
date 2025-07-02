"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

export default function PricingPage() {
	const router = useRouter();
	const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

	const handleGetStarted = (_plan: string) => {
		router.push(ROUTES.DASHBOARD);
	};

	const plans = [
		{
			name: "Basic Plan",
			price: 0,
			period: "/month",
			features: [
				"50 AI flashcards per month",
				"Basic spaced repetition",
				"Text import only",
				"Web access",
				"Community support",
				"Basic progress tracking",
			],
			popular: false,
		},
		{
			name: "Pro Plan",
			price: 12,
			period: "/month",
			features: [
				"Includes all from the Basic Plan",
				"Unlimited AI flashcards",
				"PDF and image import",
				"Offline access",
				"Advanced analytics",
				"Priority support",
				"Custom study schedules",
			],
			popular: true,
		},
		{
			name: "Team Plan",
			price: 25,
			period: "/month",
			features: [
				"Includes all from the Pro Plan",
				"Team collaboration",
				"Shared deck libraries",
				"Admin dashboard",
				"API access",
				"Advanced team analytics",
				"Dedicated support",
			],
			popular: false,
		},
	];

	const faq = [
		{
			question: "Are there any additional fees or charges that may apply?",
			answer:
				"Our pricing plans include a comprehensive range of AI-powered learning features, including flashcard generation, spaced repetition algorithms, progress analytics, and more. We also offer custom packages that can be tailored to meet the specific needs of your learning goals.",
		},
		{
			question: "Can I change or cancel my plan at any time?",
			answer:
				"Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately and you'll only be charged for what you use.",
		},
		{
			question: "Do you offer a free trial or consultation?",
			answer:
				"Yes, we offer a 7-day free trial for Pro plans. No credit card required to start your trial. We also provide consultation calls for team plans.",
		},
		{
			question: "How do you handle billing and invoicing?",
			answer:
				"We accept all major credit cards and PayPal. Billing is automatic and you'll receive invoices via email. Annual plans can also be paid via bank transfer.",
		},
		{
			question: "Are your services guaranteed to improve learning results?",
			answer:
				"Our AI-powered spaced repetition system is based on scientifically proven learning techniques. Most users see significant improvement in retention within the first week of use.",
		},
	];

	const toggleFAQ = (index: number) => {
		setExpandedFAQ(expandedFAQ === index ? null : index);
	};

	return (
		<div className="min-h-screen bg-black">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 py-16 md:px-24 md:py-24">
				<div className="mx-auto max-w-6xl">
					<div className="space-y-6 text-center">
						<h1 className="text-5xl font-bold text-gray-100 md:text-6xl">
							Pricing
						</h1>
					</div>
				</div>
			</section>

			{/* Pricing Cards */}
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
												onClick={() => handleGetStarted(plan.name)}
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

			{/* FAQ Section */}
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

			{/* Footer */}
			<AppFooter />
		</div>
	);
}
