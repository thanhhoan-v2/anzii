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
				<Button
					variant="outline"
					size="lg"
					className={cn("rounded-lg p-4", triggerBtnClassName)}
				>
					<Palette className="mr-1 w-[1.2rem] h-[1.2rem]" />
					{showText && (
						<div className={triggerTextClassName}>{colorSchemeName}</div>
					)}
					<span className="sr-only">Select color scheme</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex flex-col w-80 sm:w-96"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="flex-shrink-0">
					<SheetTitle className="flex justify-between items-center gap-2">
						<Palette className="w-5 h-5" />
						<X
							className="w-5 h-5 cursor-pointer"
							onClick={() => setIsOpen(false)}
						/>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 mt-6 -mr-2 pr-2 overflow-y-auto">
					<div>
						<h3 className="mb-3 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
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
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.primary})`,
														}}
													/>
													<div
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.secondary})`,
														}}
													/>
													<div
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.accent})`,
														}}
													/>
												</div>
												<div className="flex gap-1">
													<div
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.background})`,
														}}
													/>
													<div
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.card})`,
														}}
													/>
													<div
														className="shadow-sm border border-border/50 rounded-full w-4 h-4"
														style={{
															backgroundColor: `hsl(${scheme.colors.muted})`,
														}}
													/>
												</div>
											</div>

											{/* Scheme Info */}
											<div className="flex-1 min-w-0">
												<div
													className={`mb-1 text-base font-semibold transition-colors ${
														isSelected
															? "text-primary"
															: "group-hover:text-primary"
													}`}
												>
													{scheme.name}
												</div>
												<div className="text-muted-foreground text-sm leading-relaxed">
													{scheme.description}
												</div>
											</div>

											{/* Selected Indicator */}
											{isSelected && (
												<div className="flex flex-shrink-0 justify-center items-center bg-primary rounded-full w-6 h-6">
													<Check className="w-4 h-4 text-primary-foreground" />
												</div>
											)}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div className="flex-shrink-0 mt-4 pt-4 border-t">
					<p className="text-muted-foreground text-xs text-center">
						Changes apply instantly across the entire app including Stack Auth
					</p>
				</div>
			</SheetContent>
		</Sheet>
	);
}
