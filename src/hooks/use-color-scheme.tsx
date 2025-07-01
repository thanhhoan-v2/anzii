"use client";

import { StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "next-themes";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import {
	COLOR_SCHEMES,
	DEFAULT_COLOR_SCHEME,
	type IColorScheme,
} from "@/types/colorscheme";

interface ColorSchemeContextType {
	colorScheme: string;
	colorSchemeData: IColorScheme;
	setColorScheme: (scheme: string) => void;
	availableSchemes: IColorScheme[];
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(
	undefined
);

// Stack theme configuration
const stackTheme = {
	light: {
		background: "hsl(0, 0%, 100%)",
		foreground: "hsl(0, 0%, 0%)",
		card: "hsl(0, 0%, 100%)",
		cardForeground: "hsl(0, 0%, 0%)",
		popover: "hsl(0, 0%, 100%)",
		popoverForeground: "hsl(0, 0%, 0%)",
		primary: "hsl(83, 76%, 56%)", // lime-400 (#a3e635)
		primaryForeground: "hsl(0, 0%, 0%)", // black text on lime
		secondary: "hsl(210, 40%, 96%)",
		secondaryForeground: "hsl(0, 0%, 0%)",
		muted: "hsl(210, 40%, 96%)",
		mutedForeground: "hsl(215.4, 16.3%, 46.9%)",
		accent: "hsl(83, 76%, 56%)", // lime-400
		accentForeground: "hsl(0, 0%, 0%)",
		destructive: "hsl(0, 84.2%, 60.2%)",
		destructiveForeground: "hsl(0, 0%, 100%)",
		border: "hsl(214.3, 31.8%, 91.4%)",
		input: "hsl(0, 0%, 100%)",
		ring: "hsl(83, 76%, 56%)", // lime-400
	},
	dark: {
		background: "hsl(0, 0%, 0%)", // black background
		foreground: "hsl(0, 0%, 100%)", // white text
		card: "hsl(0, 0%, 0%)",
		cardForeground: "hsl(0, 0%, 100%)",
		popover: "hsl(0, 0%, 0%)",
		popoverForeground: "hsl(0, 0%, 100%)",
		primary: "hsl(83, 76%, 56%)", // lime-400 (#a3e635)
		primaryForeground: "hsl(0, 0%, 0%)", // black text on lime
		secondary: "hsl(240, 5%, 11%)", // zinc-900
		secondaryForeground: "hsl(0, 0%, 100%)",
		muted: "hsl(240, 5%, 11%)", // zinc-900
		mutedForeground: "hsl(240, 5%, 65%)", // zinc-400
		accent: "hsl(83, 76%, 56%)", // lime-400
		accentForeground: "hsl(0, 0%, 0%)",
		destructive: "hsl(0, 62.8%, 30.6%)",
		destructiveForeground: "hsl(0, 0%, 100%)",
		border: "hsl(240, 4%, 16%)", // zinc-800
		input: "hsl(240, 5%, 11%)", // zinc-900
		ring: "hsl(83, 76%, 56%)", // lime-400
	},
	radius: "0.75rem", // 12px to match rounded-xl
};

interface ColorSchemeProviderProps {
	children: React.ReactNode;
}

// Stack Theme Wrapper Component
function StackThemeWrapper({ children }: { children: React.ReactNode }) {
	return <StackTheme theme={stackTheme}>{children}</StackTheme>;
}

// Inner ColorScheme Provider that uses next-themes
function InnerColorSchemeProvider({ children }: ColorSchemeProviderProps) {
	const [colorScheme, setColorSchemeState] =
		useState<string>(DEFAULT_COLOR_SCHEME);

	// Get current color scheme data
	const colorSchemeData =
		COLOR_SCHEMES.find((scheme) => scheme.id === colorScheme) ||
		COLOR_SCHEMES[0];

	// Apply color scheme to CSS custom properties
	const applyColorScheme = useCallback((scheme: IColorScheme) => {
		const root = document.documentElement;

		// Apply all CSS custom properties
		root.style.setProperty("--background", scheme.colors.background);
		root.style.setProperty("--foreground", scheme.colors.foreground);
		root.style.setProperty("--card", scheme.colors.card);
		root.style.setProperty("--card-foreground", scheme.colors.cardForeground);
		root.style.setProperty("--popover", scheme.colors.popover);
		root.style.setProperty(
			"--popover-foreground",
			scheme.colors.popoverForeground
		);
		root.style.setProperty("--primary", scheme.colors.primary);
		root.style.setProperty(
			"--primary-foreground",
			scheme.colors.primaryForeground
		);
		root.style.setProperty("--secondary", scheme.colors.secondary);
		root.style.setProperty(
			"--secondary-foreground",
			scheme.colors.secondaryForeground
		);
		root.style.setProperty("--accent", scheme.colors.accent);
		root.style.setProperty(
			"--accent-foreground",
			scheme.colors.accentForeground
		);
		root.style.setProperty("--muted", scheme.colors.muted);
		root.style.setProperty("--muted-foreground", scheme.colors.mutedForeground);
		root.style.setProperty("--destructive", scheme.colors.destructive);
		root.style.setProperty(
			"--destructive-foreground",
			scheme.colors.destructiveForeground
		);
		root.style.setProperty("--success", scheme.colors.success);
		root.style.setProperty(
			"--success-foreground",
			scheme.colors.successForeground
		);
		root.style.setProperty("--warning", scheme.colors.warning);
		root.style.setProperty(
			"--warning-foreground",
			scheme.colors.warningForeground
		);
		root.style.setProperty("--border", scheme.colors.border);
		root.style.setProperty("--input", scheme.colors.input);
		root.style.setProperty("--ring", scheme.colors.ring);
	}, []);

	// Load color scheme from localStorage on mount
	useEffect(() => {
		const savedScheme = localStorage.getItem("color-scheme");
		if (
			savedScheme &&
			COLOR_SCHEMES.find((scheme) => scheme.id === savedScheme)
		) {
			setColorSchemeState(savedScheme);
		}
	}, []);

	// Apply color scheme whenever it changes
	useEffect(() => {
		applyColorScheme(colorSchemeData);
	}, [colorSchemeData, applyColorScheme]);

	const setColorScheme = (scheme: string) => {
		const schemeData = COLOR_SCHEMES.find((s) => s.id === scheme);
		if (schemeData) {
			setColorSchemeState(scheme);
			localStorage.setItem("color-scheme", scheme);
			applyColorScheme(schemeData);
		}
	};

	return (
		<ColorSchemeContext.Provider
			value={{
				colorScheme,
				colorSchemeData,
				setColorScheme,
				availableSchemes: COLOR_SCHEMES,
			}}
		>
			<StackThemeWrapper>{children}</StackThemeWrapper>
		</ColorSchemeContext.Provider>
	);
}

// Main ColorScheme Provider that wraps next-themes
export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<InnerColorSchemeProvider>{children}</InnerColorSchemeProvider>
		</ThemeProvider>
	);
}

export function useColorScheme() {
	const context = useContext(ColorSchemeContext);
	if (context === undefined) {
		throw new Error("useColorScheme must be used within a ColorSchemeProvider");
	}
	return context;
}

// Re-export useTheme from next-themes for convenience
export { useTheme } from "next-themes";
