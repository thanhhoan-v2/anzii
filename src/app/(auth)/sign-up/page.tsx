"use client";

import { SignUp, useUser } from "@stackframe/stack";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/routes";

export default function Page() {
	const user = useUser();
	if (user) redirect(ROUTES.DECKS);

	return (
		<SignUp
			extraInfo={
				<>
					By signing up, you agree to our{" "}
					<Link
						href="/terms-of-service"
						className="text-lime-400 hover:text-lime-300 hover:underline"
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						href="/privacy-policy"
						className="text-lime-400 hover:text-lime-300 hover:underline"
					>
						Privacy Policy
					</Link>
				</>
			}
		/>
	);
}
