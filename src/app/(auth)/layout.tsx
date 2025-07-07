import { AppLogo } from "@/components/common/app-logo";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 h-screen">
				<AppLogo />
				{children}
			</div>
		</>
	);
}
