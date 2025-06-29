import { Toaster } from "@/components/ui/toaster";
import { ColorSchemeProvider } from "@/hooks/use-color-scheme";
import { StackProvider } from "@stackframe/stack";
import type { Metadata } from "next";
import { Inter, Moirai_One, Space_Grotesk } from "next/font/google";
import { stackServerApp } from "../stack";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
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
