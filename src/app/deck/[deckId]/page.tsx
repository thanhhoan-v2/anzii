"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Deck, Card as CardType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, PlusCircle, Trash2, Edit, Save, Loader2 } from 'lucide-react';
import CardEditor from '@/components/CardEditor';
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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDeck, updateDeckName, addCard, updateCard, deleteCard } from '@/lib/actions';

export default function DeckManagerPage() {
  const router = useRouter();
  const params = useParams();
  const { deckId } = params;
  const { toast } = useToast();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);

  const fetchDeck = useCallback(async () => {
    if (typeof deckId !== 'string') return;
    setIsLoading(true);
    try {
      const currentDeck = await getDeck(deckId);
      if (currentDeck) {
        setDeck(currentDeck);
        setDeckName(currentDeck.name);
      } else {
        toast({ variant: 'destructive', title: 'Deck not found' });
        router.push('/');
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error fetching deck' });
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [deckId, router, toast]);

  useEffect(() => {
    fetchDeck();
  }, [fetchDeck]);

  const handleNameSave = async () => {
    if (deckName.trim().length < 3) {
      toast({ variant: 'destructive', title: 'Invalid Name', description: 'Deck name must be at least 3 characters.' });
      return;
    }
    const result = await updateDeckName({ deckId: deck!.id, name: deckName.trim() });
    if (result.success) {
      setIsEditingName(false);
      toast({ title: 'Deck Renamed', description: `Deck is now named "${deckName.trim()}".` });
      fetchDeck();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  const handleSaveCard = async (cardData: { question: string, answer: string }) => {
    let result;
    if (cardToEdit) {
      // Editing existing card
      result = await updateCard({ cardId: cardToEdit.id, ...cardData });
    } else {
      // Adding new card
      result = await addCard({ deckId: deck!.id, ...cardData });
    }

    if (result.success) {
      toast({ title: cardToEdit ? 'Card Updated' : 'Card Added' });
      fetchDeck();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
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

  const handleDeleteCard = async (cardId: string) => {
    const result = await deleteCard(cardId);
     if (result.success) {
      toast({ title: 'Card Deleted' });
      fetchDeck();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  }

  if (isLoading || !deck) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">Loading deck...</p>
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