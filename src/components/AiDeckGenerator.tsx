"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from 'lucide-react';

import { createDeckFromAi } from '@/lib/actions';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


interface AiDeckGeneratorProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

const FormSchema = z.object({
    topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
});

export default function AiDeckGenerator({ isOpen, onOpenChange, onSuccess }: AiDeckGeneratorProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            topic: "",
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            const result = await createDeckFromAi(data);
            
            if (result.success) {
                onSuccess();
                form.reset();
            } else {
                 toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error,
                });
            }

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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Deck with AI</DialogTitle>
                    <DialogDescription>
                        Enter a topic below. The AI will generate a full flashcard deck for you.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'The Roman Empire'" {...field} />
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
