"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useUser } from "@stackframe/stack";
import { HomeIcon, Menu, PlusIcon, Search, SettingsIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { AppLogo } from "@/components/common/app-logo";
import { ColorSchemeSelector } from "@/components/common/color-scheme-selector";
import { Button, ButtonWithLink } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useDecks } from "@/hooks/use-decks";
import { ROUTES } from "@/lib/routes";

interface AppHeaderMobileProps {
	isNotDashboard: boolean;
}

export default function AppHeaderMobile({
	isNotDashboard,
}: AppHeaderMobileProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();

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
							<AppLogo textClassName="text-white" showText={true} />
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
											{mainNavLinks.map((link) => (
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
                                    {/* Search (Decks page only) */}
                                    {pathname === ROUTES.DECKS && (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const q = searchQuery.trim();
                                                if (q) {
                                                    // route to explore
                                                    router.push(`${ROUTES.EXPLORE}?q=${encodeURIComponent(q)}`);
                                                    closeMobileMenu();
                                                }
                                            }}
                                            className="group relative w-full"
                                        >
                                            <div className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <Input
                                                ref={searchInputRef}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                placeholder="Search decks..."
                                                aria-label="Search decks"
                                                className="bg-background/80 shadow-sm pr-12 pl-9 rounded-full focus-visible:ring-lime-400/60 h-11 text-foreground"
                                            />
                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    aria-label="Clear search"
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        searchInputRef.current?.focus();
                                                    }}
                                                    className="top-1/2 right-2 absolute hover:bg-muted/60 p-1 rounded-full text-muted-foreground hover:text-foreground -translate-y-1/2"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}

                                            {/* Suggestions Dropdown */}
                                            <SearchSuggestionsMobile
                                                open={isSearchFocused && searchQuery.trim().length > 0}
                                                query={searchQuery}
                                                onSelect={(deckId) => {
                                                    router.push(ROUTES.DECK(deckId));
                                                    closeMobileMenu();
                                                }}
                                            />
                                        </form>
                                    )}

									{/* App Navigation */}
									<div className="space-y-6">
										<h3 className="font-medium text-gray-400 text-sm uppercase tracking-wider">
											Navigation
										</h3>
										<nav className="space-y-2">
											<Link
												href={ROUTES.DECKS}
												onClick={closeMobileMenu}
												className="flex justify-center items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												<HomeIcon className="w-5 h-5" />
												Dashboard
											</Link>
											<Link
												href={ROUTES.CREATE}
												onClick={closeMobileMenu}
												className="flex justify-center items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												<PlusIcon className="w-5 h-5" />
												Create Deck
											</Link>
											<Link
												href={ROUTES.SETTINGS}
												onClick={closeMobileMenu}
												className="flex justify-center items-center gap-3 hover:bg-zinc-950 px-4 py-4 border border-zinc-800 hover:border-lime-400 rounded-lg font-medium text-white hover:text-lime-400 text-lg transition-colors"
											>
												<SettingsIcon className="w-5 h-5" />
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
											<ColorSchemeSelector triggerClassName="w-full text-lg" />
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

function SearchSuggestionsMobile({
    open,
    query,
    onSelect,
}: {
    open: boolean;
    query: string;
    onSelect: (deckId: string) => void;
}) {
    const user = useUser();
    const { data: decks } = useDecks(user?.id);

    const items = (decks || [])
        .filter((d) =>
            query.trim().length === 0
                ? false
                : [d.name, d.description || ""]
                      .join(" ")
                      .toLowerCase()
                      .includes(query.toLowerCase())
        )
        .slice(0, 8);

    if (!open) return null;

    return (
        <div className="right-0 left-0 z-50 absolute mt-2">
            <div className="bg-popover shadow-xl border rounded-xl overflow-hidden text-popover-foreground">
                <Command className="rounded-xl">
                    <CommandList>
                        {items.length === 0 ? (
                            <CommandEmpty>No results found.</CommandEmpty>
                        ) : (
                            <CommandGroup heading="Decks">
                                {items.map((d) => (
                                    <CommandItem
                                        key={d.id}
                                        value={d.name}
                                        onSelect={() => onSelect(d.id)}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">{d.name}</div>
                                            {d.description && (
                                                <div className="text-muted-foreground text-xs truncate">
                                                    {d.description}
                                                </div>
                                            )}
                                        </div>
                                        <div className="hidden md:flex items-center gap-2 text-muted-foreground text-xs">
                                            <span>Cards: {d.cardCount}</span>
                                            <span>Likes: {d.likeCount}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </div>
        </div>
    );
}
