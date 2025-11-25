import { queryOptions } from "@tanstack/react-query";
import { getTopTracks } from "./spotify-api";

export const topTracksQueryOptions = () =>
	queryOptions({
		queryKey: ["top-tracks", "medium-term"],
		queryFn: () =>
			getTopTracks({ data: { timeRange: "medium_term", limit: 20 } }),
	});
