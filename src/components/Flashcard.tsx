"use client";

import type { Card as CardType } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
              <div className="prose dark:prose-invert max-w-none p-4 text-xl md:text-2xl font-semibold">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {card.question}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6">
            <ScrollArea className="w-full h-full">
               <div className="prose dark:prose-invert max-w-none p-4 text-lg md:text-xl text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {card.answer}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
