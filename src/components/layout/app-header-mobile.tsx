"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { HomeIcon, Menu, PlusIcon, SettingsIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AppLogo } from "@/components/common/app-logo";
import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import { Button, ButtonWithLink } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/routes";

interface AppHeaderMobileProps {
	isNotDashboard: boolean;
}

export default function AppHeaderMobile({
	isNotDashboard,
}: AppHeaderMobileProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Main navigation links to show on public pages
	const mainNavLinks = [
		{ href: ROUTES.FEATURES, label: "Features" },
		{ href: ROUTES.ROADMAP, label: "Roadmap" },
	];

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<div className="md:hidden">
			<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="p-2 text-white hover:bg-zinc-950 hover:text-lime-400"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Open menu</span>
					</Button>
				</SheetTrigger>
				<VisuallyHidden>
					<SheetTitle className="sr-only" />
				</VisuallyHidden>
				<SheetContent
					side="top"
					className="m-0 h-full w-full max-w-none border-0 bg-black p-0"
				>
					<div className="flex h-full min-h-screen flex-col">
						{/* Header */}
						<div className="flex items-center justify-between border-b border-zinc-800 bg-black p-6">
							<AppLogo textClassName="text-white" showText={true} />
							<Button
								variant="ghost"
								size="sm"
								onClick={closeMobileMenu}
								className="p-3 text-white hover:bg-zinc-950 hover:text-lime-400"
								type="button"
							>
								<X className="h-6 w-6" />
							</Button>
						</div>

						{/* Navigation Content */}
						<div className="flex-1 overflow-y-auto p-6 pt-12">
							{isNotDashboard ? (
								<div className="mx-auto max-w-md space-y-10">
									{/* Product Section */}
									<div className="space-y-6">
										<h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
											Product
										</h3>
										<nav className="space-y-2">
											{mainNavLinks.map((link) => (
												<Link
													key={`mobile-nav-${link.href}`}
													href={link.href}
													onClick={closeMobileMenu}
													className="block rounded-lg border border-zinc-800 px-4 py-4 text-lg font-medium text-white transition-colors hover:border-lime-400 hover:bg-zinc-950 hover:text-lime-400"
												>
													{link.label}
												</Link>
											))}
										</nav>
									</div>

									{/* Auth Buttons */}
									<div className="space-y-4 border-t border-zinc-800 pt-8">
										<Button
											asChild
											variant="outline"
											size="lg"
											className="h-12 w-full justify-center border-zinc-800 bg-transparent text-base text-white hover:border-lime-400 hover:bg-zinc-950 hover:text-lime-400"
										>
											<Link href={ROUTES.SIGN_IN} onClick={closeMobileMenu}>
												Log in
											</Link>
										</Button>
										<ButtonWithLink
											href={ROUTES.SIGN_UP}
											className="h-12 text-base"
										>
											<span onClick={closeMobileMenu}>Sign up</span>
										</ButtonWithLink>
									</div>
								</div>
							) : (
								<div className="mx-auto max-w-md space-y-10">
									{/* App Navigation */}
									<div className="space-y-6">
										<h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
											Navigation
										</h3>
										<nav className="space-y-2">
											<Link
												href={ROUTES.DECKS}
												onClick={closeMobileMenu}
												className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 px-4 py-4 text-lg font-medium text-white transition-colors hover:border-lime-400 hover:bg-zinc-950 hover:text-lime-400"
											>
												<HomeIcon className="h-5 w-5" />
												Dashboard
											</Link>
											<Link
												href={ROUTES.CREATE}
												onClick={closeMobileMenu}
												className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 px-4 py-4 text-lg font-medium text-white transition-colors hover:border-lime-400 hover:bg-zinc-950 hover:text-lime-400"
											>
												<PlusIcon className="h-5 w-5" />
												Create Deck
											</Link>
											<Link
												href={ROUTES.SETTINGS}
												onClick={closeMobileMenu}
												className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 px-4 py-4 text-lg font-medium text-white transition-colors hover:border-lime-400 hover:bg-zinc-950 hover:text-lime-400"
											>
												<SettingsIcon className="h-5 w-5" />
												Settings
											</Link>
										</nav>
									</div>

									{/* Settings */}
									<div className="border-t border-zinc-800 pt-8">
										<div className="space-y-4">
											<h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
												Settings
											</h3>
											<ColorSchemeSelector triggerClassName="w-full text-lg" />
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Footer */}
						<div className="border-t border-zinc-800 bg-zinc-950 p-6">
							<div className="mx-auto flex max-w-md items-center justify-between text-sm text-gray-400">
								<span>© 2024 Anzii</span>
								<Link
									href="#"
									className="transition-colors hover:text-lime-400"
								>
									Privacy
								</Link>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
