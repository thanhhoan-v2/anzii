import "./globals.css";

import { StackProvider } from "@stackframe/stack";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
	Inter,
	Lato,
	Merriweather,
	Montserrat,
	Nunito_Sans,
	Open_Sans,
	Oswald,
	Outfit,
	Playfair_Display,
	Poppins,
	Raleway,
	Roboto,
	Source_Sans_3,
	Space_Grotesk,
	Work_Sans,
} from "next/font/google";

import { QueryProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { ColorSchemeProvider } from "@/hooks/use-color-scheme";
import { FontProvider } from "@/hooks/use-font";
import { stackServerApp } from "@/stack";

// Font configuration
const space_grotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-nunito-sans",
	display: "swap",
});

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-work-sans",
	display: "swap",
});

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-outfit",
	display: "swap",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-montserrat",
	display: "swap",
});

const sourceSansPro = Source_Sans_3({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-source-sans-pro",
	display: "swap",
});

const lato = Lato({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-lato",
	display: "swap",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-open-sans",
	display: "swap",
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-roboto",
	display: "swap",
});

const oswald = Oswald({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-oswald",
	display: "swap",
});

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-raleway",
	display: "swap",
});

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-playfair-display",
	display: "swap",
});

const merriweather = Merriweather({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-merriweather",
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
			<body
				className={`${space_grotesk.variable} ${inter.variable} ${poppins.variable} ${nunitoSans.variable} ${workSans.variable} ${outfit.variable} ${montserrat.variable} ${sourceSansPro.variable} ${lato.variable} ${openSans.variable} ${roboto.variable} ${oswald.variable} ${raleway.variable} ${playfairDisplay.variable} ${merriweather.variable} antialiased`}
			>
				<SpeedInsights />
				<Analytics />
				<QueryProvider>
					<ColorSchemeProvider>
						<FontProvider>
							<StackProvider app={stackServerApp}>
								{children}
								<Toaster />
							</StackProvider>
						</FontProvider>
					</ColorSchemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
