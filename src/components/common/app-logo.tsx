import Link from "next/link";

import AppLogoSVG from "@/components/svgs/app-logo.svg";

export const AppLogo = ({
	textClassName,
	showText = true,
}: {
	textClassName?: string;
	showText?: boolean;
}) => {
	return (
		<Link href="/" className={`flex items-start gap-2`}>
			<AppLogoSVG className="h-10 w-10 text-primary" />
			{showText && (
				<h1
					className={`text-[2rem] font-bold tracking-tight hover:font-black ${textClassName ?? ""}`}
				>
					Anzii
				</h1>
			)}
		</Link>
	);
};
