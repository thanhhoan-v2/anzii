"use client";

import AppHeader from "@/components/layout/app-header";
import ContactSection from "@/components/sections/landing/contact-section";
import CTASection from "@/components/sections/landing/cta-section";
import FooterSection from "@/components/sections/landing/footer-section";
import HeroSection from "@/components/sections/landing/hero-section";
import ProcessSection from "@/components/sections/landing/process-section";
import ServicesSection from "@/components/sections/landing/services-section";
import StatsSection from "@/components/sections/landing/stats-section";
import TeamSection from "@/components/sections/landing/team-section";
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
			<StatsSection />
			<ServicesSection />
			<CTASection onGetStarted={handleGetStarted} />
			<ProcessSection 
				activeProcess={activeProcess} 
				onSetActiveProcess={setActiveProcess} 
			/>
			<TeamSection />
			<TestimonialsSection />
			<ContactSection
				name={name}
				email={email}
				message={message}
				contactType={contactType}
				onNameChange={setName}
				onEmailChange={setEmail}
				onMessageChange={setMessage}
				onContactTypeChange={setContactType}
				onSubmit={handleContactSubmit}
			/>
			<FooterSection />
		</div>
	);
}
