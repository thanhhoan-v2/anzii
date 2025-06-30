import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CTASectionProps {
	onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
	return (
		<section className="px-4 py-12 md:px-24 md:py-20">
			<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 md:rounded-[45px]">
				<CardContent className="flex flex-col items-center gap-8 p-8 md:gap-12 md:p-16 lg:flex-row">
					<div className="flex-1 space-y-4 text-center md:space-y-6 lg:text-left">
						<h2 className="text-2xl font-bold text-gray-100 md:text-4xl">
							Ready to revolutionize your learning?
						</h2>
						<p className="text-base text-gray-400 md:text-lg">
							Join thousands of learners who are already using AI to study
							smarter, not harder. Start your journey to better grades and
							deeper understanding today.
						</p>
						<Button
							size="lg"
							className="w-full rounded-xl bg-lime-400 px-6 py-3 text-base font-semibold text-black hover:bg-lime-500 sm:w-auto md:px-8 md:py-4 md:text-lg"
							onClick={onGetStarted}
						>
							Get Your Free Account
						</Button>
					</div>
					<div className="flex flex-1 justify-center">
						<div className="text-6xl md:text-8xl">🚀</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
