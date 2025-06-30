import Link from "next/link";

export default function AppLogo({
	svgClassName,
	textClassName,
	showText = true,
}: {
	svgClassName?: string;
	textClassName?: string;
	showText?: boolean;
}) {
	return (
		<Link href="/" className={`flex items-start gap-2`}>
			<LogoSVG className="h-10 w-10 text-lime-400" />
			{showText && (
				<h1
					className={`text-[2rem] font-bold tracking-tight hover:font-black ${textClassName ?? ""}`}
				>
					Anzii
				</h1>
			)}
		</Link>
	);
}

const LogoSVG = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Anzii</title>
		<path
			d="M11.0007 3C11.0007 3 9.86264 7.5 11.9313 12C14 16.5 13.5 21 13.5 21M18.9313 21C18.9313 21 19.6008 16.5 17.5007 13C15.4007 9.5 16.0007 6 16.0007 6M7.92989 21C7.92989 21 8.5993 16.5 6.49927 13C4.39924 9.5 4.99927 6 4.99927 6"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
