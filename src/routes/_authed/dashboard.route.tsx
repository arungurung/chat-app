import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<div className="min-h-screen">
			<header className="p-2 flex gap-2 text-lg">
				<Link
					to="/dashboard"
					activeProps={{ className: "font-bold" }}
					activeOptions={{ exact: true }}
				>
					Spottify
				</Link>{" "}
				{user && (
					<div className="ml-auto flex items-center">
						<span className="mr-2 text-green-600">{user.displayName}</span>
						<Link to="/logout">Logout</Link>
					</div>
				)}
				<hr />
			</header>
			<Outlet />
		</div>
	);
}
