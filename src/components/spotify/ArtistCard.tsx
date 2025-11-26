import type { SpotifyArtist } from "@/types/spotify";

interface ArtistCardProps {
	artist: SpotifyArtist;
	onClick?: (artist: SpotifyArtist) => void;
}

const ArtistCard = ({ artist, onClick }: ArtistCardProps) => {
	const artistImage = artist.images?.[0]?.url;

	return (
		<button
			type="button"
			className="group cursor-pointer rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
			onClick={() => onClick?.(artist)}
		>
			{artistImage ? (
				<img
					src={artistImage}
					alt={artist.name}
					className="mb-3 aspect-square w-full rounded-full object-cover"
				/>
			) : (
				<div className="mb-3 flex aspect-square w-full items-center justify-center rounded-full bg-gray-200">
					<span className="text-4xl text-gray-400">🎤</span>
				</div>
			)}

			<h3 className="truncate text-center font-semibold text-gray-900">
				{artist.name}
			</h3>

			{artist.followers && (
				<p className="text-center text-sm text-gray-600">
					{artist.followers.total.toLocaleString()} followers
				</p>
			)}
		</button>
	);
};

export default ArtistCard;
