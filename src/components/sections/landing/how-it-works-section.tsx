import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { processSteps } from "@/data/landing-data";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProcessSectionProps {
	activeProcess: number;
	onSetActiveProcess: (index: number) => void;
}

export default function HowItWorksSection({
	activeProcess,
	onSetActiveProcess,
}: ProcessSectionProps) {
	return (
		<section id="process" className="px-4 md:px-24 py-12 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="How it Works" />

				<div className="space-y-4 md:space-y-6">
					{processSteps.map((step, stepIndex) => (
						<Card
							key={`process-${stepIndex}`}
							className={`${stepIndex === activeProcess ? "bg-lime-400" : "bg-zinc-950"} border-zinc-800 border rounded-[25px] md:rounded-[45px] shadow-brand-sm md:shadow-brand-md overflow-hidden transition-all duration-300`}
						>
							<CardContent className="p-6 md:p-8">
								<button
									type="button"
									className="flex justify-between items-center w-full text-left cursor-pointer"
									onClick={() =>
										onSetActiveProcess(
											activeProcess === stepIndex ? -1 : stepIndex,
										)
									}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											onSetActiveProcess(
												activeProcess === stepIndex ? -1 : stepIndex,
											);
										}
									}}
									aria-expanded={activeProcess === stepIndex}
									aria-controls={`process-content-${stepIndex}`}
								>
									<div className="flex items-center gap-3 md:gap-6">
										<span
											className={`font-bold text-2xl md:text-4xl ${stepIndex === activeProcess ? "text-black" : "text-gray-100"}`}
										>
											{step.number}
										</span>
										<h3
											className={`font-bold text-lg md:text-2xl ${stepIndex === activeProcess ? "text-black" : "text-gray-100"}`}
										>
											{step.title}
										</h3>
									</div>
									<div
										className={`flex justify-center items-center border rounded-full w-10 md:w-12 h-10 md:h-12 ${stepIndex === activeProcess ? "bg-zinc-950 border-black" : "bg-zinc-900 border-zinc-700"}`}
									>
										{activeProcess === stepIndex ? (
											<ChevronUp className="w-5 md:w-6 h-5 md:h-6 text-lime-400" />
										) : (
											<ChevronDown className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
										)}
									</div>
								</button>
								{activeProcess === stepIndex && (
									<div
										id={`process-content-${stepIndex}`}
										className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-black"
									>
										<p className="text-black text-base md:text-lg">
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
