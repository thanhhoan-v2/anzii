import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

import { AppLogo } from "@/components/common/app-logo";
import { Card, CardContent } from "@/components/ui/card";

export default function AppFooter() {
	return (
		<footer className="px-4 py-8 md:px-24 md:py-16">
			<Card className="overflow-hidden rounded-t-[25px] border border-zinc-800 bg-black md:rounded-t-[45px]">
				<CardContent className="space-y-8 p-8 md:space-y-12 md:p-16">
					<div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
						<div className="flex-1 space-y-6 md:space-y-8">
							<div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
								<div className="text-white">
									<AppLogo />
								</div>
								<div className="flex flex-wrap gap-4 text-sm text-gray-400 md:gap-8 md:text-base">
									<Link
										href="/features"
										className="transition-colors hover:text-lime-400"
									>
										Features
									</Link>
									<Link
										href="/pricing"
										className="transition-colors hover:text-lime-400"
									>
										Pricing
									</Link>
									<Link
										href="/roadmap"
										className="transition-colors hover:text-lime-400"
									>
										Roadmap
									</Link>
									<Link
										href="/privacy-policy"
										className="transition-colors hover:text-lime-400"
									>
										Privacy Policy
									</Link>
									<Link
										href="/terms-of-service"
										className="transition-colors hover:text-lime-400"
									>
										Terms of Service
									</Link>
									<Link
										href="/contact"
										className="transition-colors hover:text-lime-400"
									>
										Contact
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between gap-4 border-t border-zinc-800 pt-6 md:pt-8">
						<div className="flex items-center gap-2">
							<Link
								href="https://github.com/thanhhoan-v2/anzii"
								target="_blank"
							>
								<GithubIcon className="h-4 w-4 transition-colors hover:text-lime-400" />
							</Link>
							<Link
								href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
								target="_blank"
							>
								<LinkedinIcon className="h-4 w-4 transition-colors hover:text-lime-400" />
							</Link>
						</div>
						<p className="text-right text-sm text-gray-500 md:text-base">
							© 2025 Anzii. All Rights Reserved.
						</p>
					</div>
				</CardContent>
			</Card>
		</footer>
	);
}
