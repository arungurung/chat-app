import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AvatarsRow from "@/components/dashboard/AvatarsRow";
import { topArtistsQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/top-artists")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const topArtistsQuery = useQuery(topArtistsQueryOptions("medium_term", 50));
	const topArtists = topArtistsQuery.data?.items ?? [];

	return (
		<div className="space-y-4">
			<button
				type="button"
				onClick={() => navigate({ to: "/dashboard" })}
				className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
			>
				Back to Dashboard
			</button>
			<AvatarsRow
				title="Top Artists"
				artists={topArtists}
				onItemClick={(a) =>
					navigate({ to: "/dashboard/artist/$id", params: { id: a.id } })
				}
				enableLoadMore={true}
			/>
		</div>
	);
}
