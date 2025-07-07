import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import CoreFeaturesSection from "@/components/sections/features/core-features-section";
import FeaturesHeroSection from "@/components/sections/features/features-hero-section";
import InActionSection from "@/components/sections/features/in-action-section";

export default function Page() {
	return (
		<div className="bg-black min-h-screen">
			<AppHeader />
			<FeaturesHeroSection />
			<CoreFeaturesSection />
			<InActionSection />
			<AppFooter />
		</div>
	);
}
