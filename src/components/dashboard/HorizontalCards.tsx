import { ExternalLink } from "lucide-react";
import { useState } from "react";
import type { SpotifyTrack } from "@/types/spotify";

interface HorizontalCardsProps {
	title: string;
	tracks: SpotifyTrack[];
	onItemClick?: (track: SpotifyTrack) => void;
	onTitleClick?: () => void;
	enableLoadMore?: boolean;
}

export default function HorizontalCards({
	title,
	tracks,
	onItemClick,
	onTitleClick,
	enableLoadMore = true,
}: HorizontalCardsProps) {
	const [visible, setVisible] = useState(5);
	const shown = tracks.slice(0, visible);
	return (
		<section className="space-y-3">
			<div className="flex items-center justify-between">
				<button type="button" onClick={onTitleClick} className="text-left">
					<h2 className="text-lg font-semibold text-gray-900 hover:underline">
						{title}
					</h2>
				</button>
			</div>
			<div className="flex gap-4 overflow-x-auto pb-2">
				{shown.map((track) => {
					const img = track.album.images?.[0]?.url;
					const artist = track.artists?.[0]?.name || "Unknown";
					return (
						<button
							type="button"
							onClick={() => onItemClick?.(track)}
							key={track.id}
							className="min-w-[180px] rounded-lg border border-gray-200 bg-white p-3 text-left shadow-sm hover:bg-gray-50"
						>
							<div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
								{img ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={img}
										alt={track.name}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center text-gray-400">
										No Art
									</div>
								)}
							</div>
							<div className="mt-2">
								<div className="truncate text-sm font-medium text-gray-900">
									{track.name}
								</div>
								<div className="truncate text-xs text-gray-600">{artist}</div>
								<div className="mt-2 flex items-center gap-2">
									{track.external_urls?.spotify ? (
										<a
											href={track.external_urls.spotify}
											target="_blank"
											rel="noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
										>
											<ExternalLink className="h-3 w-3" />
											Spotify
										</a>
									) : null}
								</div>
							</div>
						</button>
					);
				})}
			</div>
			{enableLoadMore && visible < tracks.length && (
				<div>
					<button
						type="button"
						onClick={() => setVisible((v) => Math.min(v + 5, tracks.length))}
						className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						Load more
					</button>
				</div>
			)}
		</section>
	);
}
