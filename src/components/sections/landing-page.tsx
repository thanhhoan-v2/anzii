"use client";

import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import CTASection from "@/components/sections/landing/cta-section";
import HeroSection from "@/components/sections/landing/hero-section";
import HowItWorksSection from "@/components/sections/landing/how-it-works-section";
import TestimonialsSection from "@/components/sections/landing/testimonials-section";
import { useLandingPageState } from "@/hooks/use-landing-page-state";

export default function LandingPage() {
	const {
		activeProcess,
		setActiveProcess,
		handleGetStarted,
	} = useLandingPageState();

	return (
		<div className="min-h-screen bg-black">
			<AppHeader />
			<HeroSection onGetStarted={handleGetStarted} />
			{/* <FeatureSummarySection /> */}
			<HowItWorksSection
				activeProcess={activeProcess}
				onSetActiveProcess={setActiveProcess}
			/>
			<TestimonialsSection />
			<CTASection onGetStarted={handleGetStarted} />
			<AppFooter />
		</div>
	);
}
