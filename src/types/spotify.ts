export interface SpotifyImage {
	url: string;
	height: number;
	width: number;
}

export interface SpotifyArtist {
	id: string;
	name: string;
	type: "artist";
	uri: string;
	external_urls: {
		spotify: string;
	};
	images?: SpotifyImage[];
	genres?: string[];
	followers?: {
		total: number;
	};
	popularity?: number;
}

export interface SpotifyAlbum {
	id: string;
	name: string;
	type: "album";
	uri: string;
	album_type: string;
	artists: SpotifyArtist[];
	images: SpotifyImage[];
	release_date: string;
	total_tracks: number;
	tracks: SpotifyPaginatedResponse<SpotifyTrack>;
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyTrack {
	id: string;
	name: string;
	type: "track";
	uri: string;
	artists: SpotifyArtist[];
	album: SpotifyAlbum;
	duration_ms: number;
	preview_url: string | null;
	popularity: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyPlaylist {
	id: string;
	name: string;
	type: "playlist";
	uri: string;
	description: string;
	images: SpotifyImage[];
	owner: {
		id: string;
		display_name: string;
	};
	tracks: {
		total: number;
	};
	public: boolean;
	collaborative: boolean;
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyCategory {
	id: string;
	name: string;
	icons: SpotifyImage[];
}

// Paginated response wrapper
export interface SpotifyPaginatedResponse<T> {
	items: T[];
	total: number;
	limit: number;
	offset: number;
	next: string | null;
	previous: string | null;
}

// For saved albums/tracks (wrapped in saved_at)
export interface SpotifySavedItem<T> {
	added_at: string;
	track?: T;
	album?: T;
}

// Search response
export interface SpotifySearchResponse {
	tracks?: SpotifyPaginatedResponse<SpotifyTrack>;
	artists?: SpotifyPaginatedResponse<SpotifyArtist>;
	albums?: SpotifyPaginatedResponse<SpotifyAlbum>;
	playlists?: SpotifyPaginatedResponse<SpotifyPlaylist>;
}

// Time range for top items
export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

// Audio features for tracks
export interface SpotifyAudioFeatures {
	id: string;
	danceability: number;
	energy: number;
	key: number;
	loudness: number;
	mode: number;
	speechiness: number;
	acousticness: number;
	instrumentalness: number;
	liveness: number;
	valence: number;
	tempo: number;
	duration_ms: number;
	time_signature: number;
}

// Artist top tracks response
export interface ArtistTopTracksResponse {
	tracks: SpotifyTrack[];
}

// Related artists response

// Current user profile
export interface SpotifyCurrentUserProfile {
	id: string;
	display_name: string | null;
	email?: string;
	images?: SpotifyImage[];
	country?: string;
	product?: "free" | "premium" | string; // free, premium, etc.
	followers?: { total: number };
	external_urls?: { spotify: string };
}
