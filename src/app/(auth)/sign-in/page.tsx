import AppLogo from "@/components/layout/AppLogo";
import { SignIn } from "@stackframe/stack";

export default function SignInPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
            <AppLogo />
            <SignIn />
        </div>
    );
}