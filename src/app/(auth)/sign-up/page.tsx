import { SignUp } from "@stackframe/stack";
import Link from "next/link";

import { AppLogo } from "@/components/common/app-logo";

export default function SignUpPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<AppLogo />
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
		</div>
	);
}
