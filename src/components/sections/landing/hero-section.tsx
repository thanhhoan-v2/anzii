"use client";

import { easeInOut, motion } from "framer-motion";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import { Pacifico } from "next/font/google";

import { ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-pacifico",
});

function ElegantShape({
	className,
	delay = 0,
	width = 400,
	height = 100,
	rotate = 0,
	gradient = "from-white/[0.08]",
}: {
	className?: string;
	delay?: number;
	width?: number;
	height?: number;
	rotate?: number;
	gradient?: string;
}) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: -150,
				rotate: rotate - 15,
			}}
			animate={{
				opacity: 1,
				y: 0,
				rotate: rotate,
			}}
			transition={{
				duration: 2.4,
				delay,
				ease: [0.23, 0.86, 0.39, 0.96],
				opacity: { duration: 1.2 },
			}}
			className={cn("absolute", className)}
		>
			<motion.div
				animate={{
					y: [0, 15, 0],
				}}
				transition={{
					duration: 12,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				style={{
					width,
					height,
				}}
				className="relative"
			>
				<div
					className={cn(
						"absolute inset-0 rounded-full",
						"bg-gradient-to-r to-transparent",
						gradient,
						"border-2 border-white/80 backdrop-blur-[2px] dark:border-white/80",
						"shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.5)]",
						"after:absolute after:inset-0 after:rounded-full",
						"after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.6),transparent_70%)]",
						"dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),transparent_70%)]"
					)}
				/>
			</motion.div>
		</motion.div>
	);
}

export default function HeroSection({
	badge = "v0.4.0",
	title1 = "AI-Powered",
	title2 = "Flash Card Learning",
	description = "Accelerate your learning with our AI-powered flash card learning platform, where you can create flash cards, study them, and track your progress.",
}: {
	badge?: string;
	title1?: string;
	title2?: string;
	description?: string;
}) {
	const fadeUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				delay: 0.5 + i * 0.2,
				ease: easeInOut,
			},
		}),
	};

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background dark:bg-black">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-rose-500/20 blur-3xl dark:from-primary/30 dark:to-rose-500/30" />

			<div className="absolute inset-0 overflow-hidden">
				<ElegantShape
					delay={0.3}
					width={600}
					height={140}
					rotate={12}
					gradient="from-indigo-500/70"
					className="left-[5%] top-[15%] md:left-[10%] md:top-[20%]"
				/>

				<ElegantShape
					delay={0.5}
					width={500}
					height={120}
					rotate={-15}
					gradient="from-rose-400"
					className="right-[5%] top-[70%] md:right-[10%] md:top-[75%]"
				/>

				<ElegantShape
					delay={0.4}
					width={300}
					height={80}
					rotate={-8}
					gradient="from-violet-400"
					className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
				/>

				<ElegantShape
					delay={0.6}
					width={200}
					height={60}
					rotate={20}
					gradient="from-amber-500/70 dark:from-amber-400/90"
					className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
				/>

				<ElegantShape
					delay={0.7}
					width={150}
					height={40}
					rotate={-25}
					gradient="from-cyan-500/70 dark:from-cyan-400/90"
					className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
				/>
			</div>

			<div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
				<div className="mx-auto max-w-3xl text-center">
					<motion.div
						custom={0}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/50 px-4 py-1.5 shadow-sm backdrop-blur-sm md:mb-12"
					>
						<BadgeCheckIcon className="h-4 w-4" />
						<span className="text-sm font-medium tracking-wide text-foreground">
							{badge}
						</span>
					</motion.div>

					<motion.div
						custom={1}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
					>
						<h1 className="mx-4 mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
							<span className="bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
								{title1}
							</span>
							<br />
							<span
								className={cn(
									"bg-gradient-to-r from-primary via-primary/90 to-rose-500 bg-clip-text p-4 text-transparent",
									pacifico.className,
									"font-bold"
								)}
							>
								{title2}
							</span>
						</h1>
					</motion.div>

					<motion.div
						custom={2}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
					>
						<p className="mx-auto mb-10 max-w-xl px-4 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
							{description}
						</p>
					</motion.div>

					<motion.div
						custom={3}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						className="flex flex-col justify-center gap-4 sm:flex-row"
					>
						<ButtonWithLink
							href={ROUTES.SIGN_IN}
							className="w-[200px] rounded-full border-none bg-gradient-to-r from-primary to-rose-500 shadow-md shadow-primary/10 hover:from-primary/90 hover:to-rose-500/90"
						>
							Get Started
							<ArrowRight className="ml-2 h-4 w-4" />
						</ButtonWithLink>
					</motion.div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 dark:from-black dark:to-black/80" />
		</div>
	);
}
