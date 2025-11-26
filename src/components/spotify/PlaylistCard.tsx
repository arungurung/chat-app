import type { SpotifyPlaylist } from "@/types/spotify";

interface PlaylistCardProps {
	playlist: SpotifyPlaylist;
	onClick?: (playlist: SpotifyPlaylist) => void;
}

export function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
	const playlistImage = playlist.images[0]?.url;

	return (
		<button
			type="button"
			onClick={() => onClick?.(playlist)}
			className="group cursor-pointer rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
		>
			{playlistImage ? (
				<img
					src={playlistImage}
					alt={playlist.name}
					className="mb-3 aspect-square w-full rounded-md object-cover"
				/>
			) : (
				<div className="mb-3 flex aspect-square w-full items-center justify-center rounded-md bg-gray-200">
					<span className="text-4xl text-gray-400">🎵</span>
				</div>
			)}
			<h3 className="truncate font-semibold text-gray-900">{playlist.name}</h3>
			<p className="truncate text-sm text-gray-600">
				{playlist.owner.display_name}
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{playlist.tracks.total} tracks
			</p>
		</button>
	);
}
