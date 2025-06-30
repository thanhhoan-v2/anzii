"use client";

import AppLogo from "@/components/common/app-logo";
import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import {
    BarChart3,
    Brain,
    Clock,
    FileText,
    Smartphone,
    Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeaturesPage() {
	const router = useRouter();
	const [activeFeature, setActiveFeature] = useState(0);

	const handleGetStarted = () => {
		router.push(ROUTES.DASHBOARD);
	};

	const features = [
		{
			title: "AI-Powered Flashcards",
			description:
				"Transform any content into optimized flashcards using advanced natural language processing.",
			icon: <Brain className="w-8 h-8" />,
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
			icon: <Clock className="w-8 h-8" />,
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
			icon: <BarChart3 className="w-8 h-8" />,
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
			icon: <FileText className="w-8 h-8" />,
			details: ["PDF extraction", "Image OCR", "Web article parsing"],
		},
		{
			title: "Cross-Platform Sync",
			description:
				"Seamless access across all your devices with real-time sync and offline capabilities.",
			icon: <Smartphone className="w-8 h-8" />,
			details: ["Real-time sync", "Offline mode", "Progressive web app"],
		},
		{
			title: "Adaptive Learning",
			description:
				"Personalized study recommendations based on your learning patterns.",
			icon: <Target className="w-8 h-8" />,
			details: [
				"Personalized plans",
				"Weakness identification",
				"Goal-based paths",
			],
		},
	];

	return (
		<div className="bg-black min-h-screen">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 md:px-24 py-5 md:py-10">
				<div className="space-y-5 md:space-y-12 text-center">
					<div className="space-y-4 md:space-y-6">
						<h1 className="font-bold text-gray-100 text-3xl md:text-5xl lg:text-6xl leading-tight">
							Powerful Features for Accelerated Learning
						</h1>
						<p className="mx-auto max-w-3xl text-gray-400 text-lg md:text-xl">
							Discover the cutting-edge tools and technologies that make Anzii
							the most effective learning platform.
						</p>
					</div>
				</div>
			</section>

			{/* Core Features Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<Heading title="Core Features" />
					<div className="gap-4 md:gap-8 grid grid-cols-1 lg:grid-cols-2">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="bg-zinc-950 shadow-brand-sm md:shadow-brand-md hover:shadow-brand-lg border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
							>
								<CardContent className="space-y-6 md:space-y-8 p-6 md:p-8">
									<div className="flex items-start gap-4">
										<div className="text-lime-400">{feature.icon}</div>
										<div className="flex-1 space-y-2">
											<h3 className="font-bold text-white text-lg md:text-xl">
												{feature.title}
											</h3>
											<p className="text-gray-400 text-sm md:text-base">
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
												<div className="bg-lime-400 rounded-full w-2 h-2"></div>
												<span className="text-gray-300 text-sm md:text-base">
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
			<section className="px-4 md:px-24 py-12 md:py-20">
				<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
					<CardContent className="p-8 md:p-16">
						<div className="space-y-8 md:space-y-12">
							<Heading title="See It In Action" />

							<div className="flex lg:flex-row flex-col gap-8 md:gap-12">
								<div className="space-y-4 lg:w-1/3">
									{[
										"Content Import",
										"AI Processing",
										"Smart Review",
										"Progress Tracking",
									].map((step, index) => (
										<button
											key={index}
											className={`w-full text-left p-4 md:p-6 rounded-xl transition-all duration-300 ${
												activeFeature === index
													? "bg-lime-400 text-black"
													: "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
											}`}
											onClick={() => setActiveFeature(index)}
										>
											<div className="flex items-center gap-3">
												<div
													className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
														activeFeature === index
															? "bg-black text-lime-400"
															: "bg-zinc-700 text-gray-400"
													}`}
												>
													{index + 1}
												</div>
												<span className="font-semibold text-base md:text-lg">
													{step}
												</span>
											</div>
										</button>
									))}
								</div>

								<div className="bg-zinc-900 p-6 md:p-8 border border-zinc-800 rounded-xl lg:w-2/3">
									<div className="space-y-4">
										<h4 className="font-bold text-gray-100 text-xl md:text-2xl">
											{
												[
													"Upload Your Content",
													"AI Creates Flashcards",
													"Spaced Repetition",
													"Track Your Progress",
												][activeFeature]
											}
										</h4>
										<p className="text-gray-400 text-base md:text-lg">
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
											<div className="bg-zinc-800 p-4 rounded-lg font-mono text-lime-400 text-sm">
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
			<section className="px-4 md:px-24 py-12 md:py-20">
				<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
					<CardContent className="flex lg:flex-row flex-col items-center gap-8 md:gap-12 p-8 md:p-16">
						<div className="flex-1 space-y-4 md:space-y-6 lg:text-left text-center">
							<h2 className="font-bold text-gray-100 text-2xl md:text-4xl">
								Experience the power of AI-driven learning
							</h2>
							<p className="text-gray-400 text-base md:text-lg">
								Join thousands of learners who are already using these advanced
								features to accelerate their learning and achieve better
								results.
							</p>
							<Button
								size="lg"
								className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
								onClick={handleGetStarted}
							>
								Start Using All Features
							</Button>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">⚡</div>
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
											href="/roadmap"
											className="hover:text-lime-400 transition-colors"
										>
											Roadmap
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
