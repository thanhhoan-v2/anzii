"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { startOfToday } from 'date-fns';
import { Loader2 } from 'lucide-react';

import { generateCardsFromMarkdown } from '@/ai/flows/generate-cards-from-markdown';
import { shuffle } from '@/lib/utils';
import type { Deck } from '@/types';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


interface MarkdownImporterProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onDeckGenerated: (deck: Deck) => void;
}

const FormSchema = z.object({
    topic: z.string().min(3, { message: "Deck name must be at least 3 characters." }),
    markdown: z.string().min(20, { message: "Markdown content must be at least 20 characters." }),
});

export default function MarkdownImporter({ isOpen, onOpenChange, onDeckGenerated }: MarkdownImporterProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            topic: "",
            markdown: "",
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            const result = await generateCardsFromMarkdown({ topic: data.topic, markdown: data.markdown });
            
            if (!result.cards || result.cards.length === 0) {
                toast({
                    variant: "destructive",
                    title: "No Cards Generated",
                    description: "The AI could not generate any cards from the provided text. Please try again with different content.",
                });
                return;
            }

            const shuffledCards = shuffle(result.cards);
            const today = startOfToday();

            const newDeck: Deck = {
                id: `${Date.now()}`,
                name: data.topic,
                cards: shuffledCards.map((card, index) => ({
                    id: `${Date.now()}-${index}`,
                    question: card.question,
                    answer: card.answer,
                    interval: 0,
                    easeFactor: 2.5,
                    dueDate: today.toISOString(),
                })),
            };
            
            onDeckGenerated(newDeck);
            form.reset();

        } catch (error) {
            console.error("AI deck generation error:", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "Could not generate deck. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpenChange = (open: boolean) => {
        if (!isLoading) {
            onOpenChange(open);
            if (!open) {
              form.reset();
            }
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Deck with AI</DialogTitle>
                    <DialogDescription>
                        Paste your notes in Markdown format below. The AI will generate flashcards for you.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deck Name / Topic</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'Photosynthesis'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="markdown"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Markdown Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Paste your notes here... e.g., `# Mitochondria\n- The powerhouse of the cell.`"
                                            className="min-h-[250px] resize-y"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate Deck"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
