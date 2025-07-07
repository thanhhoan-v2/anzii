"use client";

import {
	BarChart3,
	CheckCircle2,
	Globe,
	Rocket,
	Shield,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";

// Lazy load roadmap components with loading states
const RoadmapHero = dynamic(
	() => import("@/components/sections/roadmap/roadmap-hero"),
	{
		loading: () => <LoadingSkeleton variant="hero" />,
		ssr: true,
	}
);

const RoadmapTimeline = dynamic(
	() => import("@/components/sections/roadmap/roadmap-timeline"),
	{
		loading: () => <LoadingSkeleton variant="timeline" />,
		ssr: true, // Can be SSR since it's mostly static content
	}
);

export default function RoadmapContent() {
	const roadmapItems = [
		{
			quarter: "Q1 2025",
			status: "completed",
			items: [
				{
					title: "Core Platform Launch",
					description: "Basic flashcard creation and spaced repetition system",
					icon: <CheckCircle2 className="w-6 h-6" />,
					completed: true,
				},
				{
					title: "AI-Powered Card Generation",
					description: "Automatic flashcard creation from any content",
					icon: <CheckCircle2 className="w-6 h-6" />,
					completed: true,
				},
				{
					title: "Multi-format Import",
					description: "Support for PDFs, images, and text files",
					icon: <CheckCircle2 className="w-6 h-6" />,
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
					icon: <BarChart3 className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Mobile Applications",
					description: "Native iOS and Android apps with offline sync",
					icon: <Rocket className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Collaborative Study Groups",
					description: "Share decks and study together with friends",
					icon: <Users className="w-6 h-6" />,
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
					icon: <Sparkles className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Gamification System",
					description: "Achievements, streaks, and competitive learning",
					icon: <Zap className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Enhanced Security",
					description: "Advanced privacy controls and data encryption",
					icon: <Shield className="w-6 h-6" />,
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
					icon: <Globe className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Advanced AI Features",
					description: "Voice interaction and real-time content analysis",
					icon: <Rocket className="w-6 h-6" />,
					completed: false,
				},
				{
					title: "Enterprise Solutions",
					description: "Team management and institutional features",
					icon: <Users className="w-6 h-6" />,
					completed: false,
				},
			],
		},
	];

	return (
		<div className="bg-black min-h-screen">
			<AppHeader />

			<Suspense fallback={<LoadingSkeleton variant="hero" />}>
				<RoadmapHero />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="timeline" />}>
				<RoadmapTimeline roadmapItems={roadmapItems} />
			</Suspense>

			<AppFooter />
		</div>
	);
}
