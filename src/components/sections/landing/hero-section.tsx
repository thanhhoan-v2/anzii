import landing_01SVG from "@/assets/landing_01.svg";
import { Button, ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";

interface HeroSectionProps {
	onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
	return (
		<section className="flex justify-center items-center -mt-14 md:-mt-16 px-4 md:px-24 min-h-screen">
			{/* Mobile Layout - Vertical Stack */}
			<div className="lg:hidden flex flex-col items-center space-y-6 w-full max-w-4xl text-center">
				<div className="space-y-4">
					<h1 className="font-bold text-gray-100 text-3xl leading-tight">
						Master anything with AI-powered learning
					</h1>
					<p className="mx-auto max-w-sm text-gray-400 text-base">
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
						className="opacity-90 mx-auto w-full max-w-[280px] h-auto"
					/>
				</div>

				<ButtonWithLink href={ROUTES.DASHBOARD}>
					Start Learning for Free
				</ButtonWithLink>
			</div>

			{/* Desktop Layout - Horizontal */}
			<div className="hidden lg:flex lg:flex-row items-center gap-12 w-full max-w-7xl">
				<div className="flex-1 space-y-8">
					<h1 className="font-bold text-gray-100 text-4xl xl:text-6xl leading-tight">
						Master anything with AI-powered learning
					</h1>
					<p className="max-w-lg text-gray-400 text-lg">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
					<Button
						size="lg"
						className="bg-lime-400 hover:bg-lime-500 px-8 py-4 rounded-xl w-auto font-semibold text-black text-lg"
						onClick={onGetStarted}
					>
						Start Learning for Free
					</Button>
				</div>
				<Image
					src={landing_01SVG}
					alt="AI-powered learning illustration"
					className="opacity-90 w-[600px] max-w-[400px] xl:max-w-[600px] h-auto"
				/>
			</div>
		</section>
	);
}
