import { Link, useRouterState } from "@tanstack/react-router";

function labelForSegment(seg: string) {
	switch (seg) {
		case "dashboard":
			return "Dashboard";
		case "search":
			return "Search";
		case "library":
			return "Library";
		case "favorites":
			return "Favorites";
		case "recent":
			return "Recent";
		case "profile":
			return "Profile";
		case "track":
			return "Track";
		case "artist":
			return "Artist";
		case "album":
			return "Album";
		case "playlist":
			return "Playlist";
		default:
			return seg;
	}
}

export default function Breadcrumbs() {
	const routerState = useRouterState();
	const path = routerState.location.pathname;
	const parts = path.split("/").filter(Boolean);
	// strip leading _authed
	const start = parts[0] === "_authed" ? 1 : 0;
	const crumbs = parts.slice(start);

	const trail: Array<{ href: string; label: string }> = [];
	const acc: string[] = [];
	crumbs.forEach((seg) => {
		acc.push(seg);
		const href = "/" + acc.join("/");
		trail.push({ href, label: labelForSegment(seg) });
	});

	// Normalize: Ensure first crumb is /dashboard
	if (!trail.length || trail[0].label !== "Dashboard") {
		trail.unshift({ href: "/dashboard", label: "Dashboard" });
	}

	return (
		<nav className="text-sm text-gray-600" aria-label="Breadcrumb">
			<ol className="flex flex-wrap items-center gap-2">
				{trail.map((c, i) => (
					<li key={c.href} className="flex items-center gap-2">
						{i > 0 && <span className="text-gray-400">/</span>}
						<Link to={c.href} className="hover:text-gray-900">
							{c.label}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	);
}
