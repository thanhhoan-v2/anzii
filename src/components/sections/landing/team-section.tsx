import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/data/landing-data";
import { Linkedin } from "lucide-react";

export default function TeamSection() {
	return (
		<section className="px-4 md:px-24 py-12 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<div className="flex items-center gap-6 md:gap-10">
					<div className="space-y-2 md:space-y-4">
						<Heading size="2xl md:3xl">Team</Heading>
						<p className="max-w-lg text-gray-400 text-base md:text-lg">
							Meet the passionate team building the future of AI-powered
							learning.
						</p>
					</div>
				</div>

				<div className="gap-4 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{teamMembers.map((member, memberIndex) => (
						<Card
							key={`team-${memberIndex}`}
							className="bg-zinc-950 shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] hover:shadow-[0_5px_0_0_rgba(163,230,53,0.4)] border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
						>
							<CardContent className="space-y-4 md:space-y-6 p-6 md:p-8 text-center">
								<div className="space-y-3 md:space-y-4">
									<div className="text-4xl md:text-6xl">{member.image}</div>
									<div>
										<h3 className="font-bold text-gray-100 text-lg md:text-xl">
											{member.name}
										</h3>
										<p className="text-gray-400 text-sm md:text-base">
											{member.role}
										</p>
									</div>
									<div className="flex justify-center items-center bg-lime-400 mx-auto rounded-full w-6 md:w-8 h-6 md:h-8">
										<Linkedin className="w-3 md:w-4 h-3 md:h-4 text-black" />
									</div>
								</div>
								<div className="pt-4 md:pt-6 border-zinc-800 border-t">
									<p className="text-gray-500 text-xs md:text-sm">
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
