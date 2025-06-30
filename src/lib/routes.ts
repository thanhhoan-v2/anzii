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

  // Auth routes
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SETTINGS: "/settings",

  // Authenticated routes
  DASHBOARD: "/dashboard",
  CREATE: "/create",
  
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

export const AUTH_ROUTES = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
] as const;

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
] as const;

// Footer links (can be internal or external)
export const FOOTER_LINKS = [
  { href: "#services", label: "Features" },
  { href: "#process", label: "How it Works" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#roadmap", label: "Roadmap" },
] as const;

// Landing page specific routes that determine active state
export const LANDING_PAGE_ROUTES = [
  ROUTES.FEATURES,
  ROUTES.PRICING,
  ROUTES.ROADMAP,
] as const;

// Helper functions
export const isLandingPageRoute = (pathname: string): boolean => {
  return LANDING_PAGE_ROUTES.includes(pathname as any);
};

export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.includes(pathname as any);
};

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.includes(pathname as any) || pathname.startsWith('/deck/');
}; 