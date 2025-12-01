import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { currentUserProfileQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const profile = useQuery(currentUserProfileQueryOptions());
	const p = profile.data;
	const img = p?.images?.[0]?.url;
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Profile</h1>
				<a
					href="/logout"
					className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
				>
					Sign out
				</a>
			</div>
			<div className="flex items-start gap-4">
				<div className="h-24 w-24 overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
					{img ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={img}
							alt={p?.display_name ?? "Avatar"}
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>
				<div>
					<div className="text-2xl font-semibold">
						{p?.display_name ?? "Spotify User"}
					</div>
					<div className="text-gray-600">{p?.id}</div>
					{p?.product && (
						<span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
							{p.product}
						</span>
					)}
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-gray-200 bg-white p-4">
					<div className="text-sm text-gray-600">Email</div>
					<div className="text-base font-medium">
						{p?.email ?? "Not available"}
					</div>
				</div>
				<div className="rounded-lg border border-gray-200 bg-white p-4">
					<div className="text-sm text-gray-600">Country</div>
					<div className="text-base font-medium">{p?.country ?? "—"}</div>
				</div>
				<div className="rounded-lg border border-gray-200 bg-white p-4">
					<div className="text-sm text-gray-600">Followers</div>
					<div className="text-base font-medium">
						{p?.followers?.total?.toLocaleString?.() ?? 0}
					</div>
				</div>
				<div className="rounded-lg border border-gray-200 bg-white p-4">
					<div className="text-sm text-gray-600">Profile</div>
					{p?.external_urls?.spotify ? (
						<a
							href={p.external_urls.spotify}
							target="_blank"
							rel="noreferrer"
							className="text-base font-medium text-green-700 hover:underline"
						>
							Open on Spotify
						</a>
					) : (
						<div className="text-base font-medium">—</div>
					)}
				</div>
			</div>
		</div>
	);
}
