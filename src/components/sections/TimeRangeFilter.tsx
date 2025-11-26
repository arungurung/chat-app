import type { SpotifyTimeRange } from "@/types/spotify";

interface TimeRangeFilterProps {
	value: SpotifyTimeRange;
	onChange: (timeRange: SpotifyTimeRange) => void;
}

const timeRangeLabels: Record<SpotifyTimeRange, string> = {
	short_term: "4 Weeks",
	medium_term: "6 Months",
	long_term: "All Time",
};

export function TimeRangeFilter({ value, onChange }: TimeRangeFilterProps) {
	const ranges: SpotifyTimeRange[] = ["short_term", "medium_term", "long_term"];

	return (
		<div className="inline-flex rounded-lg bg-white p-1 shadow-sm">
			{ranges.map((range) => (
				<button
					key={range}
					type="button"
					onClick={() => onChange(range)}
					className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
						value === range
							? "bg-green-600 text-white"
							: "text-gray-700 hover:bg-gray-100"
					}`}
				>
					{timeRangeLabels[range]}
				</button>
			))}
		</div>
	);
}
