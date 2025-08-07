import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CardTypeBadgesProps {
	flashcardCount: number;
	mcqCount: number;
	fillInBlanksCount: number;
}

export default function CardTypeBadges({
	flashcardCount,
	mcqCount,
	fillInBlanksCount,
}: CardTypeBadgesProps) {
	const flashcardColor = "bg-blue-500";
	const mcqColor = "bg-green-500";
	const fillInBlanksColor = "bg-red-500";

	return (
		<div className="flex flex-wrap gap-1">
			{flashcardCount > 0 && (
				<Badge className={cn("text-xs", flashcardColor)}>Flash Cards</Badge>
			)}
			{mcqCount > 0 && <Badge className={cn("text-xs", mcqColor)}>MCQ</Badge>}
			{fillInBlanksCount > 0 && (
				<Badge className={cn("text-xs", fillInBlanksColor)}>
					Fill-in Blanks
				</Badge>
			)}
		</div>
	);
}
