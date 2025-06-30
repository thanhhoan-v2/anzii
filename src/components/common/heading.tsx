import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function Heading({ title }: { title: string }) {
	const isMobile = useIsMobile();
	return (
		<h1
			className={cn(
				"mx-auto w-fit rounded-md bg-brand-lime p-1 text-[2.5rem] font-bold text-black",
				isMobile && "text-center"
			)}
		>
			{title}
		</h1>
	);
}
