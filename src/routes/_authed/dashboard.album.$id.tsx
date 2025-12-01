import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import ListItem from "@/components/ui/ListItem";
import { albumDetailQueryOptions } from "@/utils/spotify-queries";
import { msToMinutes } from "@/utils/time";

export const Route = createFileRoute("/_authed/dashboard/album/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const album = useQuery(albumDetailQueryOptions(id));
	const al = album.data;
	const img = al?.images?.[0]?.url;
	const artist = al?.artists?.map((a) => a.name).join(", ");
	const navigate = Route.useNavigate();

	const totalRuntimeMs =
		al?.tracks?.items?.reduce((sum, t) => sum + (t.duration_ms || 0), 0) || 0;
	const totalRuntime = msToMinutes(totalRuntimeMs);

	return (
		<div className="max-w-5xl">
			<m.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="flex items-start gap-4"
			>
				<div className="h-40 w-40 overflow-hidden rounded-md bg-white ring-1 ring-gray-200">
					{img ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={img}
							alt={al?.name ?? "Album"}
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>
				<div>
					<h1 className="text-2xl font-semibold">{al?.name}</h1>
					<div className="text-gray-600">{artist}</div>
					<div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-700">
						<span className="rounded bg-gray-100 px-2 py-1">
							Type: {al?.album_type}
						</span>
						<span className="rounded bg-gray-100 px-2 py-1">
							Released: {al?.release_date}
						</span>
						<span className="rounded bg-gray-100 px-2 py-1">
							Tracks: {al?.total_tracks}
						</span>
						<span className="rounded bg-gray-100 px-2 py-1">
							Runtime: {totalRuntime}
						</span>
						{al?.external_urls?.spotify && (
							<a
								href={al.external_urls.spotify}
								target="_blank"
								rel="noreferrer"
								className="rounded bg-green-50 px-2 py-1 text-green-700 ring-1 ring-green-200"
							>
								Open on Spotify
							</a>
						)}
					</div>
				</div>
			</m.div>

			{al?.tracks?.items?.length ? (
				<m.section
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
					className="mt-6 space-y-3"
				>
					<h2 className="text-sm font-semibold text-gray-900">Track List</h2>
					<m.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, staggerChildren: 0.06 }}
						className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white"
					>
						{al.tracks.items.map((t) => (
							<ListItem
								id={t.id}
								key={t.id}
								title={t.name}
								img={img ?? ""}
								subTitle={t.artists?.map((a) => a.name).join(", ")}
								spotifyLink={t.external_urls?.spotify}
								duration_ms={t.duration_ms}
								onClick={() => {
									navigate({
										to: "/dashboard/track/$id",
										params: { id: t.id },
									});
								}}
							/>
						))}
					</m.ul>
				</m.section>
			) : null}
		</div>
	);
}
