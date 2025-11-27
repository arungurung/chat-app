import { Motion } from "@/components/motion/MotionProvider";

interface LoadingSkeletonProps {
	className?: string;
}

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
	return (
		<Motion.div
			className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
			animate={{
				backgroundPosition: ["200% 0", "-200% 0"],
			}}
			transition={{
				duration: 1.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
			}}
			style={{
				backgroundImage:
					"linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
				backgroundSize: "200% 100%",
			}}
		/>
	);
}

interface SkeletonCardProps {
	hasImage?: boolean;
}

export function SkeletonCard({ hasImage = true }: SkeletonCardProps) {
	return (
		<div className="rounded-lg bg-white p-2 shadow">
			{hasImage && <LoadingSkeleton className="mb-2 aspect-square w-full" />}
			<LoadingSkeleton className="mb-1 h-3.5 w-2/3" />
			<LoadingSkeleton className="h-3 w-1/3" />
			<LoadingSkeleton className="mt-1 h-2.5 w-1/4" />
		</div>
	);
}

interface SkeletonGridProps {
	count?: number;
	hasImage?: boolean;
}

export function SkeletonGrid({
	count = 5,
	hasImage = true,
}: SkeletonGridProps) {
	const items = Array.from(
		{ length: count },
		(_, i) => `skeleton-${crypto.randomUUID()}-${i}`,
	);
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{items.map((key) => (
				<SkeletonCard key={key} hasImage={hasImage} />
			))}
		</div>
	);
}
