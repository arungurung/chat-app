import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PopularityBars from "@/components/ui/PopularityBars";
import { trackDetailQueryOptions } from "@/utils/spotify-queries";
import { msToMinutes } from "@/utils/time";

export const Route = createFileRoute("/_authed/dashboard/track/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const track = useQuery(trackDetailQueryOptions(id));
	const t = track.data;
	const img = t?.album.images?.[0]?.url;

	return (
		<div className="max-w-4xl">
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
							alt={t?.name ?? "Track"}
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>
				<div>
					<h1 className="text-2xl font-semibold">{t?.name}</h1>
					<div className="text-gray-600">
						{t?.artists?.map((a) => a.name).join(", ")}
					</div>
					<div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-700">
						{t?.explicit && (
							<span className="rounded bg-gray-100 px-2 py-1">Explicit</span>
						)}
						{typeof t?.popularity === "number" && (
							<PopularityBars value={t.popularity} />
						)}
						<span className="rounded bg-gray-100 px-2 py-1">
							Duration: {msToMinutes(t?.duration_ms)}
						</span>
					</div>
					<div className="mt-3 flex items-center gap-2">
						{t?.external_urls?.spotify && (
							<a
								href={t.external_urls.spotify}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
							>
								<ExternalLink className="h-3 w-3" />
								Spotify
							</a>
						)}
					</div>
				</div>
			</m.div>
		</div>
	);
}
