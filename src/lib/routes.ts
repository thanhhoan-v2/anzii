/**
 * Centralized routes configuration for the application.
 * All routes should be defined here to avoid hard-coding throughout the codebase.
 */

// Main application routes
export const ROUTES = {
	// Public routes
	HOME: "/",
	FEATURES: "/features",
	PRICING: "/pricing",
	ROADMAP: "/roadmap",
	TERMS_OF_SERVICE: "/terms-of-service",
	PRIVACY_POLICY: "/privacy-policy",
	CONTACT: "/contact",
	// Auth routes
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	FORGOT_PASSWORD: "/forgot-password",
	RESET_PASSWORD: "/reset-password",
	// Authenticated routes
	DASHBOARD: "/dashboard",
	CREATE: "/create",
	SETTINGS: "/settings",
	// Dynamic routes (functions to generate with parameters)
	DECK: (deckId: string) => `/deck/${deckId}`,
} as const;

// Route groups for easier management
export const PUBLIC_ROUTES = [
	ROUTES.HOME,
	ROUTES.FEATURES,
	ROUTES.PRICING,
	ROUTES.ROADMAP,
] as const;

export const AUTH_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP] as const;

export const PROTECTED_ROUTES = [
	ROUTES.DASHBOARD,
	ROUTES.CREATE,
	ROUTES.SETTINGS,
] as const;

// Navigation links for header/footer components
export const NAVIGATION_LINKS = [
	{ href: ROUTES.FEATURES, label: "Features" },
	{ href: ROUTES.PRICING, label: "Pricing" },
	{ href: ROUTES.ROADMAP, label: "Roadmap" },
	{ href: ROUTES.TERMS_OF_SERVICE, label: "Terms of Service" },
	{ href: ROUTES.PRIVACY_POLICY, label: "Privacy Policy" },
] as const;

// Footer links (can be internal or external)
export const FOOTER_LINKS = [
	{ href: ROUTES.FEATURES, label: "Features" },
	{ href: ROUTES.PRICING, label: "Pricing" },
	{ href: ROUTES.ROADMAP, label: "Roadmap" },
	{ href: ROUTES.TERMS_OF_SERVICE, label: "Terms of Service" },
	{ href: ROUTES.PRIVACY_POLICY, label: "Privacy Policy" },
	{ href: ROUTES.CONTACT, label: "Contact" },
] as const;

// Landing page specific routes that determine active state
export const LANDING_PAGE_ROUTES = [
	ROUTES.FEATURES,
	ROUTES.PRICING,
	ROUTES.ROADMAP,
	ROUTES.TERMS_OF_SERVICE,
	ROUTES.PRIVACY_POLICY,
	ROUTES.CONTACT,
] as const;

// Helper functions
export const isLandingPageRoute = (pathname: string): boolean => {
	return (
		LANDING_PAGE_ROUTES.includes(
			pathname as (typeof LANDING_PAGE_ROUTES)[number]
		) || pathname === ROUTES.HOME
	);
};

export const isAuthRoute = (pathname: string): boolean => {
	return AUTH_ROUTES.includes(pathname as (typeof AUTH_ROUTES)[number]);
};

export const isProtectedRoute = (pathname: string): boolean => {
	return (
		PROTECTED_ROUTES.includes(pathname as (typeof PROTECTED_ROUTES)[number]) ||
		pathname.startsWith("/deck/")
	);
};
