import { useState } from "react";
import type { SpotifyArtist } from "@/types/spotify";

interface AvatarsRowProps {
	title: string;
	artists: SpotifyArtist[];
	onItemClick?: (artist: SpotifyArtist) => void;
	onTitleClick?: () => void;
	enableLoadMore?: boolean;
}

export default function AvatarsRow({
	title,
	artists,
	onItemClick,
	onTitleClick,
	enableLoadMore = true,
}: AvatarsRowProps) {
	const [visible, setVisible] = useState(5);
	const shown = artists.slice(0, visible);
	return (
		<section className="space-y-3">
			<button type="button" onClick={onTitleClick} className="text-left">
				<h2 className="text-lg font-semibold text-gray-900 hover:underline">
					{title}
				</h2>
			</button>
			<div className="flex flex-wrap gap-3">
				{shown.map((artist) => {
					const img = artist.images?.[0]?.url;
					return (
						<button
							key={artist.id}
							type="button"
							onClick={() => onItemClick?.(artist)}
							className="flex flex-col items-center hover:opacity-80"
						>
							<div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200 bg-white">
								{img ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={img}
										alt={artist.name}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
										{artist.name.charAt(0)}
									</div>
								)}
							</div>
							<div className="mt-1 w-16 truncate text-center text-xs text-gray-700">
								{artist.name}
							</div>
						</button>
					);
				})}
			</div>
			{enableLoadMore && visible < artists.length && (
				<div>
					<button
						type="button"
						onClick={() => setVisible((v) => Math.min(v + 5, artists.length))}
						className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						Load more
					</button>
				</div>
			)}
		</section>
	);
}
