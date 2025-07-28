import { cn } from "@/lib/utils";

const Kbd = ({
	icon,
	className,
	text,
}: {
	className?: string;
	icon: React.ReactNode;
	text?: string;
}) => {
	return (
		<div className="flex items-center">
			<kbd
				className={cn(
					"flex items-center gap-1 rounded-md bg-muted p-1 text-xs font-semibold text-muted-foreground",
					className
				)}
			>
				{icon}
			</kbd>
			{text && (
				<span className="ml-2 text-xs text-muted-foreground">{text}</span>
			)}
		</div>
	);
};

export default Kbd;
