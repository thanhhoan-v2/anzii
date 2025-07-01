import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/landing-data";

export default function TestimonialsSection() {
	return (
		<section id="testimonials" className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<Heading title="Testimonials" />

				<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-black md:rounded-[45px]">
					<CardContent className="p-8 md:p-16">
						<div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
							{testimonials.map((testimonial, testimonialIndex) => (
								<div
									key={`testimonial-${testimonialIndex}`}
									className="space-y-3 md:space-y-4"
								>
									<div className="relative rounded-[20px] border border-zinc-800 bg-zinc-950 p-6 md:rounded-[30px] md:p-8">
										<p className="text-sm leading-relaxed text-gray-200 md:text-base">
											&quot;{testimonial.text}&quot;
										</p>
										<div className="absolute -bottom-2 left-6 h-3 w-3 rotate-45 transform border-b border-l border-zinc-800 bg-zinc-950 md:left-8 md:h-4 md:w-4"></div>
									</div>
									<p className="text-sm font-medium text-gray-100 md:text-base">
										{testimonial.author}
										<br />
										<span className="text-lime-300">{testimonial.role}</span>
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
