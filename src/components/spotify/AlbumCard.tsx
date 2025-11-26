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
			className="group cursor-pointer rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
		>
			{albumImage && (
				<img
					src={albumImage}
					alt={album.name}
					className="mb-3 aspect-square w-full rounded-md object-cover"
				/>
			)}
			<h3 className="truncate font-semibold text-gray-900">{album.name}</h3>
			<p className="truncate text-sm text-gray-600">{artists}</p>
			<p className="mt-1 text-xs text-gray-500">
				{album.release_date.split("-")[0]} • {album.total_tracks} tracks
			</p>
		</button>
	);
}
