"use client";

import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import CTASection from "@/components/sections/landing/cta-section";
import HeroSection from "@/components/sections/landing/hero-section";
import HowItWorksSection from "@/components/sections/landing/how-it-works-section";
import FeatureSummarySection from "@/components/sections/landing/stats-section";
import TestimonialsSection from "@/components/sections/landing/testimonials-section";
import { useLandingPageState } from "@/hooks/use-landing-page-state";

export default function LandingPage() {
	const {
		activeProcess,
		email,
		name,
		message,
		contactType,
		setActiveProcess,
		setEmail,
		setName,
		setMessage,
		setContactType,
		handleGetStarted,
		handleEmailSubmit,
		handleContactSubmit,
	} = useLandingPageState();

	return (
		<div className="bg-black min-h-screen">
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
