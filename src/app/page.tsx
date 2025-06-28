"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Upload, FileText, Trash2, Settings, BookOpen, PlusCircle, Loader2, RefreshCw } from 'lucide-react';
import { Card as ShadCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Flashcard from '@/components/Flashcard';
import AiDeckGenerator from '@/components/AiDeckGenerator';
import type { Card as CardType, Deck, Rating, DeckListItem } from '@/types';
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
import { getDecksWithCounts, getDeck, deleteDeck, reviewCard, createDeckFromImport } from '@/lib/actions';
import { ThemeToggle } from '@/components/ThemeToggle';


const WelcomeScreen = ({ onImport, onAiCreate }: { onImport: () => void; onAiCreate: () => void; }) => (
  <div className="text-center py-16">
    <BookOpen className="mx-auto h-16 w-16 text-primary" />
    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Create Your First Deck</h2>
    <p className="mt-2 text-lg text-muted-foreground">Import from a file or use AI to generate cards from a topic.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Button onClick={onImport} size="lg"><Upload className="mr-2" /> Import from File</Button>
      <Button onClick={onAiCreate} size="lg"><FileText className="mr-2" /> Create with AI</Button>
    </div>
  </div>
);

export default function Home() {
  const [decks, setDecks] = useState<DeckListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [reviewQueue, setReviewQueue] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [isAiDeckGeneratorOpen, setIsAiDeckGeneratorOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchDecks = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedDecks = await getDecksWithCounts();
      setDecks(fetchedDecks);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not fetch decks." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  const progressValue = useMemo(() => {
    if (reviewQueue.length === 0) return 0;
    return (currentCardIndex / reviewQueue.length) * 100;
  }, [currentCardIndex, reviewQueue.length]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
          fetchDecks();
        } else {
          throw new Error(result.error || "Failed to import deck.");
        }
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
  
  const startReviewSession = useCallback(async (deckId: string) => {
    try {
      const deckToReview = await getDeck(deckId);
      if (!deckToReview) {
        toast({ variant: "destructive", title: "Error", description: "Could not find deck." });
        return;
      }
      
      const dueCards = deckToReview.cards.filter(card => new Date(card.dueDate) <= new Date());
  
      if (dueCards.length === 0) {
        toast({ title: "All Caught Up!", description: "You have no cards due for review today in this deck." });
        return;
      }
      
      setActiveDeck(deckToReview as Deck);
      setReviewQueue(dueCards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setSessionInProgress(true);

    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not start review session." });
    }
  }, [toast]);

  const handleDeckCreated = () => {
    setIsAiDeckGeneratorOpen(false);
    toast({
      title: "Deck Generated!",
      description: `Your new deck has been created.`,
    });
    fetchDecks();
  };

  const handleRate = async (rating: Rating) => {
    if (!isFlipped || !activeDeck) return;

    const currentCard = reviewQueue[currentCardIndex];
    await reviewCard({ cardId: currentCard.id, deckId: activeDeck.id, rating });
    
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
      fetchDecks();
    }
  };

  const handleRestartSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    toast({
      title: 'Session Restarted',
      description: 'You are now at the beginning of your review queue.',
    });
  };

  const handleDeleteDeck = async (deckId: string) => {
    const result = await deleteDeck(deckId);
    if (result.success) {
      toast({ title: "Deck Deleted", description: "The deck has been removed." });
      fetchDecks();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  const currentCard = sessionInProgress ? reviewQueue[currentCardIndex] : null;

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Loading decks...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline tracking-tight">FlashSync</h1>
          </Link>
          <div className="flex items-center gap-4">
            {decks.length > 0 && !sessionInProgress && (
              <div className="flex gap-2">
                <Button onClick={handleImportClick} variant="outline"><Upload /> Import</Button>
                <Button onClick={() => setIsAiDeckGeneratorOpen(true)}><PlusCircle /> Create Deck</Button>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        {sessionInProgress && currentCard && activeDeck ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full max-w-2xl mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{`Reviewing "${activeDeck.name}" | Card ${currentCardIndex + 1} of ${reviewQueue.length}`}</p>
                <Button variant="outline" size="sm" onClick={handleRestartSession}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                </Button>
              </div>
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
          <WelcomeScreen onImport={handleImportClick} onAiCreate={() => setIsAiDeckGeneratorOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map(deck => {
              return (
                <ShadCard key={deck.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.cardCount} cards</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className={`text-lg font-bold ${deck.dueCount > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                      {deck.dueCount} due
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
                    <Button onClick={() => startReviewSession(deck.id)} disabled={deck.dueCount === 0}>
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
      <AiDeckGenerator 
        isOpen={isAiDeckGeneratorOpen}
        onOpenChange={setIsAiDeckGeneratorOpen}
        onSuccess={handleDeckCreated}
      />
    </div>
  );
}
