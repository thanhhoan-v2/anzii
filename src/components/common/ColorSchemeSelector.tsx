"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

export function ColorSchemeSelector() {
	const { colorScheme, setColorScheme, availableSchemes } = useColorScheme();
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const handleSchemeSelect = (schemeId: string) => {
		setColorScheme(schemeId);
		setIsOpen(false);
	};

	const handleThemeSelect = (newTheme: string) => {
		setTheme(newTheme);
	};

	// Sort schemes to put the selected one at the top
	const sortedSchemes = useMemo(() => {
		const selectedScheme = availableSchemes.find(
			(scheme) => scheme.id === colorScheme,
		);
		const otherSchemes = availableSchemes.filter(
			(scheme) => scheme.id !== colorScheme,
		);

		return selectedScheme
			? [selectedScheme, ...otherSchemes]
			: availableSchemes;
	}, [availableSchemes, colorScheme]);

	const themeOptions = [
		{ id: 'light', label: 'Light', icon: Sun },
		{ id: 'dark', label: 'Dark', icon: Moon },
		{ id: 'system', label: 'System', icon: Monitor },
	];

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Palette className="w-[1.2rem] h-[1.2rem]" />
					<span className="sr-only">Select color scheme</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex flex-col w-80 sm:w-96"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="flex-shrink-0">
					<SheetTitle className="flex items-center gap-2">
						<Palette className="w-5 h-5" />
						Theme & Colors
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 mt-6 -mr-2 pr-2 overflow-y-auto">
					{/* Light/Dark Mode Section */}
					{/* <div className="mb-6">
						<h3 className="mb-3 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
							Theme Mode
						</h3>
						<div className="gap-2 grid grid-cols-3">
							{themeOptions.map((option) => {
								const Icon = option.icon;
								const isSelected = theme === option.id;
								return (
									<button
										key={option.id}
										type="button"
										onClick={() => handleThemeSelect(option.id)}
										className={`p-3 rounded-lg border transition-all ${isSelected
											? "border-primary bg-primary/5 text-primary"
											: "border-border hover:bg-muted/50 hover:border-primary/50"
											}`}
									>
										<Icon className="mx-auto mb-1 w-5 h-5" />
										<div className="font-medium text-xs">{option.label}</div>
									</button>
								);
							})}
						</div>
					</div> */}

					{/* Color Schemes Section */}
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
										className={`w-full p-4 rounded-lg border transition-all text-left group ${isSelected
											? "border-primary bg-primary/5 shadow-sm"
											: "border-border hover:bg-muted/50 hover:border-primary/50"
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
													className={`font-semibold text-base mb-1 transition-colors ${isSelected
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
