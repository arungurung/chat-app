import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/login")({
	server: {
		handlers: {
			GET: async () =>
				new Response(JSON.stringify({ message: "Login endpoint" }), {
					status: 200,
				}),
		},
	},
});
