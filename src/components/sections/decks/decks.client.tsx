"use client";

import { useUser } from "@stackframe/stack";
import { useState } from "react";

import AiDeckGenerator from "@/components/features/ai/ai-deck-generator";
import DeckList from "@/components/features/deck/deck-list";
import AppHeader from "@/components/layout/app-header";
import WelcomeScreen from "@/components/sections/welcome-screen";
import { Input } from "@/components/ui/input";
import { useDeckManagement } from "@/hooks/use-deck-management";
import { useFileImport } from "@/hooks/use-file-import";
import { useToast } from "@/hooks/use-toast";

import DecksLoading from "./decks-loading";

export default function DecksClient() {
	const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
	const { toast } = useToast();
	const user = useUser({ or: "redirect" });
	const deckManagement = useDeckManagement();
	const fileImport = useFileImport(() => deckManagement.fetchDecks());

	const handleDeckCreated = () => {
		setIsAiDeckGeneratorOpen(false);
		toast({
			title: "Deck Generated!",
			description: "Your new deck has been created.",
		});
		deckManagement.fetchDecks();
	};

	if (deckManagement.isLoading) {
		return <DecksLoading />;
	}

	if (!user) {
		return <h1>You can only see this if you are logged in</h1>;
	}

	return (
		<div className="min-h-screen bg-background font-sans text-foreground">
			<AppHeader />

			<main className="container mx-auto p-4 md:p-8">
				{deckManagement.decks.length === 0 ? (
					<WelcomeScreen
						onImport={fileImport.handleImportClick}
						onAiCreate={() => setIsAiDeckGeneratorOpen(true)}
					/>
				) : (
					<DeckList
						decks={deckManagement.decks}
						resetLoadingDeckId={deckManagement.resetLoadingDeckId}
						onDeleteDeck={deckManagement.handleDeleteDeck}
						onResetDeck={deckManagement.handleResetDeck}
					/>
				)}
			</main>

			<Input
				type="file"
				ref={fileImport.fileInputRef}
				onChange={fileImport.handleFileChange}
				accept=".json"
				className="hidden"
			/>

			{/* AI Deck Generator Modal */}
			<AiDeckGenerator
				isOpen={isAiDeckGeneratorOpen}
				onOpenChange={setIsAiDeckGeneratorOpen}
				onSuccess={handleDeckCreated}
			/>
		</div>
	);
}
