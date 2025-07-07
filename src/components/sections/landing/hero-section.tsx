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
		<section className="flex justify-center items-center -mt-14 md:-mt-16 px-4 md:px-24 min-h-screen">
			{/* Mobile Layout */}
			<div className="lg:hidden flex flex-col items-center space-y-6 w-full max-w-4xl text-center">
				<div className="space-y-4">
					<h1 className="font-bold text-gray-100 text-5xl leading-tight">
						Master anything with{" "}
						<span className="text-primary">AI-powered</span> learning
					</h1>
					<p className="mx-auto max-w-sm text-gray-400 text-base">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
				</div>

				{/* <div className="py-3">
					<HeroSectionSVG />
				</div> */}

				<ButtonWithLink
					prefetch={true}
					href={ROUTES.DASHBOARD}
					className="w-fit"
				>
					Start Learning for Free
				</ButtonWithLink>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:flex lg:flex-row items-center gap-12 w-full max-w-7xl">
				<div className="flex-1 space-y-8">
					<h1 className="font-bold text-gray-100 text-5xl xl:text-6xl leading-tight">
						Master anything with&nbsp;
						<span className="text-primary">AI-powered</span> learning
					</h1>
					<p className="max-w-lg text-gray-400 text-lg">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
					<ButtonWithLink
						prefetch={true}
						href={ROUTES.DASHBOARD}
						className="w-fit"
					>
						Start Learning for Free
					</ButtonWithLink>
				</div>
				<HeroSection_01_SVG />
			</div>
		</section>
	);
}
