"use client";

import { UserButton, useUser } from "@stackframe/stack";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AppLogo } from "@/components/common/app-logo";
import AppHeaderMobile from "@/components/layout/app-header-mobile";
import DecksSearch from "@/components/layout/decks-search";
import { Button, ButtonWithLink } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ROUTES } from "@/lib/routes";

export default function AppHeader({
	children,
}: {
	children?: React.ReactNode;
}) {
	const pathname = usePathname();
	const user = useUser();
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

	useSlashToFocusSearch(
		pathname === ROUTES.DECKS,
		searchInputRef as React.RefObject<HTMLInputElement>
	);

	const publicNavigationPages = [
		ROUTES.HOME,
		ROUTES.FEATURES,
		ROUTES.ROADMAP,
		ROUTES.PRIVACY_POLICY,
		ROUTES.TERMS_OF_SERVICE,
		ROUTES.CONTACT,
	] as const;

	const mainNavLinks = [
		{ href: ROUTES.FEATURES, label: "Features" },
		{ href: ROUTES.ROADMAP, label: "Roadmap" },
	];

	const isPublicPage = publicNavigationPages.includes(
		pathname as (typeof publicNavigationPages)[number]
	);

	// Mobile search handled via dialog + icon; desktop search shown >= 425px

	return (
		<header className="top-0 z-50 sticky bg-secondary p-4 border-primary border-b text-white">
			<div className="flex justify-between items-center">
				{children ?? <AppLogo showText={false} />}

				{pathname === ROUTES.DECKS && (
					<>
						<div className="hidden md:block">
							<DecksSearch variant="desktop" inputRef={searchInputRef} />
						</div>
					</>
				)}

				<div className="hidden md:flex items-center gap-6">
					{/* Protected/Dashboard Navigation */}
					{!isPublicPage && (
						<div className="flex items-center gap-4">
							{pathname !== ROUTES.CREATE && (
								<ButtonWithLink
									href={ROUTES.CREATE}
									className="px-3 h-9 text-sm"
								>
									<PlusIcon className="w-4 h-4" /> Create
								</ButtonWithLink>
							)}
							{/* <ColorSchemeSelector /> */}
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
					<div className="hidden md:flex items-center gap-2">
						{user ? (
							<>
								<ButtonWithLink
									prefetch={true}
									href={ROUTES.DECKS}
									className="px-3 h-9 text-sm"
								>
									Your Decks
								</ButtonWithLink>
								<UserButton />
							</>
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

				<div className="md:hidden flex items-center gap-2">
					{pathname === ROUTES.DECKS && (
						<div className="md:hidden block">
							<Dialog
								open={isSearchDialogOpen}
								onOpenChange={setIsSearchDialogOpen}
							>
								<DialogTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										aria-label="Search"
										className="hover:bg-zinc-950 text-white hover:text-lime-400"
									>
										<Search className="w-5 h-5" />
									</Button>
								</DialogTrigger>
								<DialogContent className="top-0 left-0 m-0 p-0 rounded-none w-screen max-w-none h-screen translate-x-0 translate-y-0">
									<div className="flex flex-col bg-background h-full">
										<div className="p-4 border-b">
											<div className="font-medium text-base">Search decks</div>
										</div>
										<div className="p-4">
											<DecksSearch
												variant="mobile"
												onDone={() => setIsSearchDialogOpen(false)}
											/>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					)}

					<AppHeaderMobile isNotDashboard={isPublicPage} />
				</div>
			</div>
		</header>
	);
}

// Focus the search bar on '/' key when on Decks page
// Ignore if typing inside an input/textarea/contenteditable
export function useSlashToFocusSearch(
	enabled: boolean,
	inputRef: React.RefObject<HTMLInputElement>
) {
	useEffect(() => {
		if (!enabled) return;
		const handler = (event: KeyboardEvent) => {
			const active = document.activeElement as HTMLElement | null;
			const isTypingInField =
				!!active &&
				(active.tagName === "INPUT" ||
					active.tagName === "TEXTAREA" ||
					active.isContentEditable);
			if (isTypingInField) return;
			if (event.key === "/" || event.code === "Slash") {
				event.preventDefault();
				inputRef.current?.focus();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [enabled, inputRef]);
}
