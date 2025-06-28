import { Toaster } from "@/components/ui/toaster";
import { ColorSchemeProvider } from "@/hooks/useColorScheme";
import type { Metadata } from "next";
import { Inter, Moirai_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const moiraiOne = Moirai_One({
	subsets: ["latin"],
	variable: "--font-serif",
	weight: "400",
});

const metadata: Metadata = {
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
			<body className={`${inter.variable} font-sans antialiased`}>
				<ColorSchemeProvider>
					{children}
					<Toaster />
				</ColorSchemeProvider>
			</body>
		</html>
	);
}
