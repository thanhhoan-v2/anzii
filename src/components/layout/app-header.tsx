"use client";

import { UserButton, useUser } from "@stackframe/stack";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import { Button, ButtonWithLink } from "@/components/ui/button";
import { isLandingPageRoute, NAVIGATION_LINKS, ROUTES } from "@/lib/routes";

import AppLogo from "../common/app-logo";
import AppHeaderMobile from "./app-header-mobile";

export default function AppHeader({
	children,
}: {
	children?: React.ReactNode;
}) {
	const pathname = usePathname();
	const user = useUser();

	const isNotDashboard =
		pathname === ROUTES.HOME || isLandingPageRoute(pathname);

	const navLinks = NAVIGATION_LINKS;

	return (
		<header className="sticky top-0 z-50 border-b border-zinc-800 bg-black p-4">
			<div className="flex items-center justify-between">
				{/* Logo */}
				{children ?? (
					<AppLogo
						svgClassName="text-lime-400"
						textClassName="text-white"
						showText={true}
					/>
				)}
				{/* Desktop Navigation */}
				<div className="hidden items-center gap-6 md:flex">
					{!isNotDashboard && (
						<div className="flex items-center gap-4">
							<ButtonWithLink href={ROUTES.CREATE} className="h-9 px-3 text-sm">
								<PlusIcon className="h-4 w-4" /> Create
							</ButtonWithLink>
							<ColorSchemeSelector />
							<UserButton />
						</div>
					)}

					{isNotDashboard && (
						<nav className="flex items-center gap-2">
							{navLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Button
										key={link.href}
										asChild
										variant="ghost"
										size="sm"
										className={
											isActive
												? "bg-lime-400 text-black hover:bg-lime-500"
												: "text-white hover:bg-zinc-950 hover:text-lime-400"
										}
									>
										<Link href={link.href}>{link.label}</Link>
									</Button>
								);
							})}
						</nav>
					)}
				</div>
				{/* Desktop Auth Buttons (for home page) */}
				{isNotDashboard && (
					<div className="hidden items-center gap-2 md:flex">
						{user ? (
							<>
								<ButtonWithLink
									href={ROUTES.DASHBOARD}
									className="h-9 px-3 text-sm"
								>
									Go to dashboard
								</ButtonWithLink>
								<UserButton />
							</>
						) : (
							<>
								<Button
									asChild
									variant="ghost"
									size="sm"
									className="text-white hover:bg-zinc-950 hover:text-lime-400"
								>
									<Link href={ROUTES.SIGN_IN}>Log in</Link>
								</Button>
								<ButtonWithLink
									href={ROUTES.SIGN_UP}
									className="h-9 px-3 text-sm"
								>
									Sign up
								</ButtonWithLink>
							</>
						)}
					</div>
				)}
				{/* Mobile Menu */}
				<AppHeaderMobile isNotDashboard={isNotDashboard} />
			</div>
		</header>
	);
}
