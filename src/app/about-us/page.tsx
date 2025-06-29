"use client";

import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/app-header";
import AppLogo from "@/components/layout/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Linkedin, Star, Target, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
	const router = useRouter();

	const handleGetStarted = () => {
		router.push("/dashboard");
	};

	const values = [
		{
			title: "Innovation First",
			description:
				"We believe in pushing the boundaries of what's possible with AI to create revolutionary learning experiences.",
			icon: "💡",
		},
		{
			title: "Learner-Centric",
			description:
				"Every decision we make is guided by what will best serve our learners and their educational goals.",
			icon: "🎯",
		},
		{
			title: "Scientific Approach",
			description:
				"Our methods are grounded in cognitive science and proven learning theories for maximum effectiveness.",
			icon: "🔬",
		},
		{
			title: "Accessibility",
			description:
				"Quality education should be available to everyone, regardless of background or circumstance.",
			icon: "🌍",
		},
	];

	const teamMembers = [
		{
			name: "Alex Thompson",
			role: "CEO & Founder",
			description:
				"10+ years in EdTech. Former ML engineer at Google with a passion for democratizing education through AI. Alex holds a PhD in Computer Science from MIT and has published numerous papers on machine learning applications in education.",
			image: "👨‍💼",
			linkedin: "#",
		},
		{
			name: "Priya Patel",
			role: "Head of AI",
			description:
				"PhD in Machine Learning from Stanford. Expert in natural language processing and educational AI systems. Priya previously led AI initiatives at Khan Academy and has been featured in Forbes 30 Under 30.",
			image: "👩‍💻",
			linkedin: "#",
		},
		{
			name: "Jordan Kim",
			role: "UX Director",
			description:
				"Award-winning designer with 8+ years creating intuitive learning experiences for millions of users. Jordan's work has been recognized by the Design Museum and featured in multiple UX publications.",
			image: "👨‍🎨",
			linkedin: "#",
		},
		{
			name: "Maria Rodriguez",
			role: "Head of Research",
			description:
				"Cognitive scientist with expertise in memory and learning. Former researcher at the University of California, Berkeley. Maria's research on spaced repetition has been published in top academic journals.",
			image: "👩‍🔬",
			linkedin: "#",
		},
		{
			name: "David Chen",
			role: "CTO",
			description:
				"Full-stack engineer with 12+ years experience building scalable platforms. Former tech lead at Stripe. David specializes in building robust, performant systems that can handle millions of users.",
			image: "👨‍💻",
			linkedin: "#",
		},
		{
			name: "Sarah Johnson",
			role: "Head of Education",
			description:
				"Former professor of Education Technology at Harvard. 15+ years experience in curriculum design and educational methodology. Sarah ensures our platform aligns with best practices in learning.",
			image: "👩‍🏫",
			linkedin: "#",
		},
	];

	const milestones = [
		{
			year: "2020",
			title: "The Idea",
			description:
				"Founded with the vision to revolutionize learning through AI technology",
		},
		{
			year: "2021",
			title: "First Beta",
			description:
				"Launched closed beta with 100 students, achieving 95% satisfaction rate",
		},
		{
			year: "2022",
			title: "AI Breakthrough",
			description:
				"Developed proprietary spaced repetition algorithm with 40% better retention",
		},
		{
			year: "2023",
			title: "Scale & Growth",
			description: "Reached 10,000+ active learners across 50+ countries",
		},
		{
			year: "2024",
			title: "Next Chapter",
			description:
				"Expanding with enterprise solutions and advanced AI features",
		},
	];

	return (
		<div className="bg-black min-h-screen">
			{/* Navigation */}
			<AppHeader />

			{/* Hero Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12 text-center">
					<div className="space-y-4 md:space-y-6">
						<h1 className="font-bold text-gray-100 text-3xl md:text-5xl lg:text-6xl leading-tight">
							Revolutionizing Learning Through AI
						</h1>
						<p className="mx-auto max-w-3xl text-gray-400 text-lg md:text-xl">
							We're on a mission to make high-quality education accessible to
							everyone through intelligent, personalized learning experiences
							powered by cutting-edge AI technology.
						</p>
					</div>
					<div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-80 text-gray-500 text-sm md:text-base">
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
							<span>40+ countries</span>
						</div>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
					<CardContent className="flex lg:flex-row flex-col items-center gap-8 md:gap-12 p-8 md:p-16">
						<div className="flex-1 space-y-4 md:space-y-6">
							<Heading size="2xl md:3xl">Our Mission</Heading>
							<p className="text-gray-400 text-base md:text-lg leading-relaxed">
								Education is the most powerful tool for personal and societal
								transformation. Yet traditional learning methods haven't evolved
								with our understanding of how the brain actually learns. We're
								changing that by combining cognitive science with artificial
								intelligence to create personalized learning experiences that
								adapt to each individual's unique learning style and pace.
							</p>
							<p className="text-gray-400 text-base md:text-lg leading-relaxed">
								Our vision is a world where anyone, anywhere, can master any
								subject efficiently and enjoyably. Through AI-powered spaced
								repetition, intelligent content generation, and data-driven
								insights, we're making this vision a reality for millions of
								learners worldwide.
							</p>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">🎯</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Values Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="space-y-4 text-center">
						<Heading size="2xl md:3xl">Our Values</Heading>
						<p className="mx-auto max-w-2xl text-gray-400 text-base md:text-lg">
							The principles that guide everything we do and every decision we
							make.
						</p>
					</div>

					<div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
						{values.map((value, index) => (
							<Card
								key={index}
								className="bg-zinc-950 shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] hover:shadow-[0_5px_0_0_rgba(163,230,53,0.4)] border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
							>
								<CardContent className="space-y-4 md:space-y-6 p-6 md:p-8">
									<div className="flex items-center gap-4">
										<div className="text-3xl md:text-4xl">{value.icon}</div>
										<Heading size="lg md:xl">{value.title}</Heading>
									</div>
									<p className="text-gray-400 text-base md:text-lg">
										{value.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="space-y-4 text-center">
						<Heading size="2xl md:3xl">Our Journey</Heading>
						<p className="mx-auto max-w-2xl text-gray-400 text-base md:text-lg">
							From a simple idea to a platform transforming how millions learn.
						</p>
					</div>

					<div className="space-y-4 md:space-y-6">
						{milestones.map((milestone, index) => (
							<Card
								key={index}
								className="bg-zinc-950 shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden"
							>
								<CardContent className="flex items-center gap-6 md:gap-8 p-6 md:p-8">
									<div className="flex justify-center items-center bg-lime-400 rounded-full w-12 md:w-16 h-12 md:h-16 font-bold text-black text-lg md:text-xl">
										{milestone.year}
									</div>
									<div className="flex-1 space-y-2">
										<h3 className="font-bold text-gray-100 text-lg md:text-xl">
											{milestone.title}
										</h3>
										<p className="text-gray-400 text-base md:text-lg">
											{milestone.description}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="px-4 md:px-24 py-12 md:py-20">
				<div className="space-y-8 md:space-y-12">
					<div className="space-y-4 text-center">
						<Heading size="2xl md:3xl">Meet Our Team</Heading>
						<p className="mx-auto max-w-2xl text-gray-400 text-base md:text-lg">
							Passionate experts from diverse backgrounds united by a shared
							vision of transforming education through technology.
						</p>
					</div>

					<div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{teamMembers.map((member, index) => (
							<Card
								key={index}
								className="bg-zinc-950 shadow-[0_3px_0_0_rgba(163,230,53,0.2)] md:shadow-[0_5px_0_0_rgba(163,230,53,0.2)] hover:shadow-[0_5px_0_0_rgba(163,230,53,0.4)] border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden transition-all duration-300"
							>
								<CardContent className="space-y-4 md:space-y-6 p-6 md:p-8">
									<div className="space-y-3 md:space-y-4 text-center">
										<div className="text-4xl md:text-5xl">{member.image}</div>
										<div>
											<h3 className="font-bold text-gray-100 text-lg md:text-xl">
												{member.name}
											</h3>
											<p className="text-lime-300 text-sm md:text-base">
												{member.role}
											</p>
										</div>
										<a
											href={member.linkedin}
											className="flex justify-center items-center bg-lime-400 hover:bg-lime-500 mx-auto rounded-full w-8 md:w-10 h-8 md:h-10 transition-colors"
										>
											<Linkedin className="w-4 md:w-5 h-4 md:h-5 text-black" />
										</a>
									</div>
									<div className="pt-4 md:pt-6 border-zinc-800 border-t">
										<p className="text-gray-400 text-xs md:text-sm leading-relaxed">
											{member.description}
										</p>
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
								Ready to join our mission?
							</h2>
							<p className="text-gray-400 text-base md:text-lg">
								Be part of the learning revolution. Start your journey with
								Anzii today and experience the future of personalized education.
							</p>
							<Button
								size="lg"
								className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full sm:w-auto font-semibold text-black text-base md:text-lg"
								onClick={handleGetStarted}
							>
								Start Learning Today
							</Button>
						</div>
						<div className="flex flex-1 justify-center">
							<div className="text-6xl md:text-8xl">🚀</div>
						</div>
					</CardContent>
				</Card>
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
											href="/features"
											className="hover:text-lime-400 transition-colors"
										>
											Features
										</a>
										<a
											href="/pricing"
											className="hover:text-lime-400 transition-colors"
										>
											Pricing
										</a>
										<a
											href="/about-us"
											className="hover:text-lime-400 transition-colors"
										>
											About
										</a>
										<a
											href="/contact"
											className="hover:text-lime-400 transition-colors"
										>
											Contact
										</a>
									</div>
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
