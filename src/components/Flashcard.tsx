"use client";

import type { Card as CardType } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';

interface FlashcardProps {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({ card, isFlipped }: FlashcardProps) {
  return (
    <div className="w-full max-w-2xl h-96 [perspective:1000px]">
      <div
        className={cn(
          "relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        )}
      >
        {/* Front of Card */}
        <Card className="absolute inset-0 [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6">
            <ScrollArea className="w-full h-full">
              <p className="text-center text-xl md:text-3xl font-semibold p-4">
                {card.question}
              </p>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6">
            <ScrollArea className="w-full h-full">
               <p className="text-center text-lg md:text-2xl text-muted-foreground p-4">
                {card.answer}
              </p>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
