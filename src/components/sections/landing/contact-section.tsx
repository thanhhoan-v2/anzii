import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
	name: string;
	email: string;
	message: string;
	contactType: string;
	onNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onMessageChange: (value: string) => void;
	onContactTypeChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export default function ContactSection({
	name,
	email,
	message,
	contactType,
	onNameChange,
	onEmailChange,
	onMessageChange,
	onContactTypeChange,
	onSubmit,
}: ContactSectionProps) {
	return (
		<section id="contact" className="px-4 py-12 md:px-24 md:py-20">
			<div className="space-y-8 md:space-y-12">
				<div className="space-y-2 md:space-y-4">
					<Heading title="Contact Us" />
					<p className="mx-auto max-w-lg text-center text-base text-gray-400 md:text-lg">
						Ready to get started? Let's discuss how Anzii can transform your
						learning journey.
					</p>
				</div>

				<Card className="overflow-hidden rounded-[25px] border border-zinc-800 bg-zinc-950 md:rounded-[45px]">
					<CardContent className="flex flex-col gap-8 p-8 md:gap-12 md:p-16 lg:flex-row">
						<div className="flex-1">
							<form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
								<div className="flex flex-col gap-4 sm:flex-row md:gap-8">
									<label className="flex cursor-pointer items-center gap-3">
										<div
											className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-700 md:h-7 md:w-7 ${contactType === "demo" ? "border-lime-400 bg-lime-400" : "bg-zinc-900"}`}
										>
											{contactType === "demo" && (
												<div className="h-2 w-2 rounded-full bg-black md:h-3 md:w-3"></div>
											)}
										</div>
										<span className="text-sm text-gray-300 md:text-base">
											Book a Demo
										</span>
										<input
											type="radio"
											name="contactType"
											value="demo"
											checked={contactType === "demo"}
											onChange={(e) => onContactTypeChange(e.target.value)}
											className="hidden"
										/>
									</label>
									<label className="flex cursor-pointer items-center gap-3">
										<div
											className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-700 md:h-7 md:w-7 ${contactType === "support" ? "border-lime-400 bg-lime-400" : "bg-zinc-900"}`}
										>
											{contactType === "support" && (
												<div className="h-2 w-2 rounded-full bg-black md:h-3 md:w-3"></div>
											)}
										</div>
										<span className="text-sm text-gray-300 md:text-base">
											Get Support
										</span>
										<input
											type="radio"
											name="contactType"
											value="support"
											checked={contactType === "support"}
											onChange={(e) => onContactTypeChange(e.target.value)}
											className="hidden"
										/>
									</label>
								</div>

								<div className="space-y-3 md:space-y-4">
									<div className="space-y-1">
										<label
											htmlFor="name-input"
											className="text-sm font-medium text-gray-300 md:text-base"
										>
											Name
										</label>
										<Input
											id="name-input"
											value={name}
											onChange={(e) => onNameChange(e.target.value)}
											placeholder="Your name"
											className="rounded-xl border-zinc-800 bg-zinc-900 p-3 text-gray-100 placeholder:text-gray-500 focus:border-lime-400 focus:ring-lime-400 md:p-4"
											required
										/>
									</div>
									<div className="space-y-1">
										<label
											htmlFor="email-input"
											className="text-sm font-medium text-gray-300 md:text-base"
										>
											Email*
										</label>
										<Input
											id="email-input"
											type="email"
											value={email}
											onChange={(e) => onEmailChange(e.target.value)}
											placeholder="Your email"
											className="rounded-xl border-zinc-800 bg-zinc-900 p-3 text-gray-100 placeholder:text-gray-500 focus:border-lime-400 focus:ring-lime-400 md:p-4"
											required
										/>
									</div>
									<div className="space-y-1">
										<label
											htmlFor="message-input"
											className="text-sm font-medium text-gray-300 md:text-base"
										>
											Message*
										</label>
										<Textarea
											id="message-input"
											value={message}
											onChange={(e) => onMessageChange(e.target.value)}
											placeholder="Tell us about your learning goals..."
											className="min-h-[100px] rounded-xl border-zinc-800 bg-zinc-900 p-3 text-gray-100 placeholder:text-gray-500 focus:border-lime-400 focus:ring-lime-400 md:min-h-[120px] md:p-4"
											required
										/>
									</div>
								</div>

								<Button
									type="submit"
									size="lg"
									className="w-full rounded-xl bg-lime-400 px-6 py-3 text-base font-semibold text-black hover:bg-lime-500 md:px-8 md:py-4 md:text-lg"
								>
									Send Message
								</Button>
							</form>
						</div>
						<div className="flex flex-1 items-center justify-center">
							<div className="text-6xl md:text-8xl">📧</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
