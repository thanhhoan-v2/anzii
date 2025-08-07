"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export interface IFont {
	id: string;
	name: string;
	family: string;
	variable: string;
	description: string;
}

export const FONTS: IFont[] = [
	{
		id: "space-grotesk",
		name: "Space Grotesk",
		family: "Space Grotesk, sans-serif",
		variable: "--font-space-grotesk",
		description: "Modern geometric sans-serif with excellent readability",
	},
	{
		id: "inter",
		name: "Inter",
		family: "Inter, sans-serif",
		variable: "--font-inter",
		description: "Clean and highly legible sans-serif font",
	},
	{
		id: "poppins",
		name: "Poppins",
		family: "Poppins, sans-serif",
		variable: "--font-poppins",
		description: "Rounded geometric forms, very popular for modern designs",
	},
	{
		id: "nunito-sans",
		name: "Nunito Sans",
		family: "Nunito Sans, sans-serif",
		variable: "--font-nunito-sans",
		description: "Balanced geometry with friendly curves",
	},
	{
		id: "work-sans",
		name: "Work Sans",
		family: "Work Sans, sans-serif",
		variable: "--font-work-sans",
		description: "Versatile geometric typeface, excellent readability",
	},
	{
		id: "outfit",
		name: "Outfit",
		family: "Outfit, sans-serif",
		variable: "--font-outfit",
		description: "Contemporary geometric with multiple weights",
	},
	{
		id: "montserrat",
		name: "Montserrat",
		family: "Montserrat, sans-serif",
		variable: "--font-montserrat",
		description: "Inspired by urban typography, very versatile",
	},
	{
		id: "source-sans-pro",
		name: "Source Sans Pro",
		family: "Source Sans Pro, sans-serif",
		variable: "--font-source-sans-pro",
		description: "Clean, professional, designed by Adobe",
	},
	{
		id: "lato",
		name: "Lato",
		family: "Lato, sans-serif",
		variable: "--font-lato",
		description: "Humanist qualities with serious character",
	},
	{
		id: "open-sans",
		name: "Open Sans",
		family: "Open Sans, sans-serif",
		variable: "--font-open-sans",
		description: "Highly readable, works well at all sizes",
	},
	{
		id: "roboto",
		name: "Roboto",
		family: "Roboto, sans-serif",
		variable: "--font-roboto",
		description: "Google's signature font, excellent for digital interfaces",
	},
	{
		id: "oswald",
		name: "Oswald",
		family: "Oswald, sans-serif",
		variable: "--font-oswald",
		description: "Condensed, strong impact",
	},
	{
		id: "raleway",
		name: "Raleway",
		family: "Raleway, sans-serif",
		variable: "--font-raleway",
		description: "Elegant thin weights, sophisticated",
	},
	{
		id: "playfair-display",
		name: "Playfair Display",
		family: "Playfair Display, serif",
		variable: "--font-playfair-display",
		description: "Modern serif alternative for contrast",
	},
	{
		id: "merriweather",
		name: "Merriweather",
		family: "Merriweather, serif",
		variable: "--font-merriweather",
		description: "Readable serif that pairs well with sans-serifs",
	},
];

const DEFAULT_FONT = "space-grotesk";

interface FontContextType {
	font: string;
	setFont: (fontId: string) => void;
	availableFonts: IFont[];
	fontName: string;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
	children: React.ReactNode;
}

// Inner Font Provider
function InnerFontProvider({ children }: FontProviderProps) {
	const [font, setFontState] = useState<string>(DEFAULT_FONT);

	// Get current font data
	const fontData = FONTS.find((f) => f.id === font) || FONTS[0];

	// Apply font to CSS custom properties
	const applyFont = useCallback((fontObj: IFont) => {
		const root = document.documentElement;
		root.style.setProperty("--font-sans", fontObj.family);
	}, []);

	// Load font from database on mount
	useEffect(() => {
		const loadUserFont = async () => {
			try {
				const response = await fetch("/api/user/preferences");
				if (response.ok) {
					const preferences = await response.json();
					if (
						preferences?.font &&
						FONTS.find((f) => f.id === preferences.font)
					) {
						setFontState(preferences.font);
					} else {
						// Apply default font on initial load
						const defaultFont =
							FONTS.find((f) => f.id === DEFAULT_FONT) || FONTS[0];
						applyFont(defaultFont);
					}
				} else {
					// Apply default font if no user preferences
					const defaultFont =
						FONTS.find((f) => f.id === DEFAULT_FONT) || FONTS[0];
					applyFont(defaultFont);
				}
			} catch (error) {
				console.error("Error loading user font:", error);
				// Apply default font on error
				const defaultFont =
					FONTS.find((f) => f.id === DEFAULT_FONT) || FONTS[0];
				applyFont(defaultFont);
			}
		};

		loadUserFont();
	}, [applyFont]); // Only run on mount

	// Apply font when it changes
	useEffect(() => {
		applyFont(fontData);

		// Save to database
		const saveUserFont = async () => {
			try {
				await fetch("/api/user/preferences", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ font }),
				});
			} catch (error) {
				console.error("Error saving user font:", error);
			}
		};

		saveUserFont();
	}, [font, applyFont, fontData]);

	const setFont = useCallback((fontId: string) => {
		if (FONTS.find((f) => f.id === fontId)) {
			setFontState(fontId);
		}
	}, []);

	const availableFonts = FONTS;
	const fontName = fontData.name;

	return (
		<FontContext.Provider
			value={{
				font,
				setFont,
				availableFonts,
				fontName,
			}}
		>
			{children}
		</FontContext.Provider>
	);
}

// Font Provider wrapper
export function FontProvider({ children }: FontProviderProps) {
	return <InnerFontProvider>{children}</InnerFontProvider>;
}

// Hook to use font context
export function useFont() {
	const context = useContext(FontContext);
	if (context === undefined) {
		throw new Error("useFont must be used within a FontProvider");
	}
	return context;
}
