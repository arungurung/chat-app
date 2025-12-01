import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CollectionsList from "@/components/dashboard/CollectionsList";
import { savedAlbumsQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/saved-albums")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const savedAlbums = useQuery(savedAlbumsQueryOptions(50));
	const items = (savedAlbums.data?.items ?? []).map((s) => ({
		...s.album,
		kind: "album" as const,
	}));
	const initial = items.slice(0, 10);
	return (
		<div className="space-y-6">
			<button
				type="button"
				onClick={() => navigate({ to: "/dashboard" })}
				className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
			>
				Back to Dashboard
			</button>
			<CollectionsList
				title="Saved Albums"
				items={initial}
				onItemClick={(item) =>
					navigate({ to: "/dashboard/album/$id", params: { id: item.id } })
				}
				enableLoadMore={true}
			/>
		</div>
	);
}
