import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { m } from "framer-motion";
import ListCard from "@/components/ui/ListCard";
import ListItem from "@/components/ui/ListItem";
import PopularityBars from "@/components/ui/PopularityBars";
import {
	artistAlbumsQueryOptions,
	artistDetailQueryOptions,
	artistTopTracksQueryOptions,
} from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/artist/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const artist = useQuery(artistDetailQueryOptions(id));
	const topTracks = useQuery(artistTopTracksQueryOptions(id));
	const albums = useQuery(artistAlbumsQueryOptions(id, 12));
	const a = artist.data;
	const img = a?.images?.[0]?.url;
	const navigate = useNavigate();

	// Related artists removed

	return (
		<div className="max-w-5xl lg:max-w-full">
			<m.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="flex items-start gap-4"
			>
				<div className="h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
					{img ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={img}
							alt={a?.name ?? "Artist"}
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>
				<div>
					<h1 className="text-2xl font-semibold">{a?.name}</h1>
					<div className="text-gray-600">
						{a?.followers?.total?.toLocaleString?.()} followers
					</div>
					{typeof a?.popularity === "number" && (
						<PopularityBars value={a.popularity} />
					)}
					{a?.genres?.length ? (
						<div className="mt-2 flex flex-wrap gap-2">
							{a.genres.map((g) => (
								<span
									key={g}
									className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
								>
									{g}
								</span>
							))}
						</div>
					) : null}
				</div>
			</m.div>

			<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<m.section
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
					className="space-y-3"
				>
					<h2 className="text-sm font-semibold text-gray-900">Top Tracks</h2>
					<m.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, staggerChildren: 0.06 }}
						className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white"
					>
						{topTracks.data?.tracks?.map((t) => (
							<ListItem
								id={t.id}
								key={t.id}
								title={t.name}
								subTitle={t.album.name}
								spotifyLink={t.external_urls?.spotify}
								img={t.album.images?.[0]?.url}
								onClick={() =>
									navigate({
										to: "/dashboard/track/$id",
										params: { id: t.id },
									})
								}
							/>
						))}
					</m.ul>
				</m.section>

				<m.section
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
					className="mt-6 lg:mt-0 space-y-3"
				>
					<h2 className="text-sm font-semibold text-gray-900">Albums</h2>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{albums.data?.items?.map((al) => (
							<ListCard
								key={al.id}
								title={al.name}
								subTitle={al.release_date}
								img={al.images?.[0]?.url}
								id={al.id}
								onClick={() => {
									navigate({
										to: "/dashboard/album/$id",
										params: { id: al.id },
									});
								}}
							/>
						))}
					</div>
				</m.section>
			</div>
		</div>
	);
}
