import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import ListItem from "@/components/ui/ListItem";
import {
	playlistDetailQueryOptions,
	playlistTracksQueryOptions,
} from "@/utils/spotify-queries";
import { msToMinutes } from "@/utils/time";

export const Route = createFileRoute("/_authed/dashboard/playlist/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const playlist = useQuery(playlistDetailQueryOptions(id));
	const tracks = useQuery(playlistTracksQueryOptions(id, 50));
	const p = playlist.data;
	const img = p?.images?.[0]?.url;
	const owner = p?.owner?.display_name;
	const navigate = Route.useNavigate();

	const totalRuntimeMs =
		tracks.data?.items?.reduce(
			(sum, it) => sum + (it.track.duration_ms || 0),
			0,
		) || 0;
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
							alt={p?.name ?? "Playlist"}
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>
				<div>
					<h1 className="text-2xl font-semibold">{p?.name}</h1>
					<div className="text-gray-600">{owner}</div>
					<div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-700">
						<span className="rounded bg-gray-100 px-2 py-1">
							Tracks: {p?.tracks?.total}
						</span>
						<span className="rounded bg-gray-100 px-2 py-1">
							Runtime: {totalRuntime}
						</span>
						{p?.public !== undefined && (
							<span className="rounded bg-gray-100 px-2 py-1">
								{p.public ? "Public" : "Private"}
							</span>
						)}
						{p?.collaborative && (
							<span className="rounded bg-gray-100 px-2 py-1">
								Collaborative
							</span>
						)}
						{p?.external_urls?.spotify && (
							<a
								href={p.external_urls.spotify}
								target="_blank"
								rel="noreferrer"
								className="rounded bg-green-50 px-2 py-1 text-green-700 ring-1 ring-green-200"
							>
								Open on Spotify
							</a>
						)}
					</div>
					{p?.description && (
						<div className="mt-3 max-w-xl text-sm text-gray-700">
							{p.description}
						</div>
					)}
				</div>
			</m.div>

			<m.section
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="mt-6 space-y-3"
			>
				<h2 className="text-sm font-semibold text-gray-900">Tracks</h2>
				<m.ul
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, staggerChildren: 0.06 }}
					className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white"
				>
					{tracks.data?.items?.map((it, idx) => (
						<ListItem
							id={it.track.id}
							key={it.track.id ?? `${idx}`}
							title={it.track.name}
							img={it.track.album.images?.[0]?.url || ""}
							subTitle={it.track.artists?.map((a) => a.name).join(", ")}
							spotifyLink={it.track.external_urls?.spotify}
							duration_ms={it.track.duration_ms}
							onClick={() => {
								navigate({
									to: "/dashboard/track/$id",
									params: { id: it.track.id },
								});
							}}
						/>
					))}
				</m.ul>
			</m.section>
		</div>
	);
}
