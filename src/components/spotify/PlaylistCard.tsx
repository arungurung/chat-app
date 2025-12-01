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
			className="group flex h-full cursor-pointer flex-col rounded-lg bg-white p-2 shadow transition-all hover:shadow-lg"
		>
			{playlistImage ? (
				<img
					src={playlistImage}
					alt={playlist.name}
					className="mb-2 aspect-square w-full rounded-md object-cover"
				/>
			) : (
				<div className="mb-2 flex aspect-square w-full items-center justify-center rounded-md bg-gray-200">
					<span className="text-2xl text-gray-400">🎵</span>
				</div>
			)}
			<h3
				className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1 mb-2"
				title={playlist.name}
			>
				{playlist.name}
			</h3>
			<p
				className="text-xs text-gray-600 leading-tight line-clamp-1"
				title={playlist.owner.display_name}
			>
				{playlist.owner.display_name}
			</p>
			<p className="mt-1 text-[10px] text-gray-500">
				{playlist.tracks.total} tracks
			</p>
		</button>
	);
}
