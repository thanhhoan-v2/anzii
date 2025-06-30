import "server-only";

import { StackServerApp } from "@stackframe/stack";

import { ROUTES } from "@/lib/routes";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		signIn: ROUTES.SIGN_IN,
		signUp: ROUTES.SIGN_UP,
		accountSettings: ROUTES.SETTINGS,
	},
});
