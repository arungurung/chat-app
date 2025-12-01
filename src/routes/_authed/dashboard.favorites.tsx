import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AvatarsRow from "@/components/dashboard/AvatarsRow";
import ListSection from "@/components/dashboard/ListSection";
import {
	topArtistsQueryOptions,
	topTracksQueryOptions,
} from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/favorites")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const topTracks = useQuery(topTracksQueryOptions("medium_term", 20));
	const topArtists = useQuery(topArtistsQueryOptions("medium_term", 20));
	const tracks = topTracks.data?.items ?? [];
	const artists = topArtists.data?.items ?? [];
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Favorites</h1>
			<ListSection
				title="Top Tracks"
				tracks={tracks}
				onItemClick={(t) =>
					navigate({ to: "/dashboard/track/$id", params: { id: t.id } })
				}
			/>
			<AvatarsRow
				title="Top Artists"
				artists={artists}
				onItemClick={(a) =>
					navigate({ to: "/dashboard/artist/$id", params: { id: a.id } })
				}
			/>
		</div>
	);
}
