"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Deck, Card as CardType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import CardEditor from '@/components/CardEditor';
import { useToast } from "@/hooks/use-toast";
import { startOfToday } from 'date-fns';
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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DeckManagerPage() {
  const router = useRouter();
  const params = useParams();
  const { deckId } = params;
  const { toast } = useToast();

  const [decks, setDecks] = useLocalStorage<Deck[]>('decks', []);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);

  useEffect(() => {
    const currentDeck = decks.find(d => d.id === deckId);
    if (currentDeck) {
      setDeck(currentDeck);
      setDeckName(currentDeck.name);
    } else {
      // Redirect or show not found
      router.push('/');
    }
  }, [deckId, decks, router]);

  const handleNameSave = () => {
    if (deckName.trim().length < 3) {
      toast({ variant: 'destructive', title: 'Invalid Name', description: 'Deck name must be at least 3 characters.' });
      return;
    }
    setDecks(decks.map(d => (d.id === deckId ? { ...d, name: deckName.trim() } : d)));
    setIsEditingName(false);
    toast({ title: 'Deck Renamed', description: `Deck is now named "${deckName.trim()}".` });
  };

  const handleSaveCard = (cardData: { question: string, answer: string }) => {
    if (cardToEdit) {
      // Editing existing card
      const updatedCards = deck!.cards.map(c => c.id === cardToEdit.id ? { ...c, ...cardData } : c);
      setDecks(decks.map(d => (d.id === deckId ? { ...d, cards: updatedCards } : d)));
      toast({ title: 'Card Updated' });
    } else {
      // Adding new card
      const newCard: CardType = {
        ...cardData,
        id: `${Date.now()}`,
        interval: 0,
        easeFactor: 2.5,
        dueDate: startOfToday().toISOString(),
      };
      const updatedCards = [...deck!.cards, newCard];
      setDecks(decks.map(d => (d.id === deckId ? { ...d, cards: updatedCards } : d)));
      toast({ title: 'Card Added' });
    }
    setCardToEdit(null);
    setIsCardEditorOpen(false);
  };
  
  const handleAddCardClick = () => {
    setCardToEdit(null);
    setIsCardEditorOpen(true);
  }

  const handleEditCardClick = (card: CardType) => {
    setCardToEdit(card);
    setIsCardEditorOpen(true);
  }

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = deck!.cards.filter(c => c.id !== cardId);
    setDecks(decks.map(d => (d.id === deckId ? { ...d, cards: updatedCards } : d)));
    toast({ title: 'Card Deleted' });
  }

  if (!deck) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading deck...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/"><ArrowLeft className="mr-2" /> Back to Decks</Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline tracking-tight">Manage Deck</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              {isEditingName ? (
                <div className="flex gap-2 items-center w-full">
                  <Input value={deckName} onChange={(e) => setDeckName(e.target.value)} className="text-2xl font-semibold" />
                  <Button size="icon" onClick={handleNameSave}><Save /></Button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <CardTitle className="text-3xl">{deck.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsEditingName(true)}><Edit/></Button>
                </div>
              )}
            </div>
            <CardDescription>{deck.cards.length} cards in this deck.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button onClick={handleAddCardClick}><PlusCircle className="mr-2" /> Add New Card</Button>
            </div>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">Question</TableHead>
                    <TableHead className="w-[45%]">Answer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deck.cards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="align-top">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.question}</ReactMarkdown>
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.answer}</ReactMarkdown>
                        </div>
                      </TableCell>
                      <TableCell className="text-right align-top">
                        <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="icon" onClick={() => handleEditCardClick(card)}><Edit className="h-4 w-4" /></Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete this card?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        This will permanently delete this card. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteCard(card.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                           </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {deck.cards.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    This deck has no cards yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <CardEditor 
        isOpen={isCardEditorOpen}
        onOpenChange={setIsCardEditorOpen}
        onSave={handleSaveCard}
        cardToEdit={cardToEdit}
      />
    </div>
  );
}
