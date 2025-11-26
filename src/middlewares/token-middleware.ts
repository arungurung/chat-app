import { createMiddleware } from "@tanstack/react-start";
import { getAppSession } from "@/utils/session";

export const tokenMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const session = await getAppSession();

		if (!session.data.accessToken) {
			throw new Error("middleware: No access token in session");
		}

		return next({
			context: {
				session,
			},
		});
	},
);
