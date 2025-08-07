"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { pricingFAQ, pricingPlans } from "@/data/pricing-data";
import { ROUTES } from "@/lib/routes";

// Lazy load pricing components with loading states
const PricingHero = dynamic(
	() => import("@/components/sections/pricing/pricing-hero"),
	{
		loading: () => <LoadingSkeleton variant="hero" />,
		ssr: true,
	}
);

const PricingCards = dynamic(
	() => import("@/components/sections/pricing/pricing-cards"),
	{
		loading: () => <LoadingSkeleton variant="cards" />,
		ssr: false, // Client-side only due to interactive elements
	}
);

const PricingFAQ = dynamic(
	() => import("@/components/sections/pricing/pricing-faq"),
	{
		loading: () => <LoadingSkeleton variant="faq" />,
		ssr: false, // Client-side only due to state management
	}
);

export default function Page() {
	const router = useRouter();

	const handleGetStarted = (_plan: string) => {
		router.push(ROUTES.DECKS);
	};

	return (
		<div className="min-h-screen bg-black">
			<AppHeader />

			<Suspense fallback={<LoadingSkeleton variant="hero" />}>
				<PricingHero />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="cards" />}>
				<PricingCards plans={pricingPlans} onGetStarted={handleGetStarted} />
			</Suspense>

			<Suspense fallback={<LoadingSkeleton variant="faq" />}>
				<PricingFAQ faq={pricingFAQ} />
			</Suspense>

			<AppFooter />
		</div>
	);
}
