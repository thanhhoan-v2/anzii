import { SignUp } from "@stackframe/stack";
import Link from "next/link";

import AppLogo from "@/components/common/app-logo";

export default function SignUpPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<AppLogo />
			<SignUp
				extraInfo={
					<>
						By signing up, you agree to our{" "}
						<Link href="/terms" className="hover:underline">
							Terms
						</Link>
					</>
				}
			/>
		</div>
	);
}
