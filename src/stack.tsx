import "server-only";

import { StackServerApp } from "@stackframe/stack";

import { ROUTES } from "@/lib/routes";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		home: ROUTES.DECKS,
		signIn: ROUTES.SIGN_IN,
		signUp: ROUTES.SIGN_UP,
		accountSettings: ROUTES.SETTINGS,
		forgotPassword: ROUTES.FORGOT_PASSWORD,
		passwordReset: ROUTES.RESET_PASSWORD,
	},
});
