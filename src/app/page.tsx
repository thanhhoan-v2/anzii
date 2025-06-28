"use client";

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { isBefore, startOfToday } from 'date-fns';
import { BrainCircuit, Upload, Sparkles, BookOpen, RotateCcw, FileText } from 'lucide-react';
import { Card as ShadCard, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import AiQuestionSuggester from '@/components/AiQuestionSuggester';
import Flashcard from '@/components/Flashcard';
import MarkdownImporter from '@/components/MarkdownImporter';
import type { Card as CardType, Deck, Rating } from '@/types';
import { calculateNextReview } from '@/lib/srs';
import { useToast } from "@/hooks/use-toast";

const WelcomeScreen = ({ onStart, onImport, onMarkdownImport, hasDeck }: { onStart: () => void; onImport: () => void; onMarkdownImport: () => void; hasDeck: boolean }) => (
  <div className="text-center">
    <BookOpen className="mx-auto h-16 w-16 text-primary" />
    <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Welcome to your study session</h2>
    <p className="mt-2 text-muted-foreground">Import a deck, create one with AI, or start reviewing.</p>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <Button onClick={onImport} variant="outline"><Upload className="mr-2" /> Import from File</Button>
      <Button onClick={onMarkdownImport} variant="outline"><FileText className="mr-2" /> Create with AI</Button>
      {hasDeck && <Button onClick={onStart}>Start Review</Button>}
    </div>
  </div>
);

export default function Home() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [reviewQueue, setReviewQueue] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [isMarkdownImporterOpen, setIsMarkdownImporterOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const dueCards = useMemo(() => {
    if (!deck) return [];
    const today = startOfToday();
    return deck.cards.filter(card => isBefore(new Date(card.dueDate), today) || new Date(card.dueDate).getTime() === today.getTime());
  }, [deck]);
  
  const progressValue = useMemo(() => {
    if (reviewQueue.length === 0) return 0;
    return (currentCardIndex / reviewQueue.length) * 100;
  }, [currentCardIndex, reviewQueue.length]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedJson = JSON.parse(content);

        // Basic validation
        if (!importedJson.name || !Array.isArray(importedJson.cards)) {
          throw new Error("Invalid deck format. 'name' and 'cards' array are required.");
        }

        const today = startOfToday();
        const newDeck: Deck = {
          name: importedJson.name,
          cards: importedJson.cards.map((card: any, index: number) => ({
            id: card.id || `${Date.now()}-${index}`,
            question: card.question || '',
            answer: card.answer || '',
            interval: card.interval || 0,
            easeFactor: card.easeFactor || 2.5,
            dueDate: card.dueDate || today.toISOString(),
          })),
        };
        setDeck(newDeck);
        setSessionInProgress(false);
        toast({
          title: "Deck Imported!",
          description: `"${newDeck.name}" with ${newDeck.cards.length} cards has been loaded.`,
        });
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: error instanceof Error ? error.message : "The selected file is not valid JSON.",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };
  
  const startReviewSession = useCallback(() => {
    if(dueCards.length === 0) {
      toast({
        title: "All Caught Up!",
        description: "You have no cards due for review today.",
      });
      return;
    }
    setReviewQueue(dueCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionInProgress(true);
  }, [dueCards, toast]);

  const handleDeckGenerated = (newDeck: Deck) => {
    setDeck(newDeck);
    setSessionInProgress(false);
    setIsMarkdownImporterOpen(false);
    toast({
      title: "Deck Generated!",
      description: `"${newDeck.name}" with ${newDeck.cards.length} cards has been created.`,
    });
  };

  const handleRate = (rating: Rating) => {
    if (!isFlipped || !deck) return;

    const currentCard = reviewQueue[currentCardIndex];
    const updatedCard = calculateNextReview(currentCard, rating);

    const newDeckCards = deck.cards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );

    setDeck({ ...deck, cards: newDeckCards });

    if (currentCardIndex + 1 < reviewQueue.length) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionInProgress(false);
      toast({
        title: "Session Complete!",
        description: `You've reviewed ${reviewQueue.length} cards. Great job!`,
      });
    }
  };

  const currentCard = sessionInProgress ? reviewQueue[currentCardIndex] : null;

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline tracking-tight">FlashSync</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <ShadCard className="h-full min-h-[60vh] flex flex-col justify-center items-center p-4 shadow-lg">
              {sessionInProgress && currentCard ? (
                 <div className="w-full h-full flex flex-col">
                  <div className="mb-4">
                    <p className="text-center text-sm text-muted-foreground">{`Card ${currentCardIndex + 1} of ${reviewQueue.length}`}</p>
                    <Progress value={progressValue} className="w-full h-2 mt-1" />
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <Flashcard
                      card={currentCard}
                      isFlipped={isFlipped}
                      onFlip={() => setIsFlipped(true)}
                    />
                  </div>
                   <div className="mt-4 flex justify-center gap-3 w-full">
                      {isFlipped ? (
                        <>
                          <Button onClick={() => handleRate('hard')} className="bg-red-500 hover:bg-red-600 text-white w-28">Hard</Button>
                          <Button onClick={() => handleRate('medium')} className="bg-yellow-500 hover:bg-yellow-600 text-white w-28">Medium</Button>
                          <Button onClick={() => handleRate('easy')} className="bg-green-500 hover:bg-green-600 text-white w-28">Easy</Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsFlipped(true)} className="w-48">Show Answer</Button>
                      )}
                  </div>
                 </div>
              ) : (
                <WelcomeScreen onStart={startReviewSession} onImport={handleImportClick} onMarkdownImport={() => setIsMarkdownImporterOpen(true)} hasDeck={!!deck} />
              )}
            </ShadCard>
          </div>
          
          <div className="flex flex-col gap-8">
            <ShadCard className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen/>Deck Status</CardTitle>
                <CardDescription>{deck ? `Deck: "${deck.name}"` : "No deck loaded."}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Total Cards:</span> <span className="font-bold">{deck?.cards.length ?? 0}</span></div>
                  <div className="flex justify-between"><span>Due for Review:</span> <span className="font-bold">{dueCards.length}</span></div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                  <Button onClick={handleImportClick} variant="outline"><Upload className="mr-2" /> Import From File</Button>
                  <Button onClick={() => setIsMarkdownImporterOpen(true)} variant="outline"><FileText className="mr-2" /> Create with AI</Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                  {deck && <Button onClick={startReviewSession} disabled={sessionInProgress || dueCards.length === 0}><RotateCcw className="mr-2"/> Start Review</Button>}
                </div>
              </CardContent>
            </ShadCard>
            
            <AiQuestionSuggester />
          </div>

        </div>
      </main>
      <MarkdownImporter 
        isOpen={isMarkdownImporterOpen}
        onOpenChange={setIsMarkdownImporterOpen}
        onDeckGenerated={handleDeckGenerated}
      />
    </div>
  );
}
