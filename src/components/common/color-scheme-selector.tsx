"use client";

import { Check, Palette, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { cn } from "@/lib/utils";

export function ColorSchemeSelector({
	showText = true,
	triggerClassName: triggerBtnClassName,
	triggerTextClassName: triggerTextClassName,
}: {
	showText?: boolean;
	triggerClassName?: string;
	triggerTextClassName?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { colorScheme, setColorScheme, availableSchemes, colorSchemeName } =
		useColorScheme();

	const handleSchemeSelect = (schemeId: string) => {
		setColorScheme(schemeId);
		setIsOpen(false);
	};

	// Sort schemes to put the selected one at the top
	const sortedSchemes = useMemo(() => {
		const selectedScheme = availableSchemes.find(
			(scheme) => scheme.id === colorScheme
		);
		const otherSchemes = availableSchemes.filter(
			(scheme) => scheme.id !== colorScheme
		);

		return selectedScheme
			? [selectedScheme, ...otherSchemes]
			: availableSchemes;
	}, [availableSchemes, colorScheme]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button className={cn("rounded-lg p-4 shadow-md", triggerBtnClassName)}>
					<Palette className="mr-1 h-[1.2rem] w-[1.2rem]" />
					{showText && (
						<div className={triggerTextClassName}>{colorSchemeName}</div>
					)}
					<span className="sr-only">Select color scheme</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex w-80 flex-col sm:w-96"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="flex-shrink-0">
					<SheetTitle className="flex items-center justify-between gap-2">
						<Palette className="h-5 w-5" />
						<X
							className="h-5 w-5 cursor-pointer"
							onClick={() => setIsOpen(false)}
						/>
					</SheetTitle>
				</SheetHeader>

				<div className="-mr-2 mt-6 flex-1 overflow-y-auto pr-2">
					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
							Color Schemes
						</h3>
						<div className="space-y-3 pb-4">
							{sortedSchemes.map((scheme) => {
								const isSelected = colorScheme === scheme.id;
								return (
									<button
										key={scheme.id}
										type="button"
										onClick={() => handleSchemeSelect(scheme.id)}
										className={`group w-full rounded-lg border p-4 text-left transition-all ${
											isSelected
												? "border-primary bg-primary/5 shadow-sm"
												: "border-border hover:border-primary/50 hover:bg-muted/50"
										}`}
									>
										<div className="flex items-center gap-4">
											{/* Large Color Preview */}
											<div className="flex flex-col gap-2">
												<div className="flex gap-1">
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.primary})`,
														}}
													/>
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.secondary})`,
														}}
													/>
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.accent})`,
														}}
													/>
												</div>
												<div className="flex gap-1">
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.background})`,
														}}
													/>
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.card})`,
														}}
													/>
													<div
														className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
														style={{
															backgroundColor: `hsl(${scheme.colors.muted})`,
														}}
													/>
												</div>
											</div>

											{/* Scheme Info */}
											<div className="min-w-0 flex-1">
												<div
													className={`mb-1 text-base font-semibold transition-colors ${
														isSelected
															? "text-primary"
															: "group-hover:text-primary"
													}`}
												>
													{scheme.name}
												</div>
												<div className="text-sm leading-relaxed text-muted-foreground">
													{scheme.description}
												</div>
											</div>

											{/* Selected Indicator */}
											{isSelected && (
												<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
													<Check className="h-4 w-4 text-primary-foreground" />
												</div>
											)}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div className="mt-4 flex-shrink-0 border-t pt-4">
					<p className="text-center text-xs text-muted-foreground">
						Changes apply instantly across the entire app including Stack Auth
					</p>
				</div>
			</SheetContent>
		</Sheet>
	);
}
