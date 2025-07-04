"use client";
import { SignIn } from "@clerk/nextjs";

import { AppLogo } from "@/components/common/app-logo";

export default function SignInPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<AppLogo />
			<SignIn />
		</div>
	);
}
