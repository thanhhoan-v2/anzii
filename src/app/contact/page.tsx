"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
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
		<div className="min-h-screen bg-black">
			<AppHeader />

			{/* Hero Section */}
			<section className="mt-10 px-4 py-5 md:px-24 md:py-10">
				<div className="space-y-5 text-center md:space-y-2">
					<div className="space-y-2 md:space-y-3">
						<h1 className="text-4xl font-bold leading-tight text-gray-100 md:text-5xl lg:text-6xl">
							Get in Touch
						</h1>
						<p className="mx-auto max-w-3xl text-lg text-gray-400 md:text-xl">
							Have questions, feedback, or need support? We&apos;d love to hear
							from you. Send us a message and we&apos;ll get back to you as soon
							as possible.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="px-4 py-5 md:px-24 md:py-10">
				<div className="mx-auto max-w-4xl">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
						{/* Contact Form */}
						<div className="lg:col-span-4">
							<Card className="rounded-[25px] border border-zinc-800 bg-zinc-950 shadow-brand-md md:rounded-[45px]">
								<CardContent className="p-8 md:p-12">
									{submitted ? (
										<div className="text-center">
											<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/20">
												<Send className="h-8 w-8 text-lime-400" />
											</div>
											<h3 className="mb-2 text-xl font-bold text-white">
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
												<div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
													<p className="text-sm text-red-400">{error}</p>
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
														className="rounded-xl border-zinc-700 bg-zinc-900 text-white focus:border-lime-400 focus:ring-lime-400"
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
														className="rounded-xl border-zinc-700 bg-zinc-900 text-white focus:border-lime-400 focus:ring-lime-400"
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
														className="rounded-xl border-zinc-700 bg-zinc-900 text-white focus:border-lime-400 focus:ring-lime-400"
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
														className="rounded-xl border-zinc-700 bg-zinc-900 text-white focus:border-lime-400 focus:ring-lime-400"
														placeholder="Tell us how we can help you..."
													/>
												</div>

												<Button
													type="submit"
													disabled={isSubmitting}
													className="w-full rounded-xl bg-lime-400 px-8 py-3 font-semibold text-black transition-all duration-300 hover:bg-lime-500 disabled:opacity-50"
												>
													{isSubmitting ? (
														<div className="flex items-center gap-2">
															<div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
															Sending...
														</div>
													) : (
														<div className="flex items-center gap-2">
															<Send className="h-4 w-4" />
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

			<AppFooter />
		</div>
	);
};

export default ContactPage;
