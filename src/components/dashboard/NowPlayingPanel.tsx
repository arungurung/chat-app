import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { SpotifyTrack } from "@/types/spotify";

interface NowPlayingPanelProps {
	track: SpotifyTrack | null;
}

export default function NowPlayingPanel({ track }: NowPlayingPanelProps) {
	const img = track?.album.images?.[0]?.url;
	const artist = track?.artists?.[0]?.name ?? "Unknown";

	return (
		<aside className="h-full w-80 shrink-0 border-l border-gray-200 bg-white p-4">
			<h2 className="mb-3 text-lg font-semibold text-gray-900">Now Playing</h2>
			<div className="space-y-3">
				<div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
					{img ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={img}
							alt={track?.name ?? "Now Playing"}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-gray-400">
							No Art
						</div>
					)}
				</div>
				<div>
					<div className="truncate text-sm font-medium text-gray-900">
						{track?.name ?? "Not playing"}
					</div>
					<div className="truncate text-xs text-gray-600">{artist}</div>
				</div>
				<div className="flex items-center justify-center gap-4 pt-2">
					<button
						type="button"
						className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
						aria-label="Previous"
					>
						<SkipBack className="h-5 w-5" />
					</button>
					<button
						type="button"
						className="rounded-full border border-gray-200 p-3 hover:bg-gray-100"
						aria-label="Play/Pause"
					>
						{track ? (
							<Pause className="h-6 w-6" />
						) : (
							<Play className="h-6 w-6" />
						)}
					</button>
					<button
						type="button"
						className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
						aria-label="Next"
					>
						<SkipForward className="h-5 w-5" />
					</button>
				</div>
			</div>
		</aside>
	);
}
