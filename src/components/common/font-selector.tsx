"use client";

import { Check, Type } from "lucide-react";
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
import { useFont } from "@/hooks/use-font";
import { cn } from "@/lib/utils";

export function FontSelector({
	showText = true,
	triggerClassName: triggerBtnClassName,
	triggerTextClassName: triggerTextClassName,
}: {
	showText?: boolean;
	triggerClassName?: string;
	triggerTextClassName?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { font, setFont, availableFonts, fontName } = useFont();

	const handleFontSelect = (fontId: string) => {
		setFont(fontId);
	};

	// Sort fonts to put the selected one at the top
	const sortedFonts = useMemo(() => {
		const selectedFont = availableFonts.find((f) => f.id === font);
		const otherFonts = availableFonts.filter((f) => f.id !== font);

		return selectedFont ? [selectedFont, ...otherFonts] : availableFonts;
	}, [availableFonts, font]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button className={cn("rounded-lg p-4 shadow-md", triggerBtnClassName)}>
					<Type className="mr-1 h-[1.2rem] w-[1.2rem]" />
					{showText && <div className={triggerTextClassName}>{fontName}</div>}
					<span className="sr-only">Select font</span>
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
							<Type className="h-5 w-5" />
							<span>Choose Font</span>
						</div>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto">
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
												{/* Font Preview */}
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<h4 className="text-sm font-semibold">
															{fontOption.name}
														</h4>
														{isSelected && (
															<Check className="h-4 w-4 text-primary" />
														)}
													</div>

													{/* Font Sample Preview */}
													<div
														className="rounded-lg border bg-card p-3"
														style={{ fontFamily: fontOption.family }}
													>
														<div className="space-y-2">
															<div className="text-lg font-semibold">
																The quick brown fox
															</div>
															<div className="text-sm">
																jumps over the lazy dog
															</div>
															<div className="text-xs text-muted-foreground">
																0123456789
															</div>
														</div>
													</div>
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
				</div>
			</SheetContent>
		</Sheet>
	);
}
