interface LoadingGridProps {
	count?: number;
	columns?: "default" | "reduced";
}

export function LoadingGrid({
	count = 10,
	columns = "default",
}: LoadingGridProps) {
	const gridClass =
		columns === "reduced"
			? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

	return (
		<div className={gridClass}>
			{Array.from(
				{ length: count },
				(_, index) => `skeleton-${Date.now()}-${index}`,
			).map((skeletonId) => (
				<div
					key={skeletonId}
					className="animate-pulse rounded-lg bg-white p-4 shadow"
				>
					<div className="mb-3 aspect-square w-full rounded-md bg-gray-200" />
					<div className="mb-2 h-4 rounded bg-gray-200" />
					<div className="h-3 w-3/4 rounded bg-gray-200" />
				</div>
			))}
		</div>
	);
}
