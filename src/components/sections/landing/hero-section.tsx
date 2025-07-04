import dynamic from "next/dynamic";

import { ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

interface HeroSectionProps {
	onGetStarted: () => void;
}

const HeroSection_01_SVG = dynamic(
	() => import("@/components/svgs/hero-section-01-svg"),
	{
		ssr: true,
	}
);

export default function HeroSection({
	onGetStarted: _onGetStarted,
}: HeroSectionProps) {
	return (
		<section className="-mt-14 flex min-h-screen items-center justify-center px-4 md:-mt-16 md:px-24">
			{/* Mobile Layout */}
			<div className="flex w-full max-w-4xl flex-col items-center space-y-6 text-center lg:hidden">
				<div className="space-y-4">
					<h1 className="text-5xl font-bold leading-tight text-gray-100">
						Master anything with{" "}
						<span className="text-primary">AI-powered</span> learning
					</h1>
					<p className="mx-auto max-w-sm text-base text-gray-400">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
				</div>

				{/* <div className="py-3">
					<HeroSectionSVG />
				</div> */}

				<ButtonWithLink href={ROUTES.DASHBOARD} className="w-fit">
					Start Learning for Free
				</ButtonWithLink>
				<p className="text-xs text-gray-500">
					By using our service, you agree to our{" "}
					<a
						href="/privacy-policy"
						className="text-lime-400 underline hover:text-lime-300"
					>
						Privacy Policy
					</a>{" "}
					and{" "}
					<a
						href="/terms-of-service"
						className="text-lime-400 underline hover:text-lime-300"
					>
						Terms of Service
					</a>
				</p>
			</div>

			{/* Desktop Layout */}
			<div className="hidden w-full max-w-7xl items-center gap-12 lg:flex lg:flex-row">
				<div className="flex-1 space-y-8">
					<h1 className="text-5xl font-bold leading-tight text-gray-100 xl:text-6xl">
						Master anything with&nbsp;
						<span className="text-primary">AI-powered</span> learning
					</h1>
					<p className="max-w-lg text-lg text-gray-400">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
					<ButtonWithLink href={ROUTES.DASHBOARD} className="w-fit">
						Start Learning for Free
					</ButtonWithLink>
					<p className="text-xs text-gray-500">
						By using our service, you agree to our{" "}
						<a
							href="/privacy-policy"
							className="text-lime-400 underline hover:text-lime-300"
						>
							Privacy Policy
						</a>{" "}
						and{" "}
						<a
							href="/terms-of-service"
							className="text-lime-400 underline hover:text-lime-300"
						>
							Terms of Service
						</a>
					</p>
				</div>
				<HeroSection_01_SVG />
			</div>
		</section>
	);
}
