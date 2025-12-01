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
			className="group flex h-full cursor-pointer flex-col rounded-lg bg-white p-2 shadow transition-all hover:shadow-lg"
			onClick={() => onClick?.(artist)}
		>
			{artistImage ? (
				<img
					src={artistImage}
					alt={artist.name}
					className="mb-2 aspect-square w-full rounded-full object-cover"
				/>
			) : (
				<div className="mb-2 flex aspect-square w-full items-center justify-center rounded-full bg-gray-200">
					<span className="text-2xl text-gray-400">🎤</span>
				</div>
			)}

			<h3
				className="text-center text-sm font-semibold text-gray-900 leading-tight line-clamp-1 mb-2"
				title={artist.name}
			>
				{artist.name}
			</h3>

			{artist.followers && (
				<p className="text-center text-xs text-gray-600">
					{artist.followers.total.toLocaleString()} followers
				</p>
			)}
		</button>
	);
};

export default ArtistCard;
