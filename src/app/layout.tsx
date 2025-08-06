import "./globals.css";

import { StackProvider } from "@stackframe/stack";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { ColorSchemeProvider } from "@/hooks/use-color-scheme";
import { stackServerApp } from "@/stack";

// Font configuration
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
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
					content={process.env.GOOGLE_SITE_VERIFICATION}
				/>
			</head>
			<body className={`${inter.variable} font-sans antialiased`}>
				<SpeedInsights />
				<Analytics />
				<QueryProvider>
					<ColorSchemeProvider>
						<StackProvider app={stackServerApp}>
							{children}
							<Toaster />
						</StackProvider>
					</ColorSchemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
