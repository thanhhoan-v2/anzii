"use client";

import { useEffect, useRef, useState } from "react";

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
	const [activeRowId, setActiveRowId] = useState<string | null>(null);
	const tableRef = useRef<HTMLDivElement>(null);

	const handleRowToggle = (cardId: string) => {
		setActiveRowId(activeRowId === cardId ? null : cardId);
	};

	// Handle click outside to close active row
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tableRef.current &&
				!tableRef.current.contains(event.target as Node)
			) {
				setActiveRowId(null);
			}
		};

		if (activeRowId) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [activeRowId]);

	return (
		<div className="rounded-lg border" ref={tableRef}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50%] border-r">Question</TableHead>
						<TableHead className="w-[50%]">Answer</TableHead>
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
							isActive={activeRowId === card.id}
							onToggle={() => handleRowToggle(card.id)}
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
