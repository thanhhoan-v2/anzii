"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { useLandingPageState } from "@/hooks/use-landing-page-state";

// Lazy load landing sections with loading states
const HeroSection = dynamic(
	() => import("@/components/sections/landing/hero-section"),
	{
		loading: () => <LoadingSkeleton variant="hero" />,
		ssr: true,
	}
);

const HowItWorksSection = dynamic(
	() => import("@/components/sections/landing/how-it-works-section"),
	{
		loading: () => <LoadingSkeleton variant="features" />,
		ssr: false, // Client-side only due to interactive state
	}
);

const TestimonialsSection = dynamic(
	() => import("@/components/sections/landing/testimonials-section"),
	{
		loading: () => <LoadingSkeleton variant="cards" />,
		ssr: true,
	}
);

const CTASection = dynamic(
	() => import("@/components/sections/landing/cta-section"),
	{
		loading: () => <LoadingSkeleton variant="cards" />,
		ssr: true,
	}
);

export default function LandingPage() {
	const { activeProcess, setActiveProcess, handleGetStarted } =
		useLandingPageState();

	return (
		<div className="min-h-screen bg-black">
			<AppHeader />

			<Suspense fallback={<LoadingSkeleton variant="hero" />}>
				<HeroSection onGetStarted={handleGetStarted} />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="features" />}>
				<HowItWorksSection
					activeProcess={activeProcess}
					onSetActiveProcess={setActiveProcess}
				/>
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="cards" />}>
				<TestimonialsSection />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="cards" />}>
				<CTASection onGetStarted={handleGetStarted} />
			</Suspense>

			<AppFooter />
		</div>
	);
}
