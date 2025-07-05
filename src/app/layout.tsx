import "./globals.css";

import { StackProvider } from "@stackframe/stack";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Moirai_One, Space_Grotesk } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { ColorSchemeProvider } from "@/hooks/use-color-scheme";
import { stackServerApp } from "@/stack";

export const moiraiOne = Moirai_One({
	subsets: ["latin"],
	variable: "--font-serif",
	weight: "400",
});
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Anzii - AI-Powered Flashcards for Smarter Learning",
	description:
		"Transform your study routine with AI-generated flashcards and scientifically-proven spaced repetition. Boost retention by 89% with personalized learning algorithms.",
	keywords:
		"flashcards, spaced repetition, learning, AI, study, education, memory, Anki, AI flashcards, smart learning, study app",
	authors: [{ name: "Anzii Team" }],
	creator: "Anzii",
	publisher: "Anzii",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://anzii.space"),
	alternates: {
		canonical: "https://anzii.space",
	},
	openGraph: {
		title: "Anzii - AI-Powered Flashcards for Smarter Learning",
		description:
			"Transform your study routine with AI-generated flashcards and scientifically-proven spaced repetition. Boost retention by 89% with personalized learning algorithms.",
		url: "https://anzii.space",
		siteName: "Anzii",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://anzii.space/og-image.png",
				width: 1200,
				height: 630,
				alt: "Anzii - AI-Powered Flashcards for Smarter Learning",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@anzii_app",
		creator: "@anzii_app",
		title: "Anzii - AI-Powered Flashcards for Smarter Learning",
		description:
			"Transform your study routine with AI-generated flashcards and scientifically-proven spaced repetition. Boost retention by 89% with personalized learning algorithms.",
		images: ["https://anzii.space/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="google-site-verification"
					content="Sep1E3CQFEOuAAP3wkvtqsWA0einNzMAon6JaeDZAZI"
				/>
			</head>
			<body
				className={`${spaceGrotesk.variable} font-space-grotesk antialiased`}
			>
				<SpeedInsights />
				<ColorSchemeProvider>
					<StackProvider app={stackServerApp}>
						{children}
						<Toaster />
					</StackProvider>
				</ColorSchemeProvider>
			</body>
		</html>
	);
}
