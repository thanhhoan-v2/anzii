"use client";

import {
	COLOR_SCHEMES,
	type ColorScheme,
	DEFAULT_COLOR_SCHEME,
} from "@/types/theme";
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

interface ColorSchemeProviderProps {
	children: React.ReactNode;
}

export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
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
			{children}
		</ColorSchemeContext.Provider>
	);
}

export function useColorScheme() {
	const context = useContext(ColorSchemeContext);
	if (context === undefined) {
		throw new Error("useColorScheme must be used within a ColorSchemeProvider");
	}
	return context;
}
