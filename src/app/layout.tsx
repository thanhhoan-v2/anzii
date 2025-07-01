import "./globals.css";

import { StackProvider } from "@stackframe/stack";
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
	title: "Anzii - Your Modern Flashcard Companion",
	description:
		"An Anki-like application for spaced repetition learning, with AI-powered question suggestions.",
	keywords:
		"flashcards, spaced repetition, learning, AI, study, education, memory, Anki",
	authors: [{ name: "Anzii Team" }],
	creator: "Anzii",
	publisher: "Anzii",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://anzii.vercel.app"),
	alternates: {
		canonical: "https://anzii.vercel.app",
	},
	openGraph: {
		title: "Anzii - Your Modern Flashcard Companion",
		description:
			"An Anki-like application for spaced repetition learning, with AI-powered question suggestions.",
		url: "https://anzii.vercel.app",
		siteName: "Anzii",
		locale: "en_US",
		type: "website",
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
	verification: {
		google: "your-google-verification-code-here",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${spaceGrotesk.variable} font-space-grotesk antialiased`}
			>
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
