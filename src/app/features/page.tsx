"use client";

import {
	BarChart3,
	Brain,
	Clock,
	FileText,
	Smartphone,
	Target,
} from "lucide-react";
import { useState } from "react";

import Heading from "@/components/common/heading";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { ButtonWithLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

export default function FeaturesPage() {
	const [activeFeature, setActiveFeature] = useState(0);

	const features = [
		{
			title: "AI-Powered Flashcards",
			description:
				"Transform any content into optimized flashcards using advanced natural language processing.",
			icon: <Brain className="h-8 w-8" />,
			details: [
				"Automatic generation",
				"Context-aware analysis",
				"Multiple question types",
			],
		},
		{
			title: "Spaced Repetition",
			description:
				"Scientifically-proven algorithm that optimizes review timing for maximum retention.",
			icon: <Clock className="h-8 w-8" />,
			details: [
				"Personalized intervals",
				"Performance-based scheduling",
				"Forgetting curve optimization",
			],
		},
		{
			title: "Smart Analytics",
			description:
				"Comprehensive insights into your learning progress with detailed statistics.",
			icon: <BarChart3 className="h-8 w-8" />,
			details: [
				"Real-time tracking",
				"Performance heat maps",
				"Retention predictions",
			],
		},
		{
			title: "Multi-Format Import",
			description:
				"Support for various content types including text, PDFs, images, and web articles.",
			icon: <FileText className="h-8 w-8" />,
			details: ["PDF extraction", "Image OCR", "Web article parsing"],
		},
		{
			title: "Cross-Platform Sync",
			description:
				"Seamless access across all your devices with real-time sync and offline capabilities.",
			icon: <Smartphone className="h-8 w-8" />,
			details: ["Real-time sync", "Offline mode", "Progressive web app"],
		},
		{
			title: "Adaptive Learning",
			description:
				"Personalized study recommendations based on your learning patterns.",
			icon: <Target className="h-8 w-8" />,
			details: [
				"Personalized plans",
				"Weakness identification",
				"Goal-based paths",
			],
		},
	];

	return (
		<div className="min-h-screen bg-black">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 py-5 md:px-24 md:py-10">
				<div className="space-y-5 text-center md:space-y-12">
					<div className="space-y-4 md:space-y-6">
						<h1 className="text-3xl font-bold leading-tight text-gray-100 md:text-5xl lg:text-6xl">
							Powerful Features for Accelerated Learning
						</h1>
						<p className="mx-auto max-w-3xl text-lg text-gray-400 md:text-xl">
							Discover the cutting-edge tools and technologies that make Anzii
							the most effective learning platform.
						</p>
					</div>
				</div>
			</section>

			{/* Core Features Section */}
			<section className="px-4 py-12 md:px-24 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<Heading title="Core Features" />
					<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm transition-all duration-300 hover:shadow-brand-lg md:rounded-[45px] md:shadow-brand-md"
							>
								<CardContent className="space-y-6 p-6 md:space-y-8 md:p-8">
									<div className="flex items-start gap-4">
										<div className="text-lime-400">{feature.icon}</div>
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
						))}
					</div>
				</div>
			</section>

			{/* Interactive Feature Demo */}
			<section className="px-4 py-12 md:px-24 md:py-20">
				<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 md:rounded-[45px]">
					<CardContent className="p-8 md:p-16">
						<div className="space-y-8 md:space-y-12">
							<Heading title="See It In Action" />

							<div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
								<div className="space-y-4 lg:w-1/3">
									{[
										"Content Import",
										"AI Processing",
										"Smart Review",
										"Progress Tracking",
									].map((step, index) => (
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
													{step}
												</span>
											</div>
										</button>
									))}
								</div>

								<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 lg:w-2/3">
									<div className="space-y-4">
										<h4 className="text-xl font-bold text-gray-100 md:text-2xl">
											{
												[
													"Upload Your Content",
													"AI Creates Flashcards",
													"Spaced Repetition",
													"Track Your Progress",
												][activeFeature]
											}
										</h4>
										<p className="text-base text-gray-400 md:text-lg">
											{
												[
													"Simply upload PDFs, paste text, or import from various sources. Our system automatically processes and structures your content.",
													"Advanced AI analyzes your content and generates intelligent flashcards with questions optimized for learning and retention.",
													"Study with scientifically-proven spaced repetition that adapts to your performance and schedules reviews at optimal intervals.",
													"Monitor your learning journey with detailed analytics, progress tracking, and personalized insights to optimize your study time.",
												][activeFeature]
											}
										</p>
										<div className="pt-4">
											<div className="rounded-lg bg-zinc-800 p-4 font-mono text-sm text-lime-400">
												{
													[
														"📄 Processing document... ✓ Content extracted successfully",
														"🤖 Generating flashcards... ✓ 25 cards created with 98% accuracy",
														"📅 Next review in 2 days... ⏰ Optimal learning interval calculated",
														"📊 Retention rate: 87% ↗️ Performance trending upward",
													][activeFeature]
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* CTA Section */}
			<section className="px-4 py-12 md:px-24 md:py-20">
				<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 md:rounded-[45px]">
					<CardContent className="flex flex-col items-center gap-8 p-8 md:gap-12 md:p-16 lg:flex-row">
						<div className="flex-1 space-y-4 text-center md:space-y-6 lg:text-left">
							<h2 className="text-2xl font-bold text-gray-100 md:text-4xl">
								Experience the power of AI-driven learning
							</h2>
							<p className="text-base text-gray-400 md:text-lg">
								Join thousands of learners who are already using these advanced
								features to accelerate their learning and achieve better
								results.
							</p>
							<ButtonWithLink href={ROUTES.SIGN_UP} className="w-fit">
								Start Using All Features
							</ButtonWithLink>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">⚡</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Footer */}
			<AppFooter />
		</div>
	);
}
