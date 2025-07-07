import dynamic from "next/dynamic";
import { Suspense } from "react";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";

// Lazy load features components with loading states
const FeaturesHeroSection = dynamic(
	() => import("@/components/sections/features/features-hero-section"),
	{
		loading: () => <LoadingSkeleton variant="hero" />,
		ssr: true,
	}
);

const CoreFeaturesSection = dynamic(
	() => import("@/components/sections/features/core-features-section"),
	{
		loading: () => <LoadingSkeleton variant="features" />,
		ssr: true,
	}
);

const InActionSection = dynamic(
	() => import("@/components/sections/features/in-action-section"),
	{
		loading: () => <LoadingSkeleton variant="features" />,
		ssr: true,
	}
);

export default function Page() {
	return (
		<div className="bg-black min-h-screen">
			<AppHeader />

			<Suspense fallback={<LoadingSkeleton variant="hero" />}>
				<FeaturesHeroSection />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="features" />}>
				<CoreFeaturesSection />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="features" />}>
				<InActionSection />
			</Suspense>

			<AppFooter />
		</div>
	);
}
