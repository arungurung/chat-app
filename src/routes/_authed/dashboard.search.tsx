import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { m } from "framer-motion";
import SearchBar from "@/components/dashboard/SearchBar";
import ListItem from "@/components/ui/ListItem";
import { searchQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/search")({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): { q?: string } => {
		return {
			q: typeof search.q === "string" ? search.q : undefined,
		};
	},
});

function RouteComponent() {
	const navigate = useNavigate();
	const { q = "" } = Route.useSearch();
	const search = useQuery(searchQueryOptions(q, undefined, 5));

	return (
		<m.div className="max-w-5xl space-y-6">
			<SearchBar
				placeholder="Search Spotify..."
				initialQuery={q}
				onSubmit={(query) =>
					navigate({ to: "/dashboard/search", search: { q: query } })
				}
			/>
			{!q && (
				<m.div className="text-gray-600">
					Type a query to search tracks, artists, albums, and playlists.
				</m.div>
			)}
			{q && (
				<m.div className="space-y-6">
					<m.section>
						<m.h2 className="mb-2 text-lg font-semibold">Tracks</m.h2>
						<m.ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
							{search.data?.tracks?.items?.map((t) => {
								if (!t) return null;
								return (
									<ListItem
										key={t.id}
										subTitle={t.artists?.[0]?.name || ""}
										id={t.id}
										img={t.album.images?.[0]?.url || ""}
										onClick={() =>
											navigate({
												to: "/dashboard/track/$id",
												params: { id: t.id },
											})
										}
										title={t.name}
									/>
								);
							})}
						</m.ul>
					</m.section>
					<m.section>
						<m.h2 className="mb-2 text-lg font-semibold">Artists</m.h2>
						<ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
							{search.data?.artists?.items?.map((a) => {
								if (!a) return null;
								return (
									<ListItem
										id={a.id}
										key={a.id}
										img={a.images?.[0]?.url || ""}
										title={a.name}
										onClick={() =>
											navigate({
												to: "/dashboard/artist/$id",
												params: { id: a.id },
											})
										}
									/>
								);
							})}
						</ul>
					</m.section>
					<m.section>
						<m.h2 className="mb-2 text-lg font-semibold">Albums</m.h2>
						<ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
							{search.data?.albums?.items?.map((al) => {
								if (!al) return null;
								return (
									<ListItem
										id={al.id}
										key={al.id}
										img={al.images?.[0]?.url || ""}
										title={al.name}
										subTitle={al.artists?.[0]?.name || ""}
										onClick={() =>
											navigate({
												to: "/dashboard/album/$id",
												params: { id: al.id },
											})
										}
									/>
								);
							})}
						</ul>
					</m.section>
					<m.section>
						<m.h2 className="mb-2 text-lg font-semibold">Playlists</m.h2>
						<ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
							{search.data?.playlists?.items?.map((p) => {
								if (!p) return null;
								return (
									<ListItem
										id={p.id}
										key={p.id}
										img={p.images?.[0]?.url || ""}
										title={p.name || ""}
										subTitle={p.owner?.display_name || ""}
										onClick={() =>
											navigate({
												to: "/dashboard/playlist/$id",
												params: { id: p.id },
											})
										}
									/>
								);
							})}
						</ul>
					</m.section>
				</m.div>
			)}
		</m.div>
	);
}
