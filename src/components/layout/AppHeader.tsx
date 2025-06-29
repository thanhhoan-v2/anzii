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
		<header className="top-0 z-50 sticky bg-black p-4 border-zinc-800 border-b">
			<div className="flex justify-between items-center mx-auto container">
				{/* Logo */}
				<AppLogo
					svgClassName="text-lime-400"
					textClassName="text-white"
					showText={true}
				/>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-6">
					{!isHome && (
						<div className="flex items-center gap-4">
							<Button
								asChild
								size="sm"
								className="bg-lime-400 hover:bg-lime-500 text-black"
							>
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
								<Button
									key={link.href}
									asChild
									variant="ghost"
									size="sm"
									className="hover:bg-zinc-950 text-white hover:text-lime-400"
								>
									<Link href={link.href}>{link.label}</Link>
								</Button>
							))}
						</nav>
					)}
				</div>

				{/* Desktop Auth Buttons (for home page) */}
				{isHome && (
					<div className="hidden md:flex items-center gap-2">
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="hover:bg-zinc-950 text-white hover:text-lime-400"
						>
							<Link href="/sign-in">Log in</Link>
						</Button>
						<Button
							asChild
							size="sm"
							className="bg-lime-400 hover:bg-lime-500 text-black"
						>
							<Link href="/sign-up">Sign up</Link>
						</Button>
					</div>
				)}

				{/* Mobile Menu */}
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
						<SheetContent
							side="right"
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
									{isHome ? (
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
													<Link href="/sign-in" onClick={closeMobileMenu}>
														Log in
													</Link>
												</Button>
												<Button
													asChild
													size="lg"
													className="bg-lime-400 hover:bg-lime-500 w-full h-12 text-black text-base"
												>
													<Link href="/sign-up" onClick={closeMobileMenu}>
														Sign up
													</Link>
												</Button>
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
														href="/dashboard"
														onClick={closeMobileMenu}
														className="block hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
													>
														Dashboard
													</Link>
													<Link
														href="/create"
														onClick={closeMobileMenu}
														className="flex items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
													>
														<PlusIcon className="w-5 h-5" />
														Create Deck
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
			</div>
		</header>
	);
}
