"use client";

import { Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AddCardButtonProps {
	onClick: () => void;
	isPending: boolean;
}

export default function AddCardButton({
	onClick,
	isPending,
}: AddCardButtonProps) {
	return (
		<div className="mb-4 flex w-full justify-end">
			<Button
				onClick={onClick}
				className={`w-full transition-all duration-200 ${
					isPending ? "cursor-not-allowed opacity-75" : "hover:scale-105"
				}`}
				disabled={isPending}
			>
				{isPending ? (
					<Loader2 className="animate-rotate-smooth mr-2" />
				) : (
					<PlusCircle className="mr-2" />
				)}
				Add New Card
			</Button>
		</div>
	);
}
