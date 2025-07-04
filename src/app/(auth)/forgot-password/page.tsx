"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AppLogo } from "@/components/common/app-logo";
import { ROUTES } from "@/lib/routes";

export default function ForgotPasswordPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to sign-in page after a brief delay
		const timer = setTimeout(() => {
			router.push(ROUTES.SIGN_IN);
		}, 3000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<AppLogo />
			<div className="text-center">
				<h1 className="mb-2 text-2xl font-bold">Password Reset</h1>
				<p className="mb-4 text-muted-foreground">
					Redirecting you to the sign-in page where you can reset your
					password...
				</p>
				<div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
			</div>
		</div>
	);
}
