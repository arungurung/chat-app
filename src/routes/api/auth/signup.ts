import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/signup")({
	server: {
		handlers: {
			GET: async () =>
				new Response(JSON.stringify({ message: "Signup endpoint" }), {
					status: 200,
				}),
		},
	},
});
