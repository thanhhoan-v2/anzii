import { ButtonWithLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

interface CTASectionProps {
	onGetStarted: () => void;
}

export default function CTASection({
	onGetStarted: _onGetStarted,
}: CTASectionProps) {
	return (
		<section className="px-4 md:px-24 py-12 md:py-20">
			<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
				<CardContent className="flex lg:flex-row flex-col items-center gap-8 md:gap-12 p-8 md:p-16">
					<div className="flex-1 space-y-4 md:space-y-6 lg:text-left text-center">
						<h2 className="font-bold text-gray-100 text-2xl md:text-4xl">
							Ready to revolutionize your learning?
						</h2>
						<p className="text-gray-400 text-base md:text-lg">
							Join thousands of learners who are already using AI to study
							smarter, not harder. Start your journey to better grades and
							deeper understanding today.
						</p>
						<div className="space-y-4">
							<ButtonWithLink
								prefetch={true}
								href={ROUTES.SIGN_UP}
								className="w-fit"
							>
								Get Your Free Account
							</ButtonWithLink>
						</div>
					</div>
					<div className="flex flex-1 justify-center">
						<div className="text-6xl md:text-8xl">🚀</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
