"use client";

import { Check, Palette } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { cn } from "@/lib/utils";

export function ThemeSelector({
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
					<span className="sr-only">Select theme</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex w-80 flex-col sm:w-96"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="flex-shrink-0">
					<SheetTitle className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Palette className="h-5 w-5" />
							<span>Customize Appearance</span>
						</div>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto">
					<div className="space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{sortedSchemes.map((scheme) => {
								const isSelected = colorScheme === scheme.id;
								return (
									<Card
										key={scheme.id}
										className={cn(
											"cursor-pointer transition-all duration-200 hover:shadow-md",
											isSelected
												? "ring-2 ring-primary ring-offset-2"
												: "hover:bg-muted/50"
										)}
										style={{
											backgroundColor: `hsl(${scheme.colors.card})`,
											color: `hsl(${scheme.colors.cardForeground})`,
											borderColor: `hsl(${scheme.colors.border})`,
										}}
										onClick={() => handleSchemeSelect(scheme.id)}
									>
										<CardContent className="p-4">
											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<h4
														className="text-sm font-semibold"
														style={{
															color: `hsl(${scheme.colors.cardForeground})`,
														}}
													>
														{scheme.name}
													</h4>
													{isSelected && (
														<Check
															className="h-4 w-4"
															style={{
																color: `hsl(${scheme.colors.primary})`,
															}}
														/>
													)}
												</div>

												<p
													className="text-xs leading-relaxed"
													style={{
														color: `hsl(${scheme.colors.mutedForeground})`,
													}}
												>
													{scheme.description}
												</p>

												{/* Color Palette Preview */}
												<div className="space-y-2">
													<div className="flex gap-1">
														<div
															className="h-6 w-6 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.primary})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-6 w-6 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.secondary})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-6 w-6 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.accent})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-6 w-6 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.muted})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
													</div>
													<div className="flex gap-1">
														<div
															className="h-4 w-4 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.background})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-4 w-4 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.card})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-4 w-4 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.border})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
														<div
															className="h-4 w-4 rounded border shadow-sm"
															style={{
																backgroundColor: `hsl(${scheme.colors.destructive})`,
																borderColor: `hsl(${scheme.colors.border})`,
															}}
														/>
													</div>
												</div>

												<div className="flex justify-between">
													<Button
														variant="ghost"
														size="sm"
														className="h-6 px-2 text-xs"
														style={{
															color: `hsl(${scheme.colors.primary})`,
														}}
													>
														{isSelected ? "Selected" : "Select Theme"}
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
