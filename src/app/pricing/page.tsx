"use client";

import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/app-header";
import AppLogo from "@/components/layout/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Crown, Star, X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
	const router = useRouter();
	const [isAnnual, setIsAnnual] = useState(false);

	const handleGetStarted = (plan: string) => {
		router.push("/dashboard");
	};

	const plans = [
		{
			name: "Free",
			description: "Perfect for getting started with AI-powered learning",
			price: { monthly: 0, annual: 0 },
			icon: <Zap className="w-6 h-6" />,
			features: [
				"50 AI-generated flashcards/month",
				"Basic spaced repetition",
				"Text import only",
				"Web access",
				"Basic progress tracking",
				"Community support",
			],
			limitations: [
				"Limited to 1 deck",
				"No PDF import",
				"No offline access",
				"No advanced analytics",
			],
			cta: "Start Free",
			popular: false,
			bgColor: "bg-zinc-950",
			borderColor: "border-zinc-800",
		},
		{
			name: "Pro",
			description: "For serious learners who want the full experience",
			price: { monthly: 12, annual: 8 },
			icon: <Star className="w-6 h-6" />,
			features: [
				"Unlimited AI flashcards",
				"Advanced spaced repetition",
				"PDF & image import",
				"Offline access",
				"Detailed analytics",
				"Priority support",
				"Custom study schedules",
				"Export capabilities",
			],
			limitations: [],
			cta: "Start Pro Trial",
			popular: true,
			bgColor: "bg-lime-400",
			borderColor: "border-lime-400",
		},
		{
			name: "Team",
			description: "Collaborative learning for teams and organizations",
			price: { monthly: 25, annual: 20 },
			icon: <Crown className="w-6 h-6" />,
			features: [
				"Everything in Pro",
				"Team collaboration",
				"Shared deck libraries",
				"Admin dashboard",
				"Usage analytics",
				"API access",
				"Custom integrations",
				"Dedicated support",
			],
			limitations: [],
			cta: "Contact Sales",
			popular: false,
			bgColor: "bg-zinc-950",
			borderColor: "border-zinc-800",
		},
	];

	const faq = [
		{
			question: "Can I change plans anytime?",
			answer:
				"Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.",
		},
		{
			question: "Is there a free trial for Pro plans?",
			answer:
				"Yes, we offer a 7-day free trial for Pro plans. No credit card required to start your trial.",
		},
		{
			question: "What payment methods do you accept?",
			answer:
				"We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.",
		},
		{
			question: "Do you offer student discounts?",
			answer:
				"Yes! Students get 50% off Pro plans with a valid student email address. Contact support to verify your status.",
		},
		{
			question: "What happens to my data if I cancel?",
			answer:
				"Your data remains accessible for 30 days after cancellation. You can export all your flashcards and progress data.",
		},
		{
			question: "Is there volume pricing for large teams?",
			answer:
				"Yes, we offer custom pricing for teams of 50+ users. Contact our sales team for a personalized quote.",
		},
	];

	return (
		<div className="bg-black min-h-screen">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12 text-center">
					<div className="space-y-4 md:space-y-6">
						<h1 className="font-bold text-gray-100 text-3xl md:text-5xl lg:text-6xl leading-tight">
							Simple, Transparent Pricing
						</h1>
						<p className="mx-auto max-w-3xl text-gray-400 text-lg md:text-xl">
							Choose the perfect plan for your learning journey. Start free,
							upgrade when you need more power.
						</p>
					</div>

					{/* Annual/Monthly Toggle */}
					<div className="flex justify-center items-center gap-4">
						<span
							className={`text-base md:text-lg ${!isAnnual ? "text-gray-100" : "text-gray-400"}`}
						>
							Monthly
						</span>
						<button
							onClick={() => setIsAnnual(!isAnnual)}
							className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
								isAnnual ? "bg-lime-400" : "bg-zinc-700"
							}`}
						>
							<div
								className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
									isAnnual ? "translate-x-8" : "translate-x-1"
								}`}
							/>
						</button>
						<span
							className={`text-base md:text-lg ${isAnnual ? "text-gray-100" : "text-gray-400"}`}
						>
							Annual
						</span>
						{isAnnual && (
							<span className="bg-lime-400 px-2 py-1 rounded-full font-semibold text-black text-sm">
								Save 33%
							</span>
						)}
					</div>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="gap-4 md:gap-8 grid grid-cols-1 lg:grid-cols-3">
					{plans.map((plan, index) => (
						<Card
							key={index}
							className={`${plan.bgColor} ${plan.borderColor} border rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300 ${
								plan.popular
									? "ring-2 ring-lime-400 shadow-[0_5px_0_0_rgba(163,230,53,0.4)]"
									: "shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] hover:shadow-[0_5px_0_0_rgba(163,230,53,0.4)]"
							}`}
						>
							<CardContent className="space-y-6 md:space-y-8 p-6 md:p-8">
								{plan.popular && (
									<div className="bg-black px-4 py-2 rounded-full font-semibold text-lime-400 text-sm text-center">
										Most Popular
									</div>
								)}

								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<div
											className={`${plan.name === "Pro" ? "text-black" : "text-lime-400"}`}
										>
											{plan.icon}
										</div>
										<h3
											className={`font-bold text-xl md:text-2xl ${plan.name === "Pro" ? "text-black" : "text-gray-100"}`}
										>
											{plan.name}
										</h3>
									</div>
									<p
										className={`text-sm md:text-base ${plan.name === "Pro" ? "text-gray-800" : "text-gray-400"}`}
									>
										{plan.description}
									</p>
								</div>

								<div className="space-y-2">
									<div className="flex items-baseline gap-2">
										<span
											className={`font-bold text-3xl md:text-4xl ${plan.name === "Pro" ? "text-black" : "text-gray-100"}`}
										>
											${isAnnual ? plan.price.annual : plan.price.monthly}
										</span>
										<span
											className={`text-sm md:text-base ${plan.name === "Pro" ? "text-gray-700" : "text-gray-400"}`}
										>
											/month
										</span>
									</div>
									{isAnnual && plan.price.monthly > 0 && (
										<p
											className={`text-xs md:text-sm ${plan.name === "Pro" ? "text-gray-600" : "text-gray-500"}`}
										>
											Billed annually (${plan.price.annual * 12}/year)
										</p>
									)}
								</div>

								<Button
									className={`w-full py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg ${
										plan.name === "Pro"
											? "bg-black text-lime-400 hover:bg-gray-900"
											: "bg-lime-400 text-black hover:bg-lime-500"
									}`}
									onClick={() => handleGetStarted(plan.name)}
								>
									{plan.cta}
								</Button>

								<div className="space-y-3">
									<h4
										className={`font-semibold text-base md:text-lg ${plan.name === "Pro" ? "text-black" : "text-gray-100"}`}
									>
										What's included:
									</h4>
									<ul className="space-y-2">
										{plan.features.map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-center gap-3"
											>
												<Check
													className={`w-4 h-4 flex-shrink-0 ${plan.name === "Pro" ? "text-black" : "text-lime-400"}`}
												/>
												<span
													className={`text-sm md:text-base ${plan.name === "Pro" ? "text-gray-800" : "text-gray-300"}`}
												>
													{feature}
												</span>
											</li>
										))}
									</ul>

									{plan.limitations.length > 0 && (
										<ul className="space-y-2 pt-2">
											{plan.limitations.map((limitation, limitationIndex) => (
												<li
													key={limitationIndex}
													className="flex items-center gap-3"
												>
													<X className="flex-shrink-0 w-4 h-4 text-red-400" />
													<span
														className={`text-sm md:text-base ${plan.name === "Pro" ? "text-gray-600" : "text-gray-500"}`}
													>
														{limitation}
													</span>
												</li>
											))}
										</ul>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* FAQ Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="space-y-4 text-center">
						<Heading size="2xl md:3xl">Frequently Asked Questions</Heading>
						<p className="mx-auto max-w-2xl text-gray-400 text-base md:text-lg">
							Everything you need to know about our pricing and plans.
						</p>
					</div>

					<div className="space-y-4 md:space-y-6 mx-auto max-w-3xl">
						{faq.map((item, index) => (
							<Card
								key={index}
								className="bg-zinc-950 border border-zinc-800 rounded-[15px] md:rounded-[25px] overflow-hidden"
							>
								<CardContent className="space-y-3 md:space-y-4 p-6 md:p-8">
									<h4 className="font-bold text-gray-100 text-lg md:text-xl">
										{item.question}
									</h4>
									<p className="text-gray-400 text-base md:text-lg leading-relaxed">
										{item.answer}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
					<CardContent className="flex lg:flex-row flex-col items-center gap-8 md:gap-12 p-8 md:p-16">
						<div className="flex-1 space-y-4 md:space-y-6 lg:text-left text-center">
							<h2 className="font-bold text-gray-100 text-2xl md:text-4xl">
								Ready to supercharge your learning?
							</h2>
							<p className="text-gray-400 text-base md:text-lg">
								Start with our free plan and upgrade when you're ready for more
								power. Join thousands of learners already using Anzii to achieve
								their goals.
							</p>
							<Button
								size="lg"
								className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
								onClick={() => handleGetStarted("Free")}
							>
								Start Learning for Free
							</Button>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">🚀</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Footer */}
			<footer className="px-4 md:px-24 py-8 md:py-16">
				<Card className="bg-black border border-zinc-800 rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
					<CardContent className="space-y-8 md:space-y-12 p-8 md:p-16">
						<div className="flex lg:flex-row flex-col gap-8 md:gap-12">
							<div className="flex-1 space-y-6 md:space-y-8">
								<div className="flex md:flex-row flex-col items-start md:items-center gap-6 md:gap-8">
									<div className="text-white">
										<AppLogo />
									</div>
									<div className="flex flex-wrap gap-4 md:gap-8 text-gray-400 text-sm md:text-base">
										<a
											href="/features"
											className="hover:text-lime-400 transition-colors"
										>
											Features
										</a>
										<a
											href="/pricing"
											className="hover:text-lime-400 transition-colors"
										>
											Pricing
										</a>
										<a
											href="/about-us"
											className="hover:text-lime-400 transition-colors"
										>
											About
										</a>
										<a
											href="/contact"
											className="hover:text-lime-400 transition-colors"
										>
											Contact
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-6 md:pt-8 border-zinc-800 border-t">
							<p className="text-gray-500 text-sm md:text-base">
								© 2024 Anzii. All Rights Reserved.
							</p>
							<p className="text-gray-500 hover:text-lime-400 text-sm md:text-base transition-colors cursor-pointer">
								Privacy Policy
							</p>
						</div>
					</CardContent>
				</Card>
			</footer>
		</div>
	);
}
