import type { SpotifyAlbum } from "@/types/spotify";

interface AlbumCardProps {
	album: SpotifyAlbum;
	onClick?: (album: SpotifyAlbum) => void;
}

export function AlbumCard({ album, onClick }: AlbumCardProps) {
	const albumImage = album.images[0]?.url;
	const artists = album.artists.map((a) => a.name).join(", ");

	return (
		<button
			type="button"
			onClick={() => onClick?.(album)}
			className="group flex h-full cursor-pointer flex-col rounded-lg bg-white p-2 shadow transition-all hover:shadow-lg"
		>
			{albumImage && (
				<img
					src={albumImage}
					alt={album.name}
					className="mb-2 aspect-square w-full rounded-md object-cover"
				/>
			)}
			<h3
				className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1 mb-2"
				title={album.name}
			>
				{album.name}
			</h3>
			<p
				className="text-xs text-gray-600 leading-tight line-clamp-1"
				title={artists}
			>
				{artists}
			</p>
			<p className="mt-1 text-[10px] text-gray-500">
				{album.release_date.split("-")[0]} • {album.total_tracks} tracks
			</p>
		</button>
	);
}
