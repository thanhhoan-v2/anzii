import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import {
	CoreFeaturesSection,
	FeaturesHeroSection,
	InActionSection,
} from "@/components/sections/features";

export default function FeaturesPage() {
	return (
		<div className="min-h-screen bg-black">
			<AppHeader />
			<FeaturesHeroSection />
			<CoreFeaturesSection />
			<InActionSection />
			<AppFooter />
		</div>
	);
}
