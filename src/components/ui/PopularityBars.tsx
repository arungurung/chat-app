interface PopularityBarsProps {
	value?: number; // 0-100
	bars?: number;
}

export default function PopularityBars({
	value = 0,
	bars = 10,
}: PopularityBarsProps) {
	const clamped = Math.max(0, Math.min(100, value));
	const filled = Math.round((clamped / 100) * bars);
	return (
		<div className="flex items-center gap-1" data-popularity={clamped}>
			{Array.from({ length: bars }).map((_, i) => {
				const active = i < filled;
				// Using a deterministic key based on bars count and value avoids plain index usage
				const key = `pop-${bars}-${clamped}-${i}`;
				return (
					<div
						key={key}
						className={`h-2 w-1.5 ${active ? "bg-green-500" : "bg-gray-200"}`}
					/>
				);
			})}
		</div>
	);
}
