import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TrackCard from "@/components/spotify/TrackCard";
import type { SpotifyTimeRange } from "@/types/spotify";
import { topTracksQueryOptions } from "@/utils/spotify-queries";
import { LoadingGrid } from "./LoadingGrid";
import { TimeRangeFilter } from "./TimeRangeFilter";

export function TopTracksSection() {
	const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("medium_term");
	const { data, isLoading, error, refetch } = useQuery(
		topTracksQueryOptions(timeRange),
	);

	if (isLoading) {
		return (
			<section>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-800">Your Top Tracks</h2>
					<TimeRangeFilter value={timeRange} onChange={setTimeRange} />
				</div>
				<LoadingGrid />
			</section>
		);
	}

	if (error) {
		return (
			<section>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-800">Your Top Tracks</h2>
					<TimeRangeFilter value={timeRange} onChange={setTimeRange} />
				</div>
				<div className="rounded-lg border border-red-200 bg-red-50 p-4">
					<p className="text-sm text-red-800">
						Failed to load top tracks. {error.message}
					</p>
					<button
						type="button"
						onClick={() => refetch()}
						className="mt-2 text-sm font-semibold text-red-600 hover:text-red-800"
					>
						Try again
					</button>
				</div>
			</section>
		);
	}

	if (!data?.items || data.items.length === 0) {
		return (
			<section>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-800">Your Top Tracks</h2>
					<TimeRangeFilter value={timeRange} onChange={setTimeRange} />
				</div>
				<div className="rounded-lg bg-gray-100 p-8 text-center">
					<p className="text-gray-600">No top tracks found. Start listening!</p>
				</div>
			</section>
		);
	}

	return (
		<section>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-gray-800">Your Top Tracks</h2>
				<TimeRangeFilter value={timeRange} onChange={setTimeRange} />
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{data.items.map((track) => (
					<TrackCard
						key={track.id}
						track={track}
						onClick={(track) =>
							window.open(track.external_urls.spotify, "_blank")
						}
					/>
				))}
			</div>
		</section>
	);
}
