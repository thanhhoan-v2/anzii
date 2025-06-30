import { Linkedin } from "lucide-react";

import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/data/landing-data";

export default function TeamSection() {
	return (
		<section className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<div className="space-y-2 md:space-y-4">
					<Heading title="Team" />
					<p className="mx-auto max-w-lg text-center text-base text-gray-400 md:text-lg">
						Meet the passionate team building the future of AI-powered learning.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{teamMembers.map((member, memberIndex) => (
						<Card
							key={`team-${memberIndex}`}
							className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-sm transition-all duration-300 hover:shadow-brand-lg md:rounded-[45px] md:shadow-brand-md"
						>
							<CardContent className="space-y-4 p-6 text-center md:space-y-6 md:p-8">
								<div className="space-y-3 md:space-y-4">
									<div className="text-4xl md:text-6xl">{member.image}</div>
									<div>
										<h3 className="text-lg font-bold text-gray-100 md:text-xl">
											{member.name}
										</h3>
										<p className="text-sm text-gray-400 md:text-base">
											{member.role}
										</p>
									</div>
									<div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 md:h-8 md:w-8">
										<Linkedin className="h-3 w-3 text-black md:h-4 md:w-4" />
									</div>
								</div>
								<div className="border-t border-zinc-800 pt-4 md:pt-6">
									<p className="text-xs text-gray-500 md:text-sm">
										{member.description}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
