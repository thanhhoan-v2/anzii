import { ChevronDown, ChevronUp } from "lucide-react";

import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { processSteps } from "@/data/landing-data";

interface ProcessSectionProps {
	activeProcess: number;
	onSetActiveProcess: (index: number) => void;
}

export default function HowItWorksSection({
	activeProcess,
	onSetActiveProcess,
}: ProcessSectionProps) {
	return (
		<section id="process" className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="How it Works" />

				<div className="space-y-4 md:space-y-6">
					{processSteps.map((step, stepIndex) => (
						<Card
							key={`process-${stepIndex}`}
							className={`${stepIndex === activeProcess ? "bg-lime-400" : "bg-zinc-950"} overflow-hidden rounded-[25px] border border-zinc-800 shadow-brand-sm transition-all duration-300 md:rounded-[45px] md:shadow-brand-md`}
						>
							<CardContent className="p-6 md:p-8">
								<button
									type="button"
									className="flex w-full cursor-pointer items-center justify-between text-left"
									onClick={() =>
										onSetActiveProcess(
											activeProcess === stepIndex ? -1 : stepIndex
										)
									}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											onSetActiveProcess(
												activeProcess === stepIndex ? -1 : stepIndex
											);
										}
									}}
									aria-expanded={activeProcess === stepIndex}
									aria-controls={`process-content-${stepIndex}`}
								>
									<div className="flex items-center gap-3 md:gap-6">
										<span
											className={`text-2xl font-bold md:text-4xl ${stepIndex === activeProcess ? "text-black" : "text-gray-100"}`}
										>
											{step.number}
										</span>
										<h3
											className={`text-lg font-bold md:text-2xl ${stepIndex === activeProcess ? "text-black" : "text-gray-100"}`}
										>
											{step.title}
										</h3>
									</div>
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 ${stepIndex === activeProcess ? "border-black bg-zinc-950" : "border-zinc-700 bg-zinc-900"}`}
									>
										{activeProcess === stepIndex ? (
											<ChevronUp className="h-5 w-5 text-lime-400 md:h-6 md:w-6" />
										) : (
											<ChevronDown className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />
										)}
									</div>
								</button>
								{activeProcess === stepIndex && (
									<div
										id={`process-content-${stepIndex}`}
										className="mt-4 border-t border-black pt-4 md:mt-6 md:pt-6"
									>
										<p className="text-base text-black md:text-lg">
											{step.description}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
