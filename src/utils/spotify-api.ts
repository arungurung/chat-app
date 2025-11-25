import { createServerFn } from "@tanstack/react-start";
import type {
	SpotifyAlbum,
	SpotifyArtist,
	SpotifyCategory,
	SpotifyPaginatedResponse,
	SpotifyPlaylist,
	SpotifySavedItem,
	SpotifySearchResponse,
	SpotifyTimeRange,
	SpotifyTrack,
} from "@/types/spotify";
import { getAppSession } from "./session";

export async function spotifyFetch<T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> {
	const session = await getAppSession();
	const accessToken = session.data.accessToken;

	if (!accessToken) {
		throw new Error("No access token available");
	}

	const url = endpoint.startsWith("https://")
		? endpoint
		: `https://api.spotify.com/v1/${endpoint}`;

	const response = await fetch(url, {
		...options,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			...(options?.headers || {}),
		},
	});

	if (!response.ok) {
		const error = await response.text();
		console.error(`Spotify API error (${response.status}):`, error);
		throw new Error(`Spotify API request failed: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Get user's top tracks
 * @param timeRange - short_term (4 weeks), medium_term (6 months), long_term (years)
 * @param limit - Number of items to return (max 50)
 */
export const getTopTracks = createServerFn({ method: "GET" })
	.inputValidator(
		(input: { timeRange?: SpotifyTimeRange; limit?: number } = {}) => ({
			timeRange: input.timeRange || "medium_term",
			limit: Math.min(input.limit || 20, 50),
		}),
	)
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			time_range: data.timeRange,
			limit: data.limit.toString(),
			offset: "0",
		});

		return spotifyFetch<SpotifyPaginatedResponse<SpotifyTrack>>(
			`/me/top/tracks?${params}`,
		);
	});

/**
 * Get user's top artists
 * @param timeRange - short_term (4 weeks), medium_term (6 months), long_term (years)
 * @param limit - Number of items to return (max 50)
 */
export const getTopArtists = createServerFn({ method: "GET" })
	.inputValidator(
		(input: { timeRange?: SpotifyTimeRange; limit?: number } = {}) => ({
			timeRange: input.timeRange || "medium_term",
			limit: Math.min(input.limit || 20, 50),
		}),
	)
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			time_range: data.timeRange,
			limit: data.limit.toString(),
			offset: "0",
		});

		return spotifyFetch<SpotifyPaginatedResponse<SpotifyArtist>>(
			`/me/top/artists?${params}`,
		);
	});

/**
 * Get user's playlists
 * @param limit - Number of items to return (max 50)
 * @param offset - Index of first item to return
 */
export const getUserPlaylists = createServerFn({ method: "GET" })
	.inputValidator((input: { limit?: number; offset?: number } = {}) => ({
		limit: Math.min(input.limit || 20, 50),
		offset: input.offset || 0,
	}))
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			limit: data.limit.toString(),
			offset: data.offset.toString(),
		});

		return spotifyFetch<SpotifyPaginatedResponse<SpotifyPlaylist>>(
			`/me/playlists?${params}`,
		);
	});

/**
 * Get user's saved albums
 * @param limit - Number of items to return (max 50)
 * @param offset - Index of first item to return
 */
export const getSavedAlbums = createServerFn({ method: "GET" })
	.inputValidator((input: { limit?: number; offset?: number } = {}) => ({
		limit: Math.min(input.limit || 20, 50),
		offset: input.offset || 0,
	}))
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			limit: data.limit.toString(),
			offset: data.offset.toString(),
		});

		return spotifyFetch<
			SpotifyPaginatedResponse<SpotifySavedItem<SpotifyAlbum>>
		>(`/me/albums?${params}`);
	});

/**
 * Get user's recently played tracks
 * @param limit - Number of items to return (max 50)
 */
export const getRecentlyPlayed = createServerFn({ method: "GET" })
	.inputValidator((input: { limit?: number } = {}) => ({
		limit: Math.min(input.limit || 20, 50),
	}))
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			limit: data.limit.toString(),
		});

		interface RecentlyPlayedResponse {
			items: Array<{
				track: SpotifyTrack;
				played_at: string;
				context: {
					type: string;
					uri: string;
				} | null;
			}>;
			next: string | null;
			cursors: {
				after: string;
				before: string;
			};
		}

		return spotifyFetch<RecentlyPlayedResponse>(
			`/me/player/recently-played?${params}`,
		);
	});

/**
 * Search Spotify catalog
 * @param query - Search query string
 * @param types - Array of types to search (track, artist, album, playlist)
 * @param limit - Number of results per type (max 50)
 */
export const searchSpotify = createServerFn({ method: "GET" })
	.inputValidator(
		(input: {
			query: string;
			types?: Array<"track" | "artist" | "album" | "playlist">;
			limit?: number;
		}) => ({
			query: input.query.trim(),
			types: input.types || ["track", "artist", "album", "playlist"],
			limit: Math.min(input.limit || 20, 50),
		}),
	)
	.handler(async ({ data }) => {
		if (!data.query) {
			return {
				tracks: {
					items: [],
					total: 0,
					limit: 0,
					offset: 0,
					next: null,
					previous: null,
				},
				artists: {
					items: [],
					total: 0,
					limit: 0,
					offset: 0,
					next: null,
					previous: null,
				},
				albums: {
					items: [],
					total: 0,
					limit: 0,
					offset: 0,
					next: null,
					previous: null,
				},
				playlists: {
					items: [],
					total: 0,
					limit: 0,
					offset: 0,
					next: null,
					previous: null,
				},
			};
		}

		const params = new URLSearchParams({
			q: data.query,
			type: data.types.join(","),
			limit: data.limit.toString(),
			offset: "0",
		});

		return spotifyFetch<SpotifySearchResponse>(`/search?${params}`);
	});

/**
 * Get browse categories
 * @param limit - Number of items to return (max 50)
 * @param offset - Index of first item to return
 */
export const getBrowseCategories = createServerFn({ method: "GET" })
	.inputValidator((input: { limit?: number; offset?: number } = {}) => ({
		limit: Math.min(input.limit || 20, 50),
		offset: input.offset || 0,
	}))
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			limit: data.limit.toString(),
			offset: data.offset.toString(),
		});

		interface CategoriesResponse {
			categories: SpotifyPaginatedResponse<SpotifyCategory>;
		}

		return spotifyFetch<CategoriesResponse>(`/browse/categories?${params}`);
	});

/**
 * Get playlists for a specific category
 * @param categoryId - Spotify category ID
 * @param limit - Number of items to return (max 50)
 */
export const getCategoryPlaylists = createServerFn({ method: "GET" })
	.inputValidator(
		(input: { categoryId: string; limit?: number; offset?: number }) => ({
			categoryId: input.categoryId,
			limit: Math.min(input.limit || 20, 50),
			offset: input.offset || 0,
		}),
	)
	.handler(async ({ data }) => {
		const params = new URLSearchParams({
			limit: data.limit.toString(),
			offset: data.offset.toString(),
		});

		interface CategoryPlaylistsResponse {
			playlists: SpotifyPaginatedResponse<SpotifyPlaylist>;
		}

		return spotifyFetch<CategoryPlaylistsResponse>(
			`/browse/categories/${data.categoryId}/playlists?${params}`,
		);
	});
