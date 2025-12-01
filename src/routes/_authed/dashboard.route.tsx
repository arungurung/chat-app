// import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideNav from "@/components/dashboard/SideNav";
import BackButton from "@/components/ui/BackButton";
// import { topTracksQueryOptions } from "@/utils/spotify-queries";

export const Route = createFileRoute("/_authed/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	// const topTracks = useQuery(topTracksQueryOptions());

	return (
		<div className="h-screen w-screen overflow-hidden bg-gray-50">
			<div className="flex h-full w-full">
				<SideNav />
				<main className="flex-1 overflow-y-auto p-6">
					<div className="mb-4">
						<BackButton />
					</div>
					<Outlet />
				</main>
				{/* Now playing panel removed for non-premium support */}
			</div>
		</div>
	);
}
