"use client";

import { SignIn, useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/routes";

export default function Page() {
	const user = useUser();
	if (user) redirect(ROUTES.DASHBOARD);

	return <SignIn />;
}
