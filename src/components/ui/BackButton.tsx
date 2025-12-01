import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
	const navigate = useNavigate();
	const { location } = useRouterState();
	const path = location.pathname;
	const isDetail =
		/^\/(?:_authed\/)?dashboard\/(track|album|artist|playlist)\//.test(path);
	if (!isDetail) return null;

	return (
		<button
			type="button"
			onClick={() => {
				try {
					if (
						typeof window !== "undefined" &&
						(window.history?.length ?? 0) > 1
					) {
						window.history.back();
						return;
					}
				} catch {}
				navigate({ to: "/dashboard" });
			}}
			className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
		>
			<ChevronLeft className="h-4 w-4" />
			Back
		</button>
	);
}
