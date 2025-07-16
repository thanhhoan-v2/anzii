"use client";

import CardRow from "@/components/sections/deck/components/card-row";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Card as CardType } from "@/types";

interface CardsTableProps {
	cards: CardType[];
	onEditCard: (card: CardType) => void;
	onDeleteCard: (cardId: string) => void;
	isUpdatePending: boolean;
	isDeletePending: boolean;
}

export default function CardsTable({
	cards,
	onEditCard,
	onDeleteCard,
	isUpdatePending,
	isDeletePending,
}: CardsTableProps) {
	return (
		<div className="rounded-lg border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[45%]">Question</TableHead>
						<TableHead className="w-[45%]">Answer</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cards.map((card) => (
						<CardRow
							key={card.id}
							card={card}
							onEdit={onEditCard}
							onDelete={onDeleteCard}
							isUpdatePending={isUpdatePending}
							isDeletePending={isDeletePending}
						/>
					))}
				</TableBody>
			</Table>
			{cards.length === 0 && (
				<div className="p-8 text-center text-muted-foreground">
					This deck has no cards yet.
				</div>
			)}
		</div>
	);
}
