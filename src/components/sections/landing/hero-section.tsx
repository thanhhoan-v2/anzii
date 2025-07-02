import { ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { HeroSectionSVG } from "@/lib/svg";

interface HeroSectionProps {
	onGetStarted: () => void;
}

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
				</div>
				<HeroSectionSVG />
			</div>
		</section>
	);
}
