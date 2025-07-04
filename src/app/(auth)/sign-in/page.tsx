"use client";
import { SignIn, useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";

import { AppLogo } from "@/components/common/app-logo";
import { ROUTES } from "@/lib/routes";

export default function SignInPage() {
	const user = useUser();
	if (user) redirect(ROUTES.DASHBOARD);
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<AppLogo />
			<SignIn />
		</div>
	);
}
