"use client";

import { ColorSchemeSelector } from "@/components/common/ColorSchemeSelector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AppLogo from "./AppLogo";

export default function AppHeader() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "#about", label: "About us" },
		{ href: "#features", label: "Features" },
		{ href: "#pricing", label: "Pricing" },
		{ href: "#contact", label: "Contact" },
	];

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<header className="top-0 z-50 sticky bg-white p-4 border-b">
			<div className="flex justify-between items-center mx-auto container">
				{/* Logo */}
				<AppLogo
					svgClassName="text-black"
					textClassName="text-black"
					showText={true}
				/>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-6">
					{!isHome && (
						<div className="flex items-center gap-4">
							<Button asChild size="sm">
								<Link href="/create">
									<PlusIcon className="w-4 h-4" /> Create
								</Link>
							</Button>
							<ColorSchemeSelector />
						</div>
					)}

					{isHome && (
						<nav className="flex items-center gap-2">
							{navLinks.map((link) => (
								<Button key={link.href} asChild variant="ghost" size="sm">
									<Link href={link.href}>{link.label}</Link>
								</Button>
							))}
						</nav>
					)}
				</div>

				{/* Desktop Auth Buttons (for home page) */}
				{isHome && (
					<div className="hidden md:flex items-center gap-2">
						<Button asChild variant="ghost" size="sm">
							<Link href="/sign-in">Log in</Link>
						</Button>
						<Button asChild size="sm">
							<Link href="/sign-up">Sign up</Link>
						</Button>
					</div>
				)}

				{/* Mobile Menu */}
				<div className="md:hidden">
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="sm" className="p-2">
								<Menu className="w-5 h-5" />
								<span className="sr-only">Open menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="bg-white m-0 p-0 border-0 w-full max-w-none h-full"
						>
							<div className="flex flex-col h-full min-h-screen">
								{/* Header */}
								<div className="flex justify-between items-center bg-white p-6 border-b">
									<AppLogo
										svgClassName="text-black"
										textClassName="text-black"
										showText={true}
									/>
									<Button
										variant="ghost"
										size="sm"
										onClick={closeMobileMenu}
										className="p-3"
									>
										<X className="w-6 h-6" />
									</Button>
								</div>

								{/* Navigation Content */}
								<div className="flex-1 p-6 pt-12 overflow-y-auto">
									{isHome ? (
										<div className="space-y-10 mx-auto max-w-md">
											{/* Product Section */}
											<div className="space-y-6">
												<h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">
													Product
												</h3>
												<nav className="space-y-2">
													{navLinks.map((link) => (
														<Link
															key={link.href}
															href={link.href}
															onClick={closeMobileMenu}
															className="block hover:bg-gray-50 px-4 py-4 border border-gray-100 rounded-lg font-medium text-gray-900 text-lg transition-colors"
														>
															{link.label}
														</Link>
													))}
												</nav>
											</div>

											{/* Auth Buttons */}
											<div className="space-y-4 pt-8 border-t">
												<Button
													asChild
													variant="outline"
													size="lg"
													className="justify-center w-full h-12 text-base"
													onClick={closeMobileMenu}
												>
													<Link href="/sign-in">Log in</Link>
												</Button>
												<Button
													asChild
													size="lg"
													className="w-full h-12 text-base"
													onClick={closeMobileMenu}
												>
													<Link href="/sign-up">Sign up</Link>
												</Button>
											</div>
										</div>
									) : (
										<div className="space-y-10 mx-auto max-w-md">
											{/* App Navigation */}
											<div className="space-y-6">
												<h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">
													Navigation
												</h3>
												<nav className="space-y-2">
													<Link
														href="/dashboard"
														onClick={closeMobileMenu}
														className="block hover:bg-gray-50 px-4 py-4 border border-gray-100 rounded-lg font-medium text-gray-900 text-lg transition-colors"
													>
														Dashboard
													</Link>
													<Link
														href="/create"
														onClick={closeMobileMenu}
														className="flex items-center gap-3 hover:bg-gray-50 px-4 py-4 border border-gray-100 rounded-lg font-medium text-gray-900 text-lg transition-colors"
													>
														<PlusIcon className="w-5 h-5" />
														Create Deck
													</Link>
												</nav>
											</div>

											{/* Settings */}
											<div className="pt-8 border-t">
												<div className="space-y-4">
													<h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">
														Settings
													</h3>
													<div className="px-4 py-4 border border-gray-100 rounded-lg">
														<p className="mb-4 font-medium text-gray-700 text-base">
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
								<div className="bg-gray-50 p-6 border-t">
									<div className="flex justify-between items-center mx-auto max-w-md text-gray-500 text-sm">
										<span>© 2024 Anzii</span>
										<Link
											href="#"
											className="hover:text-gray-700 transition-colors"
										>
											Privacy
										</Link>
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
