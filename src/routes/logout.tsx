import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAppSession } from "@/utils/session";

const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	console.info("[logout] Invoked logout endpoint");
	const session = await getAppSession();
	try {
		await session.clear();
		console.info("[logout] Session cleared successfully");
		return { success: true };
	} catch (e) {
		console.error("[logout] Failed to clear session:", e);
		throw e as Error;
	}
});

export const Route = createFileRoute("/logout")({
	preload: false,
	component: LogoutComponent,
});

function LogoutComponent() {
	// Effect runs on mount to clear session and reload
	if (typeof window !== "undefined") {
		logoutFn()
			.then(() => {
				console.info("[logout] Redirecting to home after session clear");
				window.location.href = "/";
			})
			.catch((e) => {
				console.error("[logout] Logout failed:", e);
				window.location.href = "/?error=logout_failed";
			});
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-gray-900">Signing out...</h1>
				<p className="mt-2 text-gray-600">Please wait</p>
			</div>
		</div>
	);
}
