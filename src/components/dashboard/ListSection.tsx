import { m } from "framer-motion";
import { useState } from "react";
import type { SpotifyTrack } from "@/types/spotify";
import ListItem from "../ui/ListItem";

interface ListSectionProps {
	title: string;
	tracks: SpotifyTrack[];
	onItemClick?: (track: SpotifyTrack) => void;
	onTitleClick?: () => void;
	enableLoadMore?: boolean;
}

export default function ListSection({
	title,
	tracks,
	onItemClick,
	onTitleClick,
	enableLoadMore = true,
}: ListSectionProps) {
	const [visible, setVisible] = useState(5);
	const shown = tracks.slice(0, visible);
	return (
		<m.section
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className="space-y-3"
		>
			<button type="button" onClick={onTitleClick} className="text-left">
				<h2 className="text-lg font-semibold text-gray-900 hover:underline">
					{title}
				</h2>
			</button>
			<ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
				{shown.map((track) => {
					const img = track.album.images?.[0]?.url;
					const artist = track.artists?.[0]?.name || "Unknown";
					return (
						<ListItem
							key={track.id}
							id={track.id}
							title={track.name}
							img={img || ""}
							subTitle={artist}
							spotifyLink={track.external_urls?.spotify}
							duration_ms={track.duration_ms}
							onClick={() => onItemClick?.(track)}
						/>
					);
				})}
			</ul>
			{enableLoadMore && visible < tracks.length && (
				<div className="pt-2">
					<button
						type="button"
						onClick={() => setVisible((v) => Math.min(v + 5, tracks.length))}
						className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						Load more
					</button>
				</div>
			)}
		</m.section>
	);
}
