"use client";

import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
	const router = useRouter();
	const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

	const handleGetStarted = (plan: string) => {
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
		<div className="bg-black min-h-screen">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 md:px-24 py-16 md:py-24">
				<div className="mx-auto max-w-6xl">
					<div className="space-y-6 text-center">
						<h1 className="font-bold text-gray-100 text-4xl md:text-6xl">
							Pricing
						</h1>
						<p className="mx-auto max-w-2xl text-gray-400 text-xl md:text-2xl">
							Elevate Your Learning Experience: Competitive Pricing for
							Exceptional Results
						</p>
					</div>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="px-4 md:px-24 py-12">
				<div className="mx-auto max-w-6xl">
					<div className="gap-6 grid grid-cols-1 md:grid-cols-3">
						{plans.map((plan, index) => (
							<Card
								key={index}
								className={`relative rounded-[25px] md:rounded-[45px] border-2 transition-all duration-300 shadow-brand-sm md:shadow-brand-md hover:shadow-brand-lg ${
									plan.popular
										? "bg-lime-400 border-lime-400"
										: "bg-zinc-950 border-zinc-800"
								}`}
							>
								{plan.popular && (
									<div className="-top-3 left-1/2 absolute -translate-x-1/2 transform">
										<span className="bg-black px-4 py-1 border border-lime-400 rounded-full font-semibold text-lime-400 text-sm">
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
											<div className="flex justify-center items-baseline">
												<span
													className={`text-4xl font-bold ${
														plan.popular ? "text-black" : "text-gray-100"
													}`}
												>
													${plan.price}
												</span>
												<span
													className={`text-lg ml-1 ${
														plan.popular ? "text-gray-800" : "text-gray-400"
													}`}
												>
													{plan.period}
												</span>
											</div>
										</div>

										<div className="space-y-4">
											<Button
												className={`w-full py-3 rounded-xl font-semibold ${
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
												className={`w-full py-3 rounded-xl font-semibold ${
													plan.popular
														? "border-black bg-lime-400 text-black hover:bg-black hover:text-lime-400"
														: "border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
												}`}
											>
												Request a quote
											</Button>
										</div>

										<div
											className={`pt-4 border-t ${plan.popular ? "border-gray-800" : "border-zinc-800"}`}
										>
											<ul className="space-y-3">
												{plan.features.map((feature, featureIndex) => (
													<li
														key={featureIndex}
														className="flex items-start gap-3"
													>
														<Check
															className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
			<section className="px-4 md:px-24 py-16">
				<div className="mx-auto max-w-4xl">
					<div className="space-y-8">
						<div className="text-center">
							<h2 className="inline-block bg-lime-400 px-6 py-2 rounded-lg font-bold text-black text-2xl">
								Frequently Asked Questions
							</h2>
						</div>

						<div className="space-y-4">
							{faq.map((item, index) => (
								<Card
									key={index}
									className="bg-zinc-950 border-2 border-zinc-800 rounded-[25px] overflow-hidden"
								>
									<CardContent className="p-0">
										<button
											onClick={() => toggleFAQ(index)}
											className="hover:bg-zinc-900 p-6 w-full text-left transition-colors"
										>
											<div className="flex justify-between items-center">
												<span className="pr-4 font-semibold text-gray-100 text-lg">
													{item.question}
												</span>
												{expandedFAQ === index ? (
													<ChevronUp className="flex-shrink-0 w-6 h-6 text-lime-400" />
												) : (
													<ChevronDown className="flex-shrink-0 w-6 h-6 text-lime-400" />
												)}
											</div>
										</button>
										{expandedFAQ === index && (
											<div className="px-6 pb-6">
												<div className="pt-4 border-zinc-800 border-t">
													<p className="text-gray-400 leading-relaxed">
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
