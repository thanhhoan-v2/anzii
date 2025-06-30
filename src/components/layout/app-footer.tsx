import AppLogo from "@/components/common/app-logo";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

export default function AppFooter() {
	return (
		<footer className="px-4 md:px-24 py-8 md:py-16">
			<Card className="bg-black border border-zinc-800 rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
				<CardContent className="space-y-8 md:space-y-12 p-8 md:p-16">
					<div className="flex lg:flex-row flex-col gap-8 md:gap-12">
						<div className="flex-1 space-y-6 md:space-y-8">
							<div className="flex md:flex-row flex-col items-start md:items-center gap-6 md:gap-8">
								<div className="text-white">
									<AppLogo />
								</div>
								<div className="flex flex-wrap gap-4 md:gap-8 text-gray-400 text-sm md:text-base">
									<Link
										href="/features"
										className="hover:text-lime-400 transition-colors"
									>
										Features
									</Link>
									<Link
										href="/pricing"
										className="hover:text-lime-400 transition-colors"
									>
										Pricing
									</Link>
									<Link
										href="/roadmap"
										className="hover:text-lime-400 transition-colors"
									>
										Roadmap
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center gap-4 pt-6 md:pt-8 border-zinc-800 border-t">
						<div className="flex items-center gap-2">
							<Link
								href="https://github.com/thanhhoan-v2/anzii"
								target="_blank"
							>
								<GithubIcon className="w-4 h-4 hover:text-lime-400 transition-colors" />
							</Link>
							<Link
								href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
								target="_blank"
							>
								<LinkedinIcon className="w-4 h-4 hover:text-lime-400 transition-colors" />
							</Link>
						</div>
						<p className="text-gray-500 text-sm md:text-base">
							© 2025 Anzii. All Rights Reserved.
						</p>
					</div>
				</CardContent>
			</Card>
		</footer>
	);
}
