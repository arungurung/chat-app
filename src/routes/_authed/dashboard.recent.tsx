import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { recentlyPlayedQueryOptions } from "@/utils/spotify-queries";
import ListSection from "@/components/dashboard/ListSection";

export const Route = createFileRoute("/_authed/dashboard/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const recent = useQuery(recentlyPlayedQueryOptions(50));
  const tracks = Array.from(
    new Map((recent.data?.items ?? []).map((i) => [i.track.id, i.track])).values(),
  );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recent</h1>
      <ListSection
        title="Recently Played"
        tracks={tracks}
        onItemClick={(t) => navigate({ to: "/dashboard/track/$id", params: { id: t.id } })}
      />
    </div>
  );
}
