import type { SpotifyTrack } from "@/types/spotify";

interface TrackCardProps {
	track: SpotifyTrack;
	onClick?: (track: SpotifyTrack) => void;
}

const TrackCard = ({ track, onClick }: TrackCardProps) => {
	const albumImage = track.album.images[0]?.url;
	const artists = track.artists.map((artist) => artist.name).join(", ");

	return (
		<button
			type="button"
			className="group flex h-full cursor-pointer flex-col rounded-lg bg-white p-2 shadow transition-all hover:shadow-lg"
			onClick={() => onClick?.(track)}
		>
			{albumImage && (
				<img
					src={albumImage}
					alt={track.name}
					className="mb-2 aspect-square w-full rounded-md object-cover"
				/>
			)}
			<h3
				className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1 mb-2"
				title={track.name}
			>
				{track.name}
			</h3>
			<p
				className="text-xs text-gray-600 leading-tight line-clamp-1"
				title={artists}
			>
				{artists}
			</p>
			{track.preview_url && (
				<div className="mt-1 text-[10px] text-green-600">Preview available</div>
			)}
		</button>
	);
};

export default TrackCard;
