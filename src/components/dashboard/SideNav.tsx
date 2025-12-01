import { Link } from "@tanstack/react-router";
import {
	Clock,
	Heart,
	Home,
	LibraryBig,
	Music2,
	Search,
	User,
} from "lucide-react";

interface NavItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
	{ id: "home", label: "Home", icon: Home, activeOptions: { exact: true } },
	{ id: "search", label: "Search", icon: Search },
	{ id: "library", label: "Library", icon: LibraryBig },
	{ id: "favorites", label: "Favorites", icon: Heart },
	{ id: "recent", label: "Recent", icon: Clock },
	{ id: "profile", label: "Profile", icon: User },
];

export default function SideNav() {
	return (
		<aside className="h-full w-56 shrink-0 border-r border-gray-200 bg-white">
			<div className="flex h-full flex-col">
				<div className="flex items-center gap-2 p-4">
					<Music2 className="h-6 w-6 text-green-600" />
					<span className="text-lg font-semibold">Spottify</span>
				</div>
				<nav className="mt-2 flex-1">
					<ul className="space-y-1 p-2">
						{NAV_ITEMS.map((item) => {
							const Icon = item.icon;
							return (
								<li key={item.id}>
									<Link
										to={
											item.id === "home"
												? "/dashboard"
												: `/dashboard/${item.id}`
										}
										activeOptions={item.activeOptions}
										activeProps={{ className: "bg-gray-100" }}
										className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-gray-100"
									>
										<Icon className="h-5 w-5 text-gray-600" />
										<span className="text-sm text-gray-800">{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="p-4 text-xs text-gray-500">
					© {new Date().getFullYear()} Spottify
				</div>
			</div>
		</aside>
	);
}
