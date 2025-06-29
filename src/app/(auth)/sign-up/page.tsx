import AppLogo from "@/components/layout/AppLogo";
import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
            <AppLogo />
            <SignUp
                extraInfo={<>By signing up, you agree to our <a href="/terms">Terms</a></>}
            />
        </div>
    );
}