import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Card as ShadCard,
} from "@/components/ui/card";
import type { DeckListItem } from "@/types";
import { Settings } from "lucide-react";
import Link from "next/link";
import DeckDeleteDialog from "./DeckDeleteDialog";
import DeckResetDialog from "./DeckResetDialog";

interface DeckCardProps {
    deck: DeckListItem;
    isResetting: boolean;
    onStartReview: (deckId: string) => void;
    onDeleteDeck: (deckId: string) => void;
    onResetDeck: (deckId: string) => void;
}

export default function DeckCard({
    deck,
    isResetting,
    onStartReview,
    onDeleteDeck,
    onResetDeck,
}: DeckCardProps) {
    return (
        <ShadCard className="flex flex-col transition-all">
            <div className="flex justify-between">
                <CardHeader>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.cardCount} cards</CardDescription>
                </CardHeader>
                <DeckDeleteDialog
                    deckId={deck.id}
                    deckName={deck.name}
                    onDeleteDeck={onDeleteDeck}
                />
            </div>
            <CardContent className="flex-grow">
                <div
                    className={`text-lg font-bold ${deck.dueCount > 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                >
                    {deck.dueCount} due
                </div>
                <p className="text-muted-foreground text-sm">for review today</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <div className="flex gap-2">
                    <Button asChild variant="outline" size="icon">
                        <Link href={`/deck/${deck.id}`} passHref>
                            <Settings />
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <DeckResetDialog
                        deckId={deck.id}
                        deckName={deck.name}
                        cardCount={deck.cardCount}
                        isResetting={isResetting}
                        onResetDeck={onResetDeck}
                    />
                    <Button
                        onClick={() => onStartReview(deck.id)}
                        disabled={deck.dueCount === 0}
                    >
                        Start
                    </Button>
                </div>
            </CardFooter>
        </ShadCard>
    );
} 