import AppLogo from "@/components/layout/app-logo";
import { SignUp } from "@stackframe/stack";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<div className="flex flex-col justify-center items-center gap-4 h-screen">
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
