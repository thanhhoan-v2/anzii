"use client";

import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import { Button, ButtonWithLink } from "@/components/ui/button";
import { isLandingPageRoute, NAVIGATION_LINKS, ROUTES } from "@/lib/routes";
import { UserButton, useUser } from "@stackframe/stack";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "../common/app-logo";
import AppHeaderMobile from "./app-header-mobile";

export default function AppHeader() {
	const pathname = usePathname();
	const user = useUser();

	const isNotDashboard =
		pathname === ROUTES.HOME || isLandingPageRoute(pathname);

	const navLinks = NAVIGATION_LINKS;

	return (
		<header className="top-0 z-50 sticky bg-black p-4 border-zinc-800 border-b">
			<div className="flex justify-between items-center">
				{/* Logo */}
				<AppLogo
					svgClassName="text-lime-400"
					textClassName="text-white"
					showText={true}
				/>
				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-6">
					{!isNotDashboard && (
						<div className="flex items-center gap-4">
							<ButtonWithLink href={ROUTES.CREATE} className="px-3 h-9 text-sm">
								<PlusIcon className="w-4 h-4" /> Create
							</ButtonWithLink>
							<ColorSchemeSelector />
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
												: "hover:bg-zinc-950 text-white hover:text-lime-400"
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
					<div className="hidden md:flex items-center gap-2">
						{user ? (
							<UserButton />
						) : (
							<>
								<Button
									asChild
									variant="ghost"
									size="sm"
									className="hover:bg-zinc-950 text-white hover:text-lime-400"
								>
									<Link href={ROUTES.SIGN_IN}>Log in</Link>
								</Button>
								<ButtonWithLink
									href={ROUTES.SIGN_UP}
									className="px-3 h-9 text-sm"
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
