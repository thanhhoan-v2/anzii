import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
	variant?: "hero" | "cards" | "timeline" | "faq" | "features";
	className?: string;
}

export default function LoadingSkeleton({
	variant = "cards",
	className = "",
}: LoadingSkeletonProps) {
	switch (variant) {
		case "hero":
			return (
				<section className={`px-4 py-16 md:px-24 md:py-24 ${className}`}>
					<div className="mx-auto max-w-6xl">
						<div className="space-y-6 text-center">
							<Skeleton className="mx-auto h-16 w-3/4 bg-zinc-800" />
							<Skeleton className="mx-auto h-6 w-1/2 bg-zinc-800" />
						</div>
					</div>
				</section>
			);

		case "cards":
			return (
				<section className={`px-4 py-12 md:px-24 ${className}`}>
					<div className="mx-auto max-w-6xl">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{Array.from({ length: 3 }).map((_, index) => (
								<Card
									key={index}
									className="rounded-[25px] border-zinc-800 bg-zinc-950 md:rounded-[45px]"
								>
									<CardContent className="p-6 md:p-8">
										<div className="space-y-6">
											<Skeleton className="h-8 w-3/4 bg-zinc-800" />
											<Skeleton className="h-12 w-1/2 bg-zinc-800" />
											<div className="space-y-2">
												<Skeleton className="h-10 w-full bg-zinc-800" />
												<Skeleton className="h-10 w-full bg-zinc-800" />
											</div>
											<div className="space-y-2">
												{Array.from({ length: 4 }).map((_, i) => (
													<Skeleton
														key={i}
														className="h-4 w-full bg-zinc-800"
													/>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			);

		case "timeline":
			return (
				<section className={`px-4 py-12 md:px-24 md:py-20 ${className}`}>
					<div className="space-y-8 md:space-y-12">
						<Skeleton className="mx-auto h-8 w-1/3 bg-zinc-800" />
						<div className="space-y-8">
							{Array.from({ length: 3 }).map((_, index) => (
								<Card
									key={index}
									className="rounded-[25px] border-zinc-800 bg-zinc-950 md:rounded-[45px]"
								>
									<CardContent className="p-6 md:p-8">
										<div className="space-y-6">
											<div className="flex items-center justify-between">
												<Skeleton className="h-8 w-1/4 bg-zinc-800" />
												<Skeleton className="h-6 w-20 bg-zinc-800" />
											</div>
											<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
												{Array.from({ length: 3 }).map((_, i) => (
													<div
														key={i}
														className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
													>
														<Skeleton className="mb-2 h-6 w-3/4 bg-zinc-800" />
														<Skeleton className="h-4 w-full bg-zinc-800" />
													</div>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			);

		case "faq":
			return (
				<section className={`px-4 py-16 md:px-24 ${className}`}>
					<div className="mx-auto max-w-4xl">
						<div className="space-y-8">
							<div className="text-center">
								<Skeleton className="mx-auto h-10 w-80 bg-zinc-800" />
							</div>
							<div className="space-y-4">
								{Array.from({ length: 4 }).map((_, index) => (
									<Card
										key={index}
										className="rounded-[25px] border-zinc-800 bg-zinc-950"
									>
										<CardContent className="p-6">
											<Skeleton className="h-6 w-3/4 bg-zinc-800" />
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>
				</section>
			);

		case "features":
			return (
				<section className={`px-4 py-12 md:px-24 ${className}`}>
					<div className="mx-auto max-w-6xl">
						<div className="space-y-12">
							<div className="space-y-4 text-center">
								<Skeleton className="mx-auto h-12 w-1/2 bg-zinc-800" />
								<Skeleton className="mx-auto h-6 w-3/4 bg-zinc-800" />
							</div>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{Array.from({ length: 6 }).map((_, index) => (
									<div key={index} className="space-y-4">
										<Skeleton className="h-12 w-12 bg-zinc-800" />
										<Skeleton className="h-6 w-3/4 bg-zinc-800" />
										<Skeleton className="h-16 w-full bg-zinc-800" />
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			);

		default:
			return (
				<div className={`animate-pulse ${className}`}>
					<Skeleton className="h-32 w-full bg-zinc-800" />
				</div>
			);
	}
}

// Custom animated skeleton component with enhanced animations
export const AnimatedSkeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={`animate-skeleton-fade-in transform animate-pulse animate-shimmer rounded-md transition-all duration-300 ease-out hover:scale-105 ${className}`}
			{...props}
		/>
	);
};

// Transition wrapper for smooth skeleton to content transition
export const SkeletonTransition = ({
	isLoading,
	skeleton,
	children,
	className = "",
}: {
	isLoading: boolean;
	skeleton: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={`relative ${className}`}>
			{isLoading ? (
				<div className="animate-skeleton-fade-in">{skeleton}</div>
			) : (
				<div className="animate-fade-in-up">{children}</div>
			)}
		</div>
	);
};
