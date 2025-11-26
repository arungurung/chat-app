import { createFileRoute } from "@tanstack/react-router";
import { PlaylistsSection } from "@/components/sections/PlaylistsSection";
import { RecentlyPlayedSection } from "@/components/sections/RecentlyPlayedSection";
import { SavedAlbumsSection } from "@/components/sections/SavedAlbumsSection";
import { TopArtistsSection } from "@/components/sections/TopArtistsSection";
import { TopTracksSection } from "@/components/sections/TopTracksSection";
import {
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
		]);
	},
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900">Your Dashboard</h1>
					<p className="mt-2 text-gray-600">
						Discover your music taste and explore Spotify
					</p>
				</div>
				<TopTracksSection />
				<TopArtistsSection />
				<RecentlyPlayedSection />
				<PlaylistsSection />
				<SavedAlbumsSection />
			</div>
		</div>
	);
}
