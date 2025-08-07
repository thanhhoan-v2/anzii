"use client";

import { Check } from "lucide-react";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useFont } from "@/hooks/use-font";
import { cn } from "@/lib/utils";

export function FontGrid() {
	const { font, setFont, availableFonts } = useFont();

	const handleFontSelect = (fontId: string) => {
		setFont(fontId);
	};

	// Sort fonts to put the selected one first
	const sortedFonts = useMemo(() => {
		return availableFonts;
	}, [availableFonts]);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{sortedFonts.map((fontOption) => {
					const isSelected = font === fontOption.id;
					return (
						<Card
							key={fontOption.id}
							className={cn(
								"cursor-pointer transition-all duration-200 hover:shadow-md",
								isSelected
									? "ring-2 ring-primary ring-offset-2"
									: "hover:bg-muted/50"
							)}
							onClick={() => handleFontSelect(fontOption.id)}
						>
							<CardContent className="p-4">
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<h4 className="text-sm font-semibold">{fontOption.name}</h4>
										{isSelected && <Check className="h-4 w-4 text-primary" />}
									</div>

									{/* Description */}
									<p className="text-xs leading-relaxed text-muted-foreground">
										{fontOption.description}
									</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
