import { m } from "framer-motion";
import { useState } from "react";
import type { SpotifyAlbum, SpotifyPlaylist } from "@/types/spotify";
import ListItem from "../ui/ListItem";

type Item =
	| (SpotifyAlbum & { kind: "album" })
	| (SpotifyPlaylist & { kind: "playlist" });

interface CollectionsListProps {
	title: string;
	items: Item[];
	onItemClick?: (item: Item) => void;
	onTitleClick?: () => void;
	enableLoadMore?: boolean;
}

export default function CollectionsList({
	title,
	items,
	onItemClick,
	onTitleClick,
	enableLoadMore = true,
}: CollectionsListProps) {
	const [visible, setVisible] = useState(5);
	const shown = items.slice(0, visible);
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
				{shown.map((item) => {
					const img = item.images?.[0]?.url;
					const subtitle =
						item.kind === "album"
							? (item.artists?.[0]?.name ?? "Album")
							: (item.owner?.display_name ?? "Playlist");
					return (
						<ListItem
							key={item.id}
							id={item.id}
							title={item.name}
							subTitle={subtitle}
							spotifyLink={item.external_urls?.spotify}
							img={img}
							onClick={() => onItemClick?.(item)}
						/>
					);
				})}
			</ul>
			{enableLoadMore && visible < items.length && (
				<div className="pt-2">
					<button
						type="button"
						onClick={() => setVisible((v) => Math.min(v + 5, items.length))}
						className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						Load more
					</button>
				</div>
			)}
		</m.section>
	);
}
