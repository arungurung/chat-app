import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ListSection from "@/components/dashboard/ListSection";
import { topTracksQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/top-tracks")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const topTracks = useQuery(topTracksQueryOptions("medium_term", 50));
	const tracks = topTracks.data?.items ?? [];
	const initial = tracks.slice(0, 10);
	return (
		<div className="space-y-6">
			<button
				type="button"
				onClick={() => navigate({ to: "/dashboard" })}
				className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
			>
				Back to Dashboard
			</button>
			<ListSection
				title="Top Tracks"
				tracks={initial}
				onItemClick={(t) =>
					navigate({ to: "/dashboard/track/$id", params: { id: t.id } })
				}
				enableLoadMore={true}
			/>
		</div>
	);
}
