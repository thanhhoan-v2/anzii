"use client";

import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import { Button, ButtonWithLink } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { NAVIGATION_LINKS, ROUTES } from "@/lib/routes";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, PlusIcon, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AppLogo from "../common/app-logo";

interface AppHeaderMobileProps {
	isNotDashboard: boolean;
}

export default function AppHeaderMobile({
	isNotDashboard,
}: AppHeaderMobileProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navLinks = NAVIGATION_LINKS;
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<div className="md:hidden">
			<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="hover:bg-zinc-950 p-2 text-white hover:text-lime-400"
					>
						<Menu className="w-5 h-5" />
						<span className="sr-only">Open menu</span>
					</Button>
				</SheetTrigger>
				<VisuallyHidden>
					<SheetTitle className="sr-only" />
				</VisuallyHidden>
				<SheetContent
					side="top"
					className="bg-black m-0 p-0 border-0 w-full max-w-none h-full"
				>
					<div className="flex flex-col h-full min-h-screen">
						{/* Header */}
						<div className="flex justify-between items-center bg-black p-6 border-zinc-800 border-b">
							<AppLogo
								svgClassName="text-lime-400"
								textClassName="text-white"
								showText={true}
							/>
							<Button
								variant="ghost"
								size="sm"
								onClick={closeMobileMenu}
								className="hover:bg-zinc-950 p-3 text-white hover:text-lime-400"
								type="button"
							>
								<X className="w-6 h-6" />
							</Button>
						</div>

						{/* Navigation Content */}
						<div className="flex-1 p-6 pt-12 overflow-y-auto">
							{isNotDashboard ? (
								<div className="space-y-10 mx-auto max-w-md">
									{/* Product Section */}
									<div className="space-y-6">
										<h3 className="font-medium text-gray-400 text-sm uppercase tracking-wider">
											Product
										</h3>
										<nav className="space-y-2">
											{navLinks.map((link) => (
												<Link
													key={`mobile-nav-${link.href}`}
													href={link.href}
													onClick={closeMobileMenu}
													className="block hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
												>
													{link.label}
												</Link>
											))}
										</nav>
									</div>

									{/* Auth Buttons */}
									<div className="space-y-4 pt-8 border-zinc-800 border-t">
										<Button
											asChild
											variant="outline"
											size="lg"
											className="justify-center bg-transparent hover:bg-zinc-950 border-zinc-800 hover:border-lime-400 w-full h-12 text-white hover:text-lime-400 text-base"
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
								<div className="space-y-10 mx-auto max-w-md">
									{/* App Navigation */}
									<div className="space-y-6">
										<h3 className="font-medium text-gray-400 text-sm uppercase tracking-wider">
											Navigation
										</h3>
										<nav className="space-y-2">
											<Link
												href={ROUTES.DASHBOARD}
												onClick={closeMobileMenu}
												className="block hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												Dashboard
											</Link>
											<Link
												href={ROUTES.CREATE}
												onClick={closeMobileMenu}
												className="flex items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												<PlusIcon className="w-5 h-5" />
												Create Deck
											</Link>
											<Link
												href={ROUTES.SETTINGS}
												onClick={closeMobileMenu}
												className="flex items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												<Settings className="w-5 h-5" />
												Settings
											</Link>
										</nav>
									</div>

									{/* Settings */}
									<div className="pt-8 border-zinc-800 border-t">
										<div className="space-y-4">
											<h3 className="font-medium text-gray-400 text-sm uppercase tracking-wider">
												Settings
											</h3>
											<div className="bg-zinc-950 px-4 py-4 border border-zinc-800 rounded-lg">
												<p className="mb-4 font-medium text-gray-300 text-base">
													Theme
												</p>
												<ColorSchemeSelector />
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Footer */}
						<div className="bg-zinc-950 p-6 border-zinc-800 border-t">
							<div className="flex justify-between items-center mx-auto max-w-md text-gray-400 text-sm">
								<span>© 2024 Anzii</span>
								<Link
									href="#"
									className="hover:text-lime-400 transition-colors"
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
