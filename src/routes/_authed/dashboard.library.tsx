import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CollectionsList from "@/components/dashboard/CollectionsList";
import { userPlaylistsQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/library")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const playlists = useQuery(userPlaylistsQueryOptions(50));
	const items = (playlists.data?.items ?? []).map((p) => ({
		...p,
		kind: "playlist" as const,
	}));
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Library</h1>
			<CollectionsList
				title="Your Playlists"
				items={items}
				onItemClick={(item) =>
					navigate({ to: "/dashboard/playlist/$id", params: { id: item.id } })
				}
			/>
		</div>
	);
}
