"use client";

import {
	COLOR_SCHEMES,
	type ColorScheme,
	DEFAULT_COLOR_SCHEME,
} from "@/types/theme";
import { StackTheme } from "@stackframe/stack";
import { ThemeProvider, useTheme } from "next-themes";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface ColorSchemeContextType {
	colorScheme: string;
	colorSchemeData: ColorScheme;
	setColorScheme: (scheme: string) => void;
	availableSchemes: ColorScheme[];
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(
	undefined,
);

// Stack theme configuration
const stackTheme = {
	light: {
		background: 'hsl(0, 0%, 100%)',
		foreground: 'hsl(222.2, 84%, 4.9%)',
		card: 'hsl(0, 0%, 100%)',
		cardForeground: 'hsl(222.2, 84%, 4.9%)',
		popover: 'hsl(0, 0%, 100%)',
		popoverForeground: 'hsl(222.2, 84%, 4.9%)',
		primary: 'hsl(222.2, 47.4%, 11.2%)',
		primaryForeground: 'hsl(210, 40%, 98%)',
		secondary: 'hsl(210, 40%, 96%)',
		secondaryForeground: 'hsl(222.2, 84%, 4.9%)',
		muted: 'hsl(210, 40%, 96%)',
		mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
		accent: 'hsl(210, 40%, 96%)',
		accentForeground: 'hsl(222.2, 84%, 4.9%)',
		destructive: 'hsl(0, 84.2%, 60.2%)',
		destructiveForeground: 'hsl(210, 40%, 98%)',
		border: 'hsl(214.3, 31.8%, 91.4%)',
		input: 'hsl(214.3, 31.8%, 91.4%)',
		ring: 'hsl(222.2, 84%, 4.9%)',
	},
	dark: {
		background: 'hsl(222.2, 84%, 4.9%)',
		foreground: 'hsl(210, 40%, 98%)',
		card: 'hsl(222.2, 84%, 4.9%)',
		cardForeground: 'hsl(210, 40%, 98%)',
		popover: 'hsl(222.2, 84%, 4.9%)',
		popoverForeground: 'hsl(210, 40%, 98%)',
		primary: 'hsl(210, 40%, 98%)',
		primaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
		secondary: 'hsl(217.2, 32.6%, 17.5%)',
		secondaryForeground: 'hsl(210, 40%, 98%)',
		muted: 'hsl(217.2, 32.6%, 17.5%)',
		mutedForeground: 'hsl(215, 20.2%, 65.1%)',
		accent: 'hsl(217.2, 32.6%, 17.5%)',
		accentForeground: 'hsl(210, 40%, 98%)',
		destructive: 'hsl(0, 62.8%, 30.6%)',
		destructiveForeground: 'hsl(210, 40%, 98%)',
		border: 'hsl(217.2, 32.6%, 17.5%)',
		input: 'hsl(217.2, 32.6%, 17.5%)',
		ring: 'hsl(212.7, 26.8%, 83.9%)',
	},
	radius: '0.5rem',
};

interface ColorSchemeProviderProps {
	children: React.ReactNode;
}

// Stack Theme Wrapper Component
function StackThemeWrapper({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();

	return (
		<StackTheme theme={stackTheme}>
			{children}
		</StackTheme>
	);
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
	const applyColorScheme = useCallback((scheme: ColorScheme) => {
		const root = document.documentElement;

		// Apply all CSS custom properties
		root.style.setProperty("--background", scheme.colors.background);
		root.style.setProperty("--foreground", scheme.colors.foreground);
		root.style.setProperty("--card", scheme.colors.card);
		root.style.setProperty("--card-foreground", scheme.colors.cardForeground);
		root.style.setProperty("--popover", scheme.colors.popover);
		root.style.setProperty(
			"--popover-foreground",
			scheme.colors.popoverForeground,
		);
		root.style.setProperty("--primary", scheme.colors.primary);
		root.style.setProperty(
			"--primary-foreground",
			scheme.colors.primaryForeground,
		);
		root.style.setProperty("--secondary", scheme.colors.secondary);
		root.style.setProperty(
			"--secondary-foreground",
			scheme.colors.secondaryForeground,
		);
		root.style.setProperty("--accent", scheme.colors.accent);
		root.style.setProperty(
			"--accent-foreground",
			scheme.colors.accentForeground,
		);
		root.style.setProperty("--muted", scheme.colors.muted);
		root.style.setProperty("--muted-foreground", scheme.colors.mutedForeground);
		root.style.setProperty("--destructive", scheme.colors.destructive);
		root.style.setProperty(
			"--destructive-foreground",
			scheme.colors.destructiveForeground,
		);
		root.style.setProperty("--success", scheme.colors.success);
		root.style.setProperty(
			"--success-foreground",
			scheme.colors.successForeground,
		);
		root.style.setProperty("--warning", scheme.colors.warning);
		root.style.setProperty(
			"--warning-foreground",
			scheme.colors.warningForeground,
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
			<StackThemeWrapper>
				{children}
			</StackThemeWrapper>
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
			<InnerColorSchemeProvider>
				{children}
			</InnerColorSchemeProvider>
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
