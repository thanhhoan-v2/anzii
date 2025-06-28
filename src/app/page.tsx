"use client";

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { isBefore, startOfToday } from 'date-fns';
import { BrainCircuit, Upload, FileText, Trash2, Settings, BookOpen, PlusCircle } from 'lucide-react';
import { Card as ShadCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Flashcard from '@/components/Flashcard';
import MarkdownImporter from '@/components/MarkdownImporter';
import type { Card as CardType, Deck, Rating } from '@/types';
import { calculateNextReview } from '@/lib/srs';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WelcomeScreen = ({ onImport, onMarkdownImport }: { onImport: () => void; onMarkdownImport: () => void; }) => (
  <div className="text-center py-16">
    <BookOpen className="mx-auto h-16 w-16 text-primary" />
    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Create Your First Deck</h2>
    <p className="mt-2 text-lg text-muted-foreground">Import from a file or use AI to generate cards from your notes.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Button onClick={onImport} size="lg"><Upload className="mr-2" /> Import from File</Button>
      <Button onClick={onMarkdownImport} size="lg"><FileText className="mr-2" /> Create with AI</Button>
    </div>
  </div>
);

export default function Home() {
  const [decks, setDecks] = useLocalStorage<Deck[]>('decks', []);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [reviewQueue, setReviewQueue] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [isMarkdownImporterOpen, setIsMarkdownImporterOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
        if (!importedJson.name || !Array.isArray(importedJson.cards)) {
          throw new Error("Invalid deck format. 'name' and 'cards' array are required.");
        }
        const today = startOfToday();
        const newDeck: Deck = {
          id: `${Date.now()}`,
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
        setDecks(prev => [...prev, newDeck]);
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
    event.target.value = '';
  };
  
  const startReviewSession = useCallback((deckId: string) => {
    const deckToReview = decks.find(d => d.id === deckId);
    if (!deckToReview) return;
    
    const today = startOfToday();
    const dueCards = deckToReview.cards.filter(card => isBefore(new Date(card.dueDate), today) || new Date(card.dueDate).getTime() === today.getTime());

    if (dueCards.length === 0) {
      toast({ title: "All Caught Up!", description: "You have no cards due for review today in this deck." });
      return;
    }
    
    setActiveDeck(deckToReview);
    setReviewQueue(dueCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionInProgress(true);
  }, [decks, toast]);

  const handleDeckGenerated = (newDeck: Deck) => {
    setDecks(prev => [...prev, newDeck]);
    setIsMarkdownImporterOpen(false);
    toast({
      title: "Deck Generated!",
      description: `"${newDeck.name}" with ${newDeck.cards.length} cards has been created.`,
    });
  };

  const handleRate = (rating: Rating) => {
    if (!isFlipped || !activeDeck) return;

    const currentCard = reviewQueue[currentCardIndex];
    const updatedCard = calculateNextReview(currentCard, rating);

    setDecks(prevDecks => prevDecks.map(d => 
        d.id === activeDeck.id 
            ? { ...d, cards: d.cards.map(c => c.id === updatedCard.id ? updatedCard : c) }
            : d
    ));

    if (currentCardIndex + 1 < reviewQueue.length) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionInProgress(false);
      setActiveDeck(null);
      toast({
        title: "Session Complete!",
        description: `You've reviewed ${reviewQueue.length} cards. Great job!`,
      });
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks(decks => decks.filter(d => d.id !== deckId));
    toast({ title: "Deck Deleted", description: "The deck has been removed." });
  };

  const currentCard = sessionInProgress ? reviewQueue[currentCardIndex] : null;

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline tracking-tight">FlashSync</h1>
          </Link>
          {decks.length > 0 && !sessionInProgress && (
            <div className="flex gap-2">
              <Button onClick={handleImportClick} variant="outline"><Upload /> Import</Button>
              <Button onClick={() => setIsMarkdownImporterOpen(true)}><PlusCircle /> Create Deck</Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        {sessionInProgress && currentCard && activeDeck ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full max-w-2xl mb-4">
              <p className="text-center text-sm text-muted-foreground">{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueue.length}`}</p>
              <Progress value={progressValue} className="w-full h-2 mt-1" />
            </div>
            <Flashcard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(true)}
            />
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
        ) : decks.length === 0 ? (
          <WelcomeScreen onImport={handleImportClick} onMarkdownImport={() => setIsMarkdownImporterOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map(deck => {
              const today = startOfToday();
              const dueCount = deck.cards.filter(card => isBefore(new Date(card.dueDate), today) || new Date(card.dueDate).getTime() === today.getTime()).length;
              return (
                <ShadCard key={deck.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.cards.length} cards</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className={`text-lg font-bold ${dueCount > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                      {dueCount} due
                    </div>
                    <p className="text-sm text-muted-foreground">for review today</p>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <div className="flex gap-2">
                      <Link href={`/deck/${deck.id}`} passHref>
                        <Button variant="outline" size="icon"><Settings/></Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon"><Trash2/></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the "{deck.name}" deck and all its cards.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteDeck(deck.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <Button onClick={() => startReviewSession(deck.id)} disabled={dueCount === 0}>
                      Review
                    </Button>
                  </CardFooter>
                </ShadCard>
              )
            })}
          </div>
        )}
      </main>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
      <MarkdownImporter 
        isOpen={isMarkdownImporterOpen}
        onOpenChange={setIsMarkdownImporterOpen}
        onDeckGenerated={handleDeckGenerated}
      />
    </div>
  );
}
