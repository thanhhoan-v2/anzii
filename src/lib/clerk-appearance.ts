import { dark } from "@clerk/themes";
import { type Appearance } from "@clerk/types";

export const clerkAppearance: Appearance = {
	baseTheme: dark,
	elements: {
		// Root container
		rootBox: {
			fontFamily: "var(--font-space-grotesk)",
		},
		card: {
			backgroundColor: "hsl(var(--card))",
			border: "1px solid hsl(var(--border))",
			borderRadius: "0.5rem",
			boxShadow:
				"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
			overflow: "hidden", // Ensures footer borders align properly
		},
		// Main content area
		main: {
			backgroundColor: "hsl(var(--card))",
		},
		headerTitle: {
			color: "hsl(var(--foreground))",
			fontSize: "1.5rem",
			fontWeight: "600",
		},
		headerSubtitle: {
			color: "hsl(var(--muted-foreground))",
		},
		// Form elements
		formButtonPrimary: {
			backgroundColor: "hsl(var(--primary))",
			color: "hsl(var(--primary-foreground))",
			border: "none",
			borderRadius: "0.375rem",
			fontSize: "0.875rem",
			fontWeight: "500",
			padding: "0.5rem 1rem",
			transition: "all 0.2s ease-in-out",
			"&:hover": {
				backgroundColor: "hsl(var(--primary) / 0.9)",
			},
			"&:focus": {
				outline: "none",
				boxShadow: "0 0 0 2px hsl(var(--ring))",
			},
		},
		formFieldInput: {
			// width: "400px",
			backgroundColor: "hsl(var(--background))",
			border: "1px solid hsl(var(--border))",
			borderRadius: "0.375rem",
			color: "hsl(var(--foreground))",
			fontSize: "0.875rem",
			// padding: "0.5rem 0.75rem",
			"&:focus": {
				outline: "none",
				borderColor: "hsl(var(--ring))",
				boxShadow: "0 0 0 2px hsl(var(--ring) / 0.2)",
			},
			"&::placeholder": {
				color: "hsl(var(--muted-foreground))",
			},
		},
		formFieldLabel: {
			color: "hsl(var(--foreground))",
			fontSize: "0.875rem",
			fontWeight: "500",
			marginBottom: "0.25rem",
		},
		// Links and text
		identityPreviewText: {
			color: "hsl(var(--foreground))",
		},
		identityPreviewEditButton: {
			color: "hsl(var(--primary))",
			"&:hover": {
				color: "hsl(var(--primary) / 0.8)",
			},
		},
		formResendCodeLink: {
			color: "hsl(var(--primary))",
			textDecoration: "none",
			"&:hover": {
				color: "hsl(var(--primary) / 0.8)",
				textDecoration: "underline",
			},
		},
		// Footer
		footer: {
			// backgroundColor: "hsl(var(--card))",
			// borderTop: "1px solid hsl(var(--border))",
			// padding: "1rem",
		},
		footerActionLink: {
			color: "hsl(var(--primary))",
			textDecoration: "none",
			fontSize: "0.875rem",
			fontWeight: "500",
			"&:hover": {
				color: "hsl(var(--primary) / 0.8)",
				textDecoration: "underline",
			},
		},
		footerActionText: {
			color: "hsl(var(--muted-foreground))",
			fontSize: "0.875rem",
		},
		footerAction: {
			// backgroundColor: "hsl(var(--card))",
			// borderTop: "1px solid hsl(var(--border))",
			// padding: "1rem",
		},
		footerActionRow: {
			// backgroundColor: "hsl(var(--card))",
		},
		// Development mode indicator
		developmentModeWarning: {
			backgroundColor: "hsl(var(--muted))",
			color: "hsl(var(--muted-foreground))",
			// border: "1px solid hsl(var(--border))",
			// borderRadius: "0.375rem",
			padding: "0.5rem 0.75rem",
			fontSize: "0.75rem",
		},
		// Divider
		dividerLine: {
			backgroundColor: "hsl(var(--border))",
		},
		dividerText: {
			color: "hsl(var(--muted-foreground))",
		},
		// Social buttons
		socialButtonsBlockButton: {
			backgroundColor: "hsl(var(--background))",
			border: "1px solid hsl(var(--border))",
			borderRadius: "0.5rem",
			padding: "1rem",
			color: "hsl(var(--foreground))",
			"&:hover": {
				backgroundColor: "hsl(var(--muted))",
			},
		},
		// User menu and profile
		userPreview: {
			color: "hsl(var(--foreground))",
		},
		userPreviewSecondaryIdentifier: {
			color: "hsl(var(--muted-foreground))",
		},
		// Error states
		formFieldErrorText: {
			color: "hsl(var(--destructive))",
			fontSize: "0.75rem",
		},
		alertText: {
			color: "hsl(var(--destructive))",
		},
		// Loading states
		spinner: {
			color: "hsl(var(--primary))",
		},
	},
	// Layout configuration
	layout: {
		socialButtonsPlacement: "top",
		socialButtonsVariant: "blockButton",
		shimmer: true,
		unsafe_disableDevelopmentModeWarnings: true,
	},
	// Variables for fine-tuning
	variables: {
		fontFamily: "var(--font-space-grotesk)",
		fontSize: "0.875rem",
		borderRadius: "0.375rem",
		spacingUnit: "1rem",
	},
};

/**
 * UserButton appearance for header integration
 */
export const userButtonAppearance: Appearance = {
	...clerkAppearance,
};
