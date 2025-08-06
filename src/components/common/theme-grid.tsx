"use client";

import { Check } from "lucide-react";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { cn } from "@/lib/utils";

export function ThemeGrid() {
	const { colorScheme, setColorScheme, availableSchemes } = useColorScheme();

	const handleSchemeSelect = (schemeId: string) => {
		setColorScheme(schemeId);
	};

	// Sort schemes to put the selected one first
	const sortedSchemes = useMemo(() => {
		return availableSchemes;
	}, [availableSchemes]);

	return (
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
									{/* Theme Preview */}
									<div className="space-y-2">
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
													style={{ color: `hsl(${scheme.colors.primary})` }}
												/>
											)}
										</div>

										{/* Color Palette Preview */}
										<div className="space-y-2">
											{/* Primary Colors Row */}
											<div className="flex gap-1">
												<div
													className="h-6 w-6 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.primary})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Primary"
												/>
												<div
													className="h-6 w-6 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.secondary})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Secondary"
												/>
												<div
													className="h-6 w-6 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.accent})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Accent"
												/>
												<div
													className="h-6 w-6 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.muted})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Muted"
												/>
											</div>

											{/* Background Colors Row */}
											<div className="flex gap-1">
												<div
													className="h-4 w-4 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.background})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Background"
												/>
												<div
													className="h-4 w-4 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.card})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Card"
												/>
												<div
													className="h-4 w-4 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.border})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Border"
												/>
												<div
													className="h-4 w-4 rounded border shadow-sm"
													style={{
														backgroundColor: `hsl(${scheme.colors.destructive})`,
														borderColor: `hsl(${scheme.colors.border})`,
													}}
													title="Destructive"
												/>
											</div>
										</div>
									</div>

									{/* Description */}
									<p
										className="text-xs leading-relaxed"
										style={{ color: `hsl(${scheme.colors.mutedForeground})` }}
									>
										{scheme.description}
									</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="pt-2 text-center text-xs text-muted-foreground">
				Changes apply instantly across the entire app
			</div>
		</div>
	);
}
