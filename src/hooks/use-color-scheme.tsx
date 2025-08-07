"use client";

import { StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "next-themes";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { DEFAULT_COLOR_SCHEME, type ITheme, THEMES } from "@/types/themes";

interface ColorSchemeContextType {
	colorScheme: string;
	colorSchemeName: ITheme["name"];
	colorSchemeData: ITheme;
	setColorScheme: (scheme: string) => void;
	availableSchemes: ITheme[];
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
		THEMES.find((scheme) => scheme.id === colorScheme) || THEMES[0];

	// Apply color scheme to CSS custom properties
	const applyColorScheme = useCallback((scheme: ITheme) => {
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

		// Apply additional CSS custom properties for charts and sidebar
		root.style.setProperty("--chart-1", scheme.colors.primary);
		root.style.setProperty("--chart-2", scheme.colors.secondary);
		root.style.setProperty("--chart-3", scheme.colors.accent);
		root.style.setProperty("--chart-4", scheme.colors.muted);
		root.style.setProperty("--chart-5", scheme.colors.destructive);

		// Sidebar colors (using muted variants)
		root.style.setProperty("--sidebar", scheme.colors.muted);
		root.style.setProperty(
			"--sidebar-foreground",
			scheme.colors.mutedForeground
		);
		root.style.setProperty("--sidebar-primary", scheme.colors.primary);
		root.style.setProperty(
			"--sidebar-primary-foreground",
			scheme.colors.primaryForeground
		);
		root.style.setProperty("--sidebar-accent", scheme.colors.accent);
		root.style.setProperty(
			"--sidebar-accent-foreground",
			scheme.colors.accentForeground
		);
		root.style.setProperty("--sidebar-border", scheme.colors.border);
		root.style.setProperty("--sidebar-ring", scheme.colors.ring);

		// Apply theme-specific properties for retro minimal theme
		if (scheme.id === "retro-minimal" || scheme.id === "retro-minimal-dark") {
			// Custom border radius (0px for sharp edges)
			root.style.setProperty("--radius", "0px");

			// Custom shadows for retro theme
			const shadowColor =
				scheme.id === "retro-minimal"
					? "hsl(0 0% 0% / 0.50)"
					: "hsl(0 0% 100% / 0.50)";
			const shadowColorFull =
				scheme.id === "retro-minimal"
					? "hsl(0 0% 0% / 1.00)"
					: "hsl(0 0% 100% / 1.00)";
			const shadowColor2xl =
				scheme.id === "retro-minimal"
					? "hsl(0 0% 0% / 2.50)"
					: "hsl(0 0% 100% / 2.50)";

			root.style.setProperty("--shadow-2xs", `4px 4px 0px 0px ${shadowColor}`);
			root.style.setProperty("--shadow-xs", `4px 4px 0px 0px ${shadowColor}`);
			root.style.setProperty(
				"--shadow-sm",
				`4px 4px 0px 0px ${shadowColorFull}, 4px 1px 2px -1px ${shadowColorFull}`
			);
			root.style.setProperty(
				"--shadow",
				`4px 4px 0px 0px ${shadowColorFull}, 4px 1px 2px -1px ${shadowColorFull}`
			);
			root.style.setProperty(
				"--shadow-md",
				`4px 4px 0px 0px ${shadowColorFull}, 4px 2px 4px -1px ${shadowColorFull}`
			);
			root.style.setProperty(
				"--shadow-lg",
				`4px 4px 0px 0px ${shadowColorFull}, 4px 4px 6px -1px ${shadowColorFull}`
			);
			root.style.setProperty(
				"--shadow-xl",
				`4px 4px 0px 0px ${shadowColorFull}, 4px 8px 10px -1px ${shadowColorFull}`
			);
			root.style.setProperty(
				"--shadow-2xl",
				`4px 4px 0px 0px ${shadowColor2xl}`
			);
		} else if (scheme.id === "retro-minimal") {
			// Neo Brutalism theme - bold, heavy shadows

			// Sharp edges for neo-brutalism
			root.style.setProperty("--radius", "0px");

			// Neo-brutalist shadows - heavy, offset, layered
			root.style.setProperty("--shadow-2xs", "4px 4px 0px 0px #000");
			root.style.setProperty("--shadow-xs", "6px 6px 0px 0px #000");
			root.style.setProperty(
				"--shadow-sm",
				"8px 8px 0px 0px #000, 4px 4px 0px 0px #000"
			);
			root.style.setProperty(
				"--shadow",
				"8px 8px 0px 0px #000, 4px 4px 0px 0px #000"
			);
			root.style.setProperty(
				"--shadow-md",
				"12px 12px 0px 0px #000, 8px 8px 0px 0px #000"
			);
			root.style.setProperty(
				"--shadow-lg",
				"16px 16px 0px 0px #000, 12px 12px 0px 0px #000"
			);
			root.style.setProperty(
				"--shadow-xl",
				"20px 20px 0px 0px #000, 16px 16px 0px 0px #000"
			);
			root.style.setProperty(
				"--shadow-2xl",
				"24px 24px 0px 0px #000, 20px 20px 0px 0px #000"
			);
		} else {
			// Reset to default values for other themes
			root.style.setProperty("--font-sans", "Inter, sans-serif");
			root.style.setProperty("--font-serif", "Georgia, serif");
			root.style.setProperty("--font-mono", "JetBrains Mono, monospace");
			root.style.setProperty("--radius", "0.5rem");

			// Default shadows
			root.style.setProperty(
				"--shadow-2xs",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.06)"
			);
			root.style.setProperty(
				"--shadow-xs",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.06)"
			);
			root.style.setProperty(
				"--shadow-sm",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.12), 0px 1px 2px -1px hsl(240 30% 25% / 0.12)"
			);
			root.style.setProperty(
				"--shadow",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.12), 0px 1px 2px -1px hsl(240 30% 25% / 0.12)"
			);
			root.style.setProperty(
				"--shadow-md",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.12), 0px 2px 4px -1px hsl(240 30% 25% / 0.12)"
			);
			root.style.setProperty(
				"--shadow-lg",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.12), 0px 4px 6px -1px hsl(240 30% 25% / 0.12)"
			);
			root.style.setProperty(
				"--shadow-xl",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.12), 0px 8px 10px -1px hsl(240 30% 25% / 0.12)"
			);
			root.style.setProperty(
				"--shadow-2xl",
				"0px 4px 10px 0px hsl(240 30% 25% / 0.30)"
			);
		}
	}, []);

	// Load color scheme from database on mount
	useEffect(() => {
		const loadUserTheme = async () => {
			try {
				const response = await fetch("/api/user/preferences");
				if (response.ok) {
					const preferences = await response.json();
					if (
						preferences?.theme &&
						THEMES.find((s) => s.id === preferences.theme)
					) {
						setColorSchemeState(preferences.theme);
					} else {
						// Apply default color scheme on initial load
						const defaultScheme =
							THEMES.find((s) => s.id === DEFAULT_COLOR_SCHEME) || THEMES[0];
						applyColorScheme(defaultScheme);
					}
				} else {
					// Apply default color scheme if no user preferences
					const defaultScheme =
						THEMES.find((s) => s.id === DEFAULT_COLOR_SCHEME) || THEMES[0];
					applyColorScheme(defaultScheme);
				}
			} catch (error) {
				console.error("Error loading user theme:", error);
				// Apply default color scheme on error
				const defaultScheme =
					THEMES.find((s) => s.id === DEFAULT_COLOR_SCHEME) || THEMES[0];
				applyColorScheme(defaultScheme);
			}
		};

		loadUserTheme();
	}, [applyColorScheme]); // Only run on mount

	// Apply color scheme when it changes
	useEffect(() => {
		applyColorScheme(colorSchemeData);

		// Save to database
		const saveUserTheme = async () => {
			try {
				await fetch("/api/user/preferences", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ theme: colorScheme }),
				});
			} catch (error) {
				console.error("Error saving user theme:", error);
			}
		};

		saveUserTheme();
	}, [colorScheme, applyColorScheme, colorSchemeData]);

	const setColorScheme = useCallback((scheme: string) => {
		setColorSchemeState(scheme);
	}, []);

	const value = useMemo(
		() => ({
			colorScheme,
			colorSchemeName: colorSchemeData.name,
			colorSchemeData,
			setColorScheme,
			availableSchemes: THEMES,
		}),
		[colorScheme, colorSchemeData, setColorScheme]
	);

	return (
		<ColorSchemeContext.Provider value={value}>
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
