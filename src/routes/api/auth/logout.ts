import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/logout")({
	server: {
		handlers: {
			GET: async () =>
				new Response(JSON.stringify({ message: "Logout endpoint" }), {
					status: 200,
				}),
		},
	},
});
