"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (error) setError("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to send message");
			}

			setSubmitted(true);
			setFormData({ name: "", email: "", subject: "", message: "" });

			// Reset success message after 5 seconds
			setTimeout(() => setSubmitted(false), 5000);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to send message");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="px-4 md:px-24 py-5 md:py-10">
			<div className="mx-auto max-w-4xl">
				<div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
					{/* Contact Form */}
					<div className="lg:col-span-4">
						<Card className="bg-zinc-950 shadow-brand-md border border-zinc-800 rounded-[25px] md:rounded-[45px]">
							<CardContent className="p-8 md:p-12">
								{submitted ? (
									<div className="text-center">
										<div className="flex justify-center items-center bg-lime-400/20 mx-auto mb-4 rounded-full w-16 h-16">
											<Send className="w-8 h-8 text-lime-400" />
										</div>
										<h3 className="mb-2 font-bold text-white text-xl">
											Message Sent!
										</h3>
										<p className="text-gray-400">
											Thank you for contacting us. We&apos;ll get back to you
											within 24 hours.
										</p>
									</div>
								) : (
									<>
										{error && (
											<div className="bg-red-500/10 mb-6 p-4 border border-red-500/20 rounded-xl">
												<p className="text-red-400 text-sm">{error}</p>
											</div>
										)}
										<form onSubmit={handleSubmit} className="space-y-6">
											<div className="space-y-2">
												<Label htmlFor="name" className="text-white">
													Full Name
												</Label>
												<Input
													id="name"
													name="name"
													type="text"
													required
													value={formData.name}
													onChange={handleInputChange}
													className="bg-zinc-900 border-zinc-700 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-white"
													placeholder="Enter your full name"
												/>
											</div>

											<div className="space-y-2">
												<Label htmlFor="email" className="text-white">
													Email Address
												</Label>
												<Input
													id="email"
													name="email"
													type="email"
													required
													value={formData.email}
													onChange={handleInputChange}
													className="bg-zinc-900 border-zinc-700 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-white"
													placeholder="Enter your email address"
												/>
											</div>

											<div className="space-y-2">
												<Label htmlFor="subject" className="text-white">
													Subject
												</Label>
												<Input
													id="subject"
													name="subject"
													type="text"
													required
													value={formData.subject}
													onChange={handleInputChange}
													className="bg-zinc-900 border-zinc-700 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-white"
													placeholder="What is this about?"
												/>
											</div>

											<div className="space-y-2">
												<Label htmlFor="message" className="text-white">
													Message
												</Label>
												<Textarea
													id="message"
													name="message"
													required
													rows={6}
													value={formData.message}
													onChange={handleInputChange}
													className="bg-zinc-900 border-zinc-700 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-white"
													placeholder="Tell us how we can help you..."
												/>
											</div>

											<Button
												type="submit"
												disabled={isSubmitting}
												className="bg-lime-400 hover:bg-lime-500 disabled:opacity-50 px-8 py-3 rounded-xl w-full font-semibold text-black transition-all duration-300"
											>
												{isSubmitting ? (
													<div className="flex items-center gap-2">
														<div className="border-2 border-t-transparent border-black rounded-full w-4 h-4 animate-spin"></div>
														Sending...
													</div>
												) : (
													<div className="flex items-center gap-2">
														<Send className="w-4 h-4" />
														Send Message
													</div>
												)}
											</Button>
										</form>
									</>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
