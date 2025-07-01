"use client";

import { UserButton, useUser } from "@stackframe/stack";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/common/app-logo";
import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import AppHeaderMobile from "@/components/layout/app-header-mobile";
import { Button, ButtonWithLink } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export default function AppHeader({
	children,
}: {
	children?: React.ReactNode;
}) {
	const pathname = usePathname();
	const user = useUser();

	// Pages that show main navigation (Features, Pricing, Roadmap)
	const publicNavigationPages = [
		ROUTES.HOME,
		ROUTES.FEATURES,
		ROUTES.PRICING,
		ROUTES.ROADMAP,
		ROUTES.PRIVACY_POLICY,
		ROUTES.TERMS_OF_SERVICE,
	] as const;

	// Main navigation links to show on public pages
	const mainNavLinks = [
		{ href: ROUTES.FEATURES, label: "Features" },
		{ href: ROUTES.PRICING, label: "Pricing" },
		{ href: ROUTES.ROADMAP, label: "Roadmap" },
	];

	const isPublicPage = publicNavigationPages.includes(
		pathname as (typeof publicNavigationPages)[number]
	);

	return (
		<header className="sticky top-0 z-50 border-b border-zinc-800 bg-black p-4">
			<div className="flex items-center justify-between">
				{/* Logo */}
				{children ?? <AppLogo textClassName="text-white" showText={true} />}

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-6 md:flex">
					{/* Protected/Dashboard Navigation */}
					{!isPublicPage && (
						<div className="flex items-center gap-4">
							<ButtonWithLink href={ROUTES.CREATE} className="h-9 px-3 text-sm">
								<PlusIcon className="h-4 w-4" /> Create
							</ButtonWithLink>
							<ColorSchemeSelector />
							<UserButton />
						</div>
					)}

					{/* Public Page Navigation */}
					{isPublicPage && (
						<nav className="flex items-center gap-2">
							{mainNavLinks.map((link) => {
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

				{/* Desktop Auth Buttons (for public pages only) */}
				{isPublicPage && (
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
				<AppHeaderMobile isNotDashboard={isPublicPage} />
			</div>
		</header>
	);
}
