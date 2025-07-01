import Image from "next/image";

import landing_01SVG from "@/assets/svg/landing_01.svg";
import { ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

interface HeroSectionProps {
	onGetStarted: () => void;
}

export default function HeroSection({
	onGetStarted: _onGetStarted,
}: HeroSectionProps) {
	return (
		<section className="-mt-14 flex min-h-screen items-center justify-center px-4 md:-mt-16 md:px-24">
			{/* Mobile Layout - Vertical Stack */}
			<div className="flex w-full max-w-4xl flex-col items-center space-y-6 text-center lg:hidden">
				<div className="space-y-4">
					<h1 className="text-3xl font-bold leading-tight text-gray-100">
						Master anything with AI-powered learning
					</h1>
					<p className="mx-auto max-w-sm text-base text-gray-400">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
				</div>

				<div className="py-8">
					<Image
						loading="eager"
						src={landing_01SVG}
						alt="AI-powered learning illustration"
						className="mx-auto h-auto w-full max-w-[280px] opacity-90"
					/>
				</div>

				<ButtonWithLink href={ROUTES.DASHBOARD}>
					Start Learning for Free
				</ButtonWithLink>
			</div>

			{/* Desktop Layout - Horizontal */}
			<div className="hidden w-full max-w-7xl items-center gap-12 lg:flex lg:flex-row">
				<div className="flex-1 space-y-8">
					<h1 className="text-4xl font-bold leading-tight text-gray-100 xl:text-6xl">
						Master anything with AI-powered learning
					</h1>
					<p className="max-w-lg text-lg text-gray-400">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
					<ButtonWithLink href={ROUTES.DASHBOARD} className="w-fit">
						Start Learning for Free
					</ButtonWithLink>
				</div>
				<Image
					src={landing_01SVG}
					alt="AI-powered learning illustration"
					className="h-auto w-[600px] max-w-[400px] opacity-90 xl:max-w-[600px]"
				/>
			</div>
		</section>
	);
}
