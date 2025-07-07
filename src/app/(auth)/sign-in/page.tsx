"use client";
import { SignIn, useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";

import { AppLogo } from "@/components/common/app-logo";
import { ROUTES } from "@/lib/routes";

export default function Page() {
	const user = useUser();
	if (user) redirect(ROUTES.DASHBOARD);
	return (
		<div className="flex flex-col justify-center items-center gap-4 h-screen">
			<AppLogo />
			<SignIn />
		</div>
	);
}
