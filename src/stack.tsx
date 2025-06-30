import "server-only";

import { ROUTES } from "@/lib/routes";
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		signIn: ROUTES.SIGN_IN,
		signUp: ROUTES.SIGN_UP,
		accountSettings: ROUTES.SETTINGS,
	},
});
