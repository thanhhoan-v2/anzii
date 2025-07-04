"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			{/* <AppLogo /> */}
			<SignUp />
		</div>
	);
}
