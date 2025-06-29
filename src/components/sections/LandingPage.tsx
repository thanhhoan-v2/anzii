"use client";

import landing_01SVG from "@/assets/landing_01.svg";
import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/AppHeader";
import AppLogo from "@/components/layout/AppLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowRight,
    BookOpen,
    ChevronDown,
    ChevronUp,
    Linkedin,
    Star,
    Target,
    Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
	const [activeProcess, setActiveProcess] = useState(0);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [contactType, setContactType] = useState("demo");
	const router = useRouter();

	const handleGetStarted = () => {
		router.push("/dashboard");
	};

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Email signup:", email);
		router.push("/dashboard");
	};

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Contact form:", { name, email, message, contactType });
		router.push("/dashboard");
	};

	const services = [
		{
			title: ["AI-Powered", "Flashcards"],
			description:
				"Generate personalized study materials from any content using advanced AI technology",
			bgColor: "bg-gray-100",
			textColor: "text-black",
			linkColor: "text-black",
			illustration: "🤖",
		},
		{
			title: ["Spaced", "Repetition"],
			description:
				"Scientifically proven learning intervals that maximize retention and minimize study time",
			bgColor: "bg-green-400",
			textColor: "text-black",
			linkColor: "text-black",
			illustration: "🧠",
		},
		{
			title: ["Smart", "Scheduling"],
			description:
				"Adaptive algorithms that optimize your study sessions based on performance and retention",
			bgColor: "bg-black",
			textColor: "text-white",
			linkColor: "text-white",
			illustration: "📅",
		},
		{
			title: ["Progress", "Analytics"],
			description:
				"Detailed insights into your learning progress with visual charts and statistics",
			bgColor: "bg-gray-100",
			textColor: "text-black",
			linkColor: "text-black",
			illustration: "📊",
		},
		{
			title: ["Multi-Format", "Import"],
			description:
				"Support for text, PDFs, images, and more to create comprehensive study materials",
			bgColor: "bg-green-400",
			textColor: "text-black",
			linkColor: "text-black",
			illustration: "📚",
		},
		{
			title: ["Cross-Platform", "Sync"],
			description:
				"Access your study materials anywhere with seamless synchronization across devices",
			bgColor: "bg-black",
			textColor: "text-white",
			linkColor: "text-white",
			illustration: "🔄",
		},
	];

	const processSteps = [
		{
			number: "01",
			title: "Upload Content",
			description:
				"Import your study materials from various sources including text, PDFs, or direct input. Our system supports multiple formats to make content creation effortless.",
		},
		{
			number: "02",
			title: "AI Processing",
			description:
				"Advanced AI analyzes your content and generates optimized flashcards with questions and answers tailored to enhance learning and retention.",
		},
		{
			number: "03",
			title: "Smart Review",
			description:
				"Begin studying with our spaced repetition algorithm that schedules reviews at optimal intervals for maximum memory retention.",
		},
		{
			number: "04",
			title: "Track Progress",
			description:
				"Monitor your learning journey with detailed analytics, performance metrics, and insights to optimize your study sessions.",
		},
		{
			number: "05",
			title: "Achieve Mastery",
			description:
				"Continue learning with personalized recommendations and adaptive difficulty to ensure long-term knowledge retention.",
		},
	];

	const testimonials = [
		{
			text: "Anzii completely transformed my study routine. I went from struggling with medical terminology to acing my exams. The AI-generated flashcards are incredibly accurate and save me hours of prep time.",
			author: "Sarah Chen",
			role: "Medical Student",
		},
		{
			text: "As a language learner, I needed something more effective than traditional methods. Anzii's spaced repetition helped me master 2000+ vocabulary words in just 3 months. Absolutely game-changing!",
			author: "Marcus Rodriguez",
			role: "Software Engineer",
		},
		{
			text: "The analytics feature is what sold me. Being able to see exactly which concepts I struggle with and when to review them has improved my retention rate by over 80%. This is the future of learning.",
			author: "Dr. Emily Watson",
			role: "University Professor",
		},
	];

	const teamMembers = [
		{
			name: "Alex Thompson",
			role: "CEO & Founder",
			description:
				"10+ years in EdTech. Former ML engineer at Google with a passion for democratizing education through AI.",
			image: "👨‍💼",
		},
		{
			name: "Priya Patel",
			role: "Head of AI",
			description:
				"PhD in Machine Learning from Stanford. Expert in natural language processing and educational AI systems.",
			image: "👩‍💻",
		},
		{
			name: "Jordan Kim",
			role: "UX Director",
			description:
				"Award-winning designer with 8+ years creating intuitive learning experiences for millions of users.",
			image: "👨‍🎨",
		},
	];

	return (
		<div className="bg-black min-h-screen">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 md:px-24 py-8 md:py-16">
				<div className="flex lg:flex-row flex-col items-center gap-6 md:gap-12">
					<div className="flex-1 space-y-4 md:space-y-8">
						<h1 className="font-bold text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
							Master anything with AI-powered learning
						</h1>
						<p className="max-w-lg text-gray-400 text-base md:text-lg">
							Transform your study materials into smart flashcards using AI,
							then learn faster with spaced repetition. Join thousands of
							learners achieving better results in less time.
						</p>
						<Button
							size="lg"
							className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
							onClick={handleGetStarted}
						>
							Start Learning for Free
						</Button>
					</div>
					<Image
						src={landing_01SVG}
						alt="landing_01"
						className="opacity-90 w-full lg:w-[600px] max-w-[300px] md:max-w-[400px] h-auto"
					/>
				</div>
			</section>

			{/* Trusted By Section */}
			<section className="px-4 md:px-24 py-4 md:py-8">
				<div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60 text-gray-500 text-sm md:text-lg">
					<div className="flex items-center gap-2">
						<Users className="w-4 md:w-5 h-4 md:h-5" />
						<span>50,000+ learners</span>
					</div>
					<div className="flex items-center gap-2">
						<BookOpen className="w-4 md:w-5 h-4 md:h-5" />
						<span>2M+ flashcards</span>
					</div>
					<div className="flex items-center gap-2">
						<Star className="w-4 md:w-5 h-4 md:h-5" />
						<span>4.9/5 rating</span>
					</div>
					<div className="flex items-center gap-2">
						<Target className="w-4 md:w-5 h-4 md:h-5" />
						<span>89% retention rate</span>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section id="services" className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="flex items-center gap-6 md:gap-10">
						<div className="space-y-2 md:space-y-4">
							<Heading size="2xl md:3xl">Features</Heading>
							<p className="max-w-lg text-gray-400 text-base md:text-lg">
								Powerful AI-driven tools designed to accelerate your learning
								journey and improve retention.
							</p>
						</div>
					</div>

					<div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
						{services.map((service, serviceIndex) => (
							<Card
								key={`service-${serviceIndex}`}
								className="bg-zinc-950 shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] hover:shadow-[0_5px_0_0_rgba(163,230,53,0.4)] border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
							>
								<CardContent className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 p-6 md:p-12">
									<div className="flex-1 space-y-4 md:space-y-6">
										<div className="space-y-1 md:space-y-2">
											{service.title.map((line, lineIndex) => (
												<Heading
													key={`title-${serviceIndex}-${lineIndex}`}
													size="lg md:2xl"
												>
													{line}
												</Heading>
											))}
										</div>
										<div className="flex items-center gap-3">
											<div className="flex justify-center items-center bg-lime-400 rounded-full w-8 md:w-10 h-8 md:h-10">
												<ArrowRight className="w-4 md:w-5 h-4 md:h-5 text-black" />
											</div>
											<span className="font-medium text-lime-300 text-sm md:text-base">
												Learn more
											</span>
										</div>
									</div>
									<div className="opacity-80 text-4xl md:text-6xl">
										{service.illustration}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
					<CardContent className="flex lg:flex-row flex-col items-center gap-8 md:gap-12 p-8 md:p-16">
						<div className="flex-1 space-y-4 md:space-y-6 lg:text-left text-center">
							<h2 className="font-bold text-gray-100 text-2xl md:text-4xl">
								Ready to revolutionize your learning?
							</h2>
							<p className="text-gray-400 text-base md:text-lg">
								Join thousands of learners who are already using AI to study
								smarter, not harder. Start your journey to better grades and
								deeper understanding today.
							</p>
							<Button
								size="lg"
								className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
								onClick={handleGetStarted}
							>
								Get Your Free Account
							</Button>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">🚀</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Working Process Section */}
			<section id="process" className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="flex items-center gap-6 md:gap-10">
						<div className="space-y-2 md:space-y-4">
							<Heading size="2xl md:3xl">How it Works</Heading>
							<p className="max-w-lg text-gray-400 text-base md:text-lg">
								Simple steps to transform your learning experience with
								AI-powered tools.
							</p>
						</div>
					</div>

					<div className="space-y-4 md:space-y-6">
						{processSteps.map((step, stepIndex) => (
							<Card
								key={`process-${stepIndex}`}
								className={`${stepIndex === activeProcess ? "bg-lime-400" : "bg-zinc-950"} border-zinc-800 border rounded-[25px] md:rounded-[45px] shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] overflow-hidden transition-all duration-300`}
							>
								<CardContent className="p-6 md:p-8">
									<button
										type="button"
										className="flex justify-between items-center w-full text-left cursor-pointer"
										onClick={() =>
											setActiveProcess(
												activeProcess === stepIndex ? -1 : stepIndex,
											)
										}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												setActiveProcess(
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

			{/* Team Section */}
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

			{/* Testimonials Section */}
			<section id="testimonials" className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="flex items-center gap-6 md:gap-10">
						<div className="space-y-2 md:space-y-4">
							<Heading size="2xl md:3xl">Testimonials</Heading>
							<p className="max-w-lg text-gray-400 text-base md:text-lg">
								Hear from learners who transformed their study habits with
								Anzii.
							</p>
						</div>
					</div>

					<Card className="bg-black border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
						<CardContent className="p-8 md:p-16">
							<div className="gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3">
								{testimonials.map((testimonial, testimonialIndex) => (
									<div
										key={`testimonial-${testimonialIndex}`}
										className="space-y-3 md:space-y-4"
									>
										<div className="relative bg-zinc-950 p-6 md:p-8 border border-zinc-800 rounded-[20px] md:rounded-[30px]">
											<p className="text-gray-200 text-sm md:text-base leading-relaxed">
												"{testimonial.text}"
											</p>
											<div className="-bottom-2 left-6 md:left-8 absolute bg-zinc-950 border-zinc-800 border-b border-l w-3 md:w-4 h-3 md:h-4 rotate-45 transform"></div>
										</div>
										<p className="font-medium text-gray-100 text-sm md:text-base">
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

			{/* Contact Section */}
			<section id="contact" className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="flex items-center gap-6 md:gap-10">
						<div className="space-y-2 md:space-y-4">
							<Heading size="2xl md:3xl">Contact Us</Heading>
							<p className="max-w-lg text-gray-400 text-base md:text-lg">
								Ready to get started? Let's discuss how Anzii can transform your
								learning journey.
							</p>
						</div>
					</div>

					<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
						<CardContent className="flex lg:flex-row flex-col gap-8 md:gap-12 p-8 md:p-16">
							<div className="flex-1">
								<form
									onSubmit={handleContactSubmit}
									className="space-y-4 md:space-y-6"
								>
									<div className="flex sm:flex-row flex-col gap-4 md:gap-8">
										<label className="flex items-center gap-3 cursor-pointer">
											<div
												className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-zinc-700 flex items-center justify-center ${contactType === "demo" ? "bg-lime-400 border-lime-400" : "bg-zinc-900"}`}
											>
												{contactType === "demo" && (
													<div className="bg-black rounded-full w-2 md:w-3 h-2 md:h-3"></div>
												)}
											</div>
											<span className="text-gray-300 text-sm md:text-base">
												Book a Demo
											</span>
											<input
												type="radio"
												name="contactType"
												value="demo"
												checked={contactType === "demo"}
												onChange={(e) => setContactType(e.target.value)}
												className="hidden"
											/>
										</label>
										<label className="flex items-center gap-3 cursor-pointer">
											<div
												className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-zinc-700 flex items-center justify-center ${contactType === "support" ? "bg-lime-400 border-lime-400" : "bg-zinc-900"}`}
											>
												{contactType === "support" && (
													<div className="bg-black rounded-full w-2 md:w-3 h-2 md:h-3"></div>
												)}
											</div>
											<span className="text-gray-300 text-sm md:text-base">
												Get Support
											</span>
											<input
												type="radio"
												name="contactType"
												value="support"
												checked={contactType === "support"}
												onChange={(e) => setContactType(e.target.value)}
												className="hidden"
											/>
										</label>
									</div>

									<div className="space-y-3 md:space-y-4">
										<div className="space-y-1">
											<label
												htmlFor="name-input"
												className="font-medium text-gray-300 text-sm md:text-base"
											>
												Name
											</label>
											<Input
												id="name-input"
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder="Your name"
												className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
												required
											/>
										</div>
										<div className="space-y-1">
											<label
												htmlFor="email-input"
												className="font-medium text-gray-300 text-sm md:text-base"
											>
												Email*
											</label>
											<Input
												id="email-input"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Your email"
												className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
												required
											/>
										</div>
										<div className="space-y-1">
											<label
												htmlFor="message-input"
												className="font-medium text-gray-300 text-sm md:text-base"
											>
												Message*
											</label>
											<Textarea
												id="message-input"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												placeholder="Tell us about your learning goals..."
												className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 min-h-[100px] md:min-h-[120px] text-gray-100 placeholder:text-gray-500"
												required
											/>
										</div>
									</div>

									<Button
										type="submit"
										size="lg"
										className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full font-semibold text-black text-base md:text-lg"
									>
										Send Message
									</Button>
								</form>
							</div>
							<div className="flex flex-1 justify-center items-center">
								<div className="text-6xl md:text-8xl">📧</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-4 md:px-24 py-8 md:py-16">
				<Card className="bg-black border border-zinc-800 rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
					<CardContent className="space-y-8 md:space-y-12 p-8 md:p-16">
						<div className="flex lg:flex-row flex-col gap-8 md:gap-12">
							<div className="flex-1 space-y-6 md:space-y-8">
								<div className="flex md:flex-row flex-col items-start md:items-center gap-6 md:gap-8">
									<div className="text-white">
										<AppLogo />
									</div>
									<div className="flex flex-wrap gap-4 md:gap-8 text-gray-400 text-sm md:text-base">
										<a
											href="#services"
											className="hover:text-lime-400 transition-colors"
										>
											Features
										</a>
										<a
											href="#process"
											className="hover:text-lime-400 transition-colors"
										>
											How it Works
										</a>
										<a
											href="#testimonials"
											className="hover:text-lime-400 transition-colors"
										>
											Reviews
										</a>
										<a
											href="#contact"
											className="hover:text-lime-400 transition-colors"
										>
											Contact
										</a>
									</div>
									<div className="flex gap-4">
										<div className="flex justify-center items-center bg-lime-400 rounded-full w-6 md:w-8 h-6 md:h-8">
											<Linkedin className="w-3 md:w-4 h-3 md:h-4 text-black" />
										</div>
									</div>
								</div>
							</div>
							<div className="flex-1 space-y-4 md:space-y-6">
								<div className="space-y-3 md:space-y-4">
									<Heading size="lg">Contact us:</Heading>
									<div className="space-y-2 text-gray-400 text-sm md:text-base">
										<p>Email: hello@anzii.com</p>
										<p>Phone: 1-800-ANZII-AI</p>
										<p>
											Address: 123 AI Street
											<br />
											San Francisco, CA 94105
										</p>
									</div>
								</div>
								<div className="flex sm:flex-row flex-col gap-3 md:gap-4 bg-zinc-950 p-4 md:p-6 border border-zinc-800 rounded-xl">
									<Input
										type="email"
										placeholder="Email"
										className="flex-1 bg-transparent border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
									/>
									<Button className="bg-lime-400 hover:bg-lime-500 px-4 md:px-6 rounded-xl font-semibold text-black text-sm md:text-base">
										Subscribe to newsletter
									</Button>
								</div>
							</div>
						</div>
						<div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-6 md:pt-8 border-zinc-800 border-t">
							<p className="text-gray-500 text-sm md:text-base">
								© 2024 Anzii. All Rights Reserved.
							</p>
							<p className="text-gray-500 hover:text-lime-400 text-sm md:text-base transition-colors cursor-pointer">
								Privacy Policy
							</p>
						</div>
					</CardContent>
				</Card>
			</footer>
		</div>
	);
}
