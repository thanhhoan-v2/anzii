"use client";

import {
	BarChart3,
	Calendar,
	CheckCircle2,
	Globe,
	Rocket,
	Shield,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";

import Heading from "@/components/common/heading";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function RoadmapPage() {
	const roadmapItems = [
		{
			quarter: "Q1 2025",
			status: "completed",
			items: [
				{
					title: "Core Platform Launch",
					description: "Basic flashcard creation and spaced repetition system",
					icon: <CheckCircle2 className="h-6 w-6" />,
					completed: true,
				},
				{
					title: "AI-Powered Card Generation",
					description: "Automatic flashcard creation from any content",
					icon: <CheckCircle2 className="h-6 w-6" />,
					completed: true,
				},
				{
					title: "Multi-format Import",
					description: "Support for PDFs, images, and text files",
					icon: <CheckCircle2 className="h-6 w-6" />,
					completed: true,
				},
			],
		},
		{
			quarter: "Q2 2025",
			status: "in-progress",
			items: [
				{
					title: "Advanced Analytics Dashboard",
					description: "Detailed learning insights and progress tracking",
					icon: <BarChart3 className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Mobile Applications",
					description: "Native iOS and Android apps with offline sync",
					icon: <Rocket className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Collaborative Study Groups",
					description: "Share decks and study together with friends",
					icon: <Users className="h-6 w-6" />,
					completed: false,
				},
			],
		},
		{
			quarter: "Q3 2025",
			status: "planned",
			items: [
				{
					title: "AI Study Assistant",
					description: "Personalized study recommendations and coaching",
					icon: <Sparkles className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Gamification System",
					description: "Achievements, streaks, and competitive learning",
					icon: <Zap className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Enhanced Security",
					description: "Advanced privacy controls and data encryption",
					icon: <Shield className="h-6 w-6" />,
					completed: false,
				},
			],
		},
		{
			quarter: "Q4 2025",
			status: "planned",
			items: [
				{
					title: "Global Marketplace",
					description: "Community-driven deck sharing and discovery",
					icon: <Globe className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Advanced AI Features",
					description: "Voice interaction and real-time content analysis",
					icon: <Rocket className="h-6 w-6" />,
					completed: false,
				},
				{
					title: "Enterprise Solutions",
					description: "Team management and institutional features",
					icon: <Users className="h-6 w-6" />,
					completed: false,
				},
			],
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "in-progress":
				return "bg-lime-400";
			case "planned":
				return "bg-gray-500";
			default:
				return "bg-gray-500";
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "completed":
				return "Completed";
			case "in-progress":
				return "In Progress";
			case "planned":
				return "Planned";
			default:
				return "Planned";
		}
	};

	return (
		<div className="min-h-screen bg-black">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 py-12 md:px-24 md:py-20">
				<div className="space-y-8 text-center md:space-y-12">
					<div className="space-y-4 md:space-y-6">
						<h1 className="text-3xl font-bold leading-tight text-gray-100 md:text-5xl lg:text-6xl">
							Product Roadmap
						</h1>
						<p className="mx-auto max-w-3xl text-lg text-gray-400 md:text-xl">
							See what we&apos;re building and what&apos;s coming next. Our
							roadmap is driven by your feedback and the future of AI-powered
							learning.
						</p>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="px-4 py-12 md:px-24 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<Heading title="Development Timeline" />

					<div className="space-y-8 md:space-y-12">
						{roadmapItems.map((quarter, quarterIndex) => (
							<Card
								key={quarterIndex}
								className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm md:rounded-[45px] md:shadow-brand-md"
							>
								<CardContent className="p-6 md:p-8">
									<div className="space-y-6 md:space-y-8">
										{/* Quarter Header */}
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<Calendar className="h-6 w-6 text-lime-400" />
												<h3 className="text-xl font-bold text-white md:text-2xl">
													{quarter.quarter}
												</h3>
											</div>
											<Badge
												variant="secondary"
												className={`${getStatusColor(
													quarter.status
												)} font-semibold text-black`}
											>
												{getStatusText(quarter.status)}
											</Badge>
										</div>

										{/* Quarter Items */}
										<div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
											{quarter.items.map((item, itemIndex) => (
												<div
													key={itemIndex}
													className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:p-6"
												>
													<div className="flex items-start gap-3">
														<div
															className={`${
																item.completed
																	? "text-green-400"
																	: "text-gray-400"
															}`}
														>
															{item.icon}
														</div>
														<div className="flex-1 space-y-2">
															<h4 className="text-base font-semibold text-white md:text-lg">
																{item.title}
															</h4>
															<p className="text-sm text-gray-400 md:text-base">
																{item.description}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<AppFooter />
		</div>
	);
}
