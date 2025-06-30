import type React from "react";
import { useCallback, useRef } from "react";

import { useToast } from "@/hooks/use-toast";
import { createDeckFromImport } from "@/lib/actions";

interface UseFileImportReturn {
	fileInputRef: React.RefObject<HTMLInputElement>;
	handleImportClick: () => void;
	handleFileChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => Promise<void>;
}

export function useFileImport(
	onImportSuccess: () => void
): UseFileImportReturn {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	const handleImportClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = async (e) => {
				try {
					const content = e.target?.result as string;
					const importedJson = JSON.parse(content);

					const result = await createDeckFromImport(importedJson);

					if (result.success) {
						toast({
							title: "Deck Imported!",
							description: `Your new deck has been loaded.`,
						});
						onImportSuccess();
					} else {
						throw new Error(result.error || "Failed to import deck.");
					}
				} catch (error) {
					console.error("Failed to parse JSON:", error);
					toast({
						variant: "destructive",
						title: "Import Failed",
						description:
							error instanceof Error
								? error.message
								: "The selected file is not valid JSON.",
					});
				}
			};
			reader.readAsText(file);
			event.target.value = "";
		},
		[toast, onImportSuccess]
	);

	return {
		fileInputRef,
		handleImportClick,
		handleFileChange,
	};
}
