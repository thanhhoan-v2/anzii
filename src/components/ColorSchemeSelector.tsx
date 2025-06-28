"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Check, Palette } from "lucide-react";

export function ColorSchemeSelector() {
	const { colorScheme, colorSchemeData, setColorScheme, availableSchemes } =
		useColorScheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Palette className="w-[1.2rem] h-[1.2rem]" />
					<span className="sr-only">Select color scheme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-64">
				<DropdownMenuLabel>Color Schemes</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{availableSchemes.map((scheme) => (
					<DropdownMenuItem
						key={scheme.id}
						onClick={() => setColorScheme(scheme.id)}
						className="cursor-pointer"
					>
						<div className="flex items-center gap-3 w-full">
							{/* Color Preview */}
							<div className="flex gap-1">
								<div
									className="border border-gray-300 rounded-full w-3 h-3"
									style={{
										backgroundColor: `hsl(${scheme.colors.primary})`,
									}}
								/>
								<div
									className="border border-gray-300 rounded-full w-3 h-3"
									style={{
										backgroundColor: `hsl(${scheme.colors.secondary})`,
									}}
								/>
								<div
									className="border border-gray-300 rounded-full w-3 h-3"
									style={{
										backgroundColor: `hsl(${scheme.colors.accent})`,
									}}
								/>
							</div>

							{/* Scheme Info */}
							<div className="flex-1 min-w-0">
								<div className="font-medium text-sm truncate">
									{scheme.name}
								</div>
								<div className="text-muted-foreground text-xs truncate">
									{scheme.description}
								</div>
							</div>

							{/* Selected Indicator */}
							{colorScheme === scheme.id && (
								<Check className="flex-shrink-0 w-4 h-4 text-primary" />
							)}
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
