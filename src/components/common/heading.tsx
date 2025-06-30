import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function Heading({ title }: { title: string }) {
    const isMobile = useIsMobile();
    return (
        <h1 className={cn("bg-brand-lime p-1 rounded-md w-fit mx-auto font-bold text-black text-[2.5rem]", isMobile && "text-center")}>
            {title}
        </h1>
    );
}