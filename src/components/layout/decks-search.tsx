"use client";

import { useUser } from "@stackframe/stack";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import Kbd from "@/components/ui/kbd";
import { useDecks } from "@/hooks/use-decks";
import { ROUTES } from "@/lib/routes";

type DecksSearchProps = {
	variant?: "desktop" | "mobile";
	inputRef?: React.RefObject<HTMLInputElement | null>;
	onDone?: () => void;
};

export default function DecksSearch({
	variant = "desktop",
	inputRef,
	onDone,
}: DecksSearchProps) {
	// Always call hooks unconditionally, then choose which ref to use
	const internalRef = useRef<HTMLInputElement | null>(null);
	const controlledInputRef = (inputRef ?? internalRef) as React.RefObject<
		HTMLInputElement | null
	>;
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const user = useUser();
	const { data: decks } = useDecks(user?.id);
	const isDesktop = variant === "desktop";

	const items = (decks || [])
		.filter((d) =>
			searchQuery.trim().length === 0
				? false
				: [d.name, d.description || ""]
						.join(" ")
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
		)
		.slice(0, 8);

	// if (pathname !== ROUTES.DECKS) return null;

	return (
		<form
			className="group relative md:w-[400px] lg:w-[500px]"
			onSubmit={(e) => {
				e.preventDefault();
				const q = searchQuery.trim();
				if (q) {
					router.push(`${ROUTES.EXPLORE}?q=${encodeURIComponent(q)}`);
					onDone?.();
				}
			}}
		>
			<div className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
				<Search className="w-4 h-4" />
			</div>
			<Input
				ref={controlledInputRef}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onFocus={() => setIsSearchFocused(true)}
				onBlur={() => setIsSearchFocused(false)}
				placeholder="Search decks..."
				aria-label="Search decks"
				className={
					isDesktop
						? "h-10 rounded-full bg-background/80 pl-9 pr-16 text-foreground shadow-sm transition focus-visible:ring-lime-400/60"
						: "h-11 rounded-full bg-background/80 pl-9 pr-12 text-foreground shadow-sm focus-visible:ring-lime-400/60"
				}
			/>
			{searchQuery && (
				<button
					type="button"
					aria-label="Clear search"
					onClick={() => {
						setSearchQuery("");
						controlledInputRef.current?.focus();
					}}
					className="top-1/2 right-2 absolute hover:bg-muted/60 p-1 rounded-full text-muted-foreground hover:text-foreground -translate-y-1/2"
				>
					<X className="w-4 h-4" />
				</button>
			)}

			{isDesktop && !searchQuery && !isSearchFocused && (
				<div className="hidden md:block top-1/2 right-3 absolute -translate-y-1/2">
					<Kbd icon={<span className="px-1">/</span>} text=" to focus" />
				</div>
			)}

			<SearchSuggestions
				open={isSearchFocused && searchQuery.trim().length > 0}
				query={searchQuery}
				onSelect={(deckId) => {
					router.push(ROUTES.DECK(deckId));
					onDone?.();
				}}
				desktop={isDesktop}
			/>
		</form>
	);
}

function SearchSuggestions({
	open,
	query,
	onSelect,
	desktop,
}: {
	open: boolean;
	query: string;
	onSelect: (deckId: string) => void;
	desktop?: boolean;
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
		<div
			className={
				desktop
					? "absolute left-0 right-0 top-12 z-50"
					: "absolute left-0 right-0 z-50 mt-2"
			}
		>
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
