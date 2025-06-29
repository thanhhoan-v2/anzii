import landing_01SVG from "@/assets/landing_01.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
	onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
	return (
		<section className="px-4 md:px-24 py-8 md:py-16">
			<div className="flex lg:flex-row flex-col items-center gap-6 md:gap-12">
				<div className="flex-1 space-y-4 md:space-y-8">
					<h1 className="font-bold text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
						Master anything with AI-powered learning
					</h1>
					<p className="max-w-lg text-gray-400 text-base md:text-lg">
						Transform your study materials into smart flashcards using AI, then
						learn faster with spaced repetition. Join thousands of learners
						achieving better results in less time.
					</p>
					<Button
						size="lg"
						className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
						onClick={onGetStarted}
					>
						Start Learning for Free
					</Button>
				</div>
				<Image
					src={landing_01SVG}
					alt="landing_01"
					className="opacity-90 w-full lg:w-[600px] max-w-[300px] md:max-w-[400px] h-auto"
				/>
			</div>
		</section>
	);
}
