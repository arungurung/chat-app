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
			className="group cursor-pointer rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
			onClick={() => onClick?.(track)}
		>
			{albumImage && (
				<img
					src={albumImage}
					alt={track.name}
					className="mb-3 aspect-square w-full rounded-md object-cover"
				/>
			)}
			<h3 className="truncate font-semibold text-gray-900">{track.name}</h3>
			<p className="truncate text-sm text-gray-600">{artists}</p>
			{track.preview_url && (
				<div className="mt-2 text-xs text-green-600">Preview available</div>
			)}
		</button>
	);
};

export default TrackCard;
