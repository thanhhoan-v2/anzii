"use client";

import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Contact form:", { name, email, message });
	};

	return (
		<div className="bg-black min-h-screen">
			<AppHeader />

			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12 text-center">
					<div className="space-y-4 md:space-y-6">
						<h1 className="font-bold text-gray-100 text-3xl md:text-5xl lg:text-6xl leading-tight">
							Get in Touch
						</h1>
						<p className="mx-auto max-w-3xl text-gray-400 text-lg md:text-xl">
							Have questions about Anzii? Want to share feedback? We'd love to
							hear from you.
						</p>
					</div>
				</div>
			</section>

			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="gap-8 md:gap-12 grid grid-cols-1 lg:grid-cols-2">
					<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
						<CardContent className="space-y-6 md:space-y-8 p-8 md:p-16">
							<Heading size="xl md:2xl">Send us a message</Heading>
							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
								<div className="space-y-2">
									<label className="font-medium text-gray-300 text-sm md:text-base">
										Name
									</label>
									<Input
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Your name"
										className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
										required
									/>
								</div>
								<div className="space-y-2">
									<label className="font-medium text-gray-300 text-sm md:text-base">
										Email
									</label>
									<Input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Your email"
										className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
										required
									/>
								</div>
								<div className="space-y-2">
									<label className="font-medium text-gray-300 text-sm md:text-base">
										Message
									</label>
									<Textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Tell us how we can help..."
										className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 min-h-[120px] text-gray-100 placeholder:text-gray-500"
										required
									/>
								</div>
								<Button
									type="submit"
									className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full font-semibold text-black text-base md:text-lg"
								>
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className="space-y-6 md:space-y-8">
						<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
							<CardContent className="space-y-4 md:space-y-6 p-8 md:p-16">
								<div className="flex items-center gap-4">
									<Mail className="w-6 h-6 text-lime-400" />
									<div>
										<h3 className="font-bold text-gray-100 text-lg">Email</h3>
										<p className="text-gray-400">hello@anzii.com</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
							<CardContent className="space-y-4 md:space-y-6 p-8 md:p-16">
								<div className="flex items-center gap-4">
									<Phone className="w-6 h-6 text-lime-400" />
									<div>
										<h3 className="font-bold text-gray-100 text-lg">Phone</h3>
										<p className="text-gray-400">1-800-ANZII-AI</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
							<CardContent className="space-y-4 md:space-y-6 p-8 md:p-16">
								<div className="flex items-center gap-4">
									<MapPin className="w-6 h-6 text-lime-400" />
									<div>
										<h3 className="font-bold text-gray-100 text-lg">Address</h3>
										<p className="text-gray-400">
											123 AI Street
											<br />
											San Francisco, CA 94105
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
