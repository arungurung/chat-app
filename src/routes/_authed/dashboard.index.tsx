import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { m } from "framer-motion";
import AvatarsRow from "@/components/dashboard/AvatarsRow";
import CollectionsList from "@/components/dashboard/CollectionsList";
import ListSection from "@/components/dashboard/ListSection";
import SearchBar from "@/components/dashboard/SearchBar";
import type { SpotifyTrack } from "@/types/spotify";
import {
	currentUserProfileQueryOptions,
	recentlyPlayedQueryOptions,
	savedAlbumsQueryOptions,
	topArtistsQueryOptions,
	topTracksQueryOptions,
	userPlaylistsQueryOptions,
} from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/")({
	ssr: "data-only",
	component: RouteComponent,
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.prefetchQuery(topTracksQueryOptions()),
			context.queryClient.prefetchQuery(topArtistsQueryOptions()),
			context.queryClient.prefetchQuery(recentlyPlayedQueryOptions()),
			context.queryClient.prefetchQuery(userPlaylistsQueryOptions()),
			context.queryClient.prefetchQuery(savedAlbumsQueryOptions()),
			context.queryClient.prefetchQuery(currentUserProfileQueryOptions()),
		]);
	},
});

function RouteComponent() {
	const navigate = useNavigate();
	const topTracksQuery = useQuery(topTracksQueryOptions("medium_term", 12));
	const topArtistsQuery = useQuery(topArtistsQueryOptions("medium_term", 12));
	const savedAlbumsQuery = useQuery(savedAlbumsQueryOptions(12));
	const userQuery = useQuery(currentUserProfileQueryOptions());

	const featuredTracks: SpotifyTrack[] = topTracksQuery.data?.items ?? [];
	const topArtists = topArtistsQuery.data?.items ?? [];
	const savedAlbums = (savedAlbumsQuery.data?.items ?? [])
		.map((s) => s.album)
		.filter(
			(a): a is NonNullable<typeof a> & { id: string } =>
				!!a && typeof a.id === "string",
		)
		.map((a) => ({ ...a, kind: "album" as const }));
	// NowPlaying is handled by parent layout

	return (
		<div className="">
			<m.div className="flex gap-4 items-center">
				<img
					src={userQuery.data?.images?.[0]?.url}
					alt={userQuery.data?.display_name ?? "User avatar"}
					className="w-18 h-18 rounded-full"
				/>
				<m.div>
					<h1 className="text-3xl font-bold text-gray-900">
						Welcome {userQuery.data?.display_name}
					</h1>
					<p className="text-gray-600 md:w-sm">
						Your personalized Spotify overview. Explore your top tracks,
						artists, and saved albums.
					</p>
				</m.div>
			</m.div>

			<m.div className="my-4">
				<SearchBar
					placeholder="Search Spotify..."
					initialQuery={""}
					onSubmit={(query) =>
						navigate({ to: "/dashboard/search", search: { q: query } })
					}
				/>
			</m.div>

			<m.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2"
			>
				<ListSection
					title="Top Tracks"
					tracks={featuredTracks.slice(0, 10)}
					onItemClick={(t) =>
						navigate({ to: "/dashboard/track/$id", params: { id: t.id } })
					}
					onTitleClick={() => navigate({ to: "/dashboard/top-tracks" })}
					enableLoadMore={false}
				/>
				<CollectionsList
					title="Saved Albums"
					items={savedAlbums.slice(0, 10)}
					onItemClick={(item) =>
						navigate({ to: "/dashboard/album/$id", params: { id: item.id } })
					}
					onTitleClick={() => navigate({ to: "/dashboard/saved-albums" })}
					enableLoadMore={false}
				/>
			</m.div>
			<m.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="mt-6"
			>
				<AvatarsRow
					title="Top Artists"
					artists={topArtists.slice(0, 10)}
					onItemClick={(a) =>
						navigate({ to: "/dashboard/artist/$id", params: { id: a.id } })
					}
					onTitleClick={() => navigate({ to: "/dashboard/top-artists" })}
					enableLoadMore={false}
				/>
			</m.div>
		</div>
	);
}
