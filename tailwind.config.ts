import tailwindcssTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				mobile_s: "320px",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				"space-grotesk": ["var(--font-space-grotesk)", ...fontFamily.sans],
				inter: ["var(--font-inter)", ...fontFamily.sans],
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
				"nunito-sans": ["var(--font-nunito-sans)", ...fontFamily.sans],
				"work-sans": ["var(--font-work-sans)", ...fontFamily.sans],
				outfit: ["var(--font-outfit)", ...fontFamily.sans],
				montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
				"source-sans-pro": ["var(--font-source-sans-pro)", ...fontFamily.sans],
				lato: ["var(--font-lato)", ...fontFamily.sans],
				"open-sans": ["var(--font-open-sans)", ...fontFamily.sans],
				roboto: ["var(--font-roboto)", ...fontFamily.sans],
				oswald: ["var(--font-oswald)", ...fontFamily.sans],
				raleway: ["var(--font-raleway)", ...fontFamily.sans],
				"playfair-display": [
					"var(--font-playfair-display)",
					...fontFamily.serif,
				],
				merriweather: ["var(--font-merriweather)", ...fontFamily.serif],
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			boxShadow: {
				md: "hsl(var(--shadow-md))",
				lg: "hsl(var(--shadow-lg))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				shimmer: {
					"0%": {
						backgroundPosition: "-200% 0",
					},
					"100%": {
						backgroundPosition: "200% 0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shimmer: "shimmer 1.5s ease-in-out infinite",
			},
		},
	},
	plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
