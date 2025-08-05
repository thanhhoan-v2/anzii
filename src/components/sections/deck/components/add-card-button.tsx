"use client";

import { Loader2, PlusIcon } from "lucide-react";

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
		<Button
			onClick={onClick}
			className={`transition-all duration-200 ${
				isPending ? "cursor-not-allowed opacity-75" : "hover:scale-105"
			}`}
			disabled={isPending}
		>
			{isPending ? (
				<Loader2 className="animate-rotate-smooth mr-2" />
			) : (
				<PlusIcon />
			)}
			New Card
		</Button>
	);
}
