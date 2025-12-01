import { createMiddleware } from "@tanstack/react-start";
import { getAppSession } from "@/utils/session";

const authClientMiddleware = createMiddleware({ type: "function" }).client(
	async ({ next }) => {
		try {
			return await next();
		} catch (error) {
			if (error === "Unauthorized") {
				window.location.href = "/";
			}
			throw error;
		}
	},
);

export const authMiddleware = createMiddleware({ type: "function" })
	.middleware([authClientMiddleware])
	.server(async ({ next }) => {
		const session = await getAppSession();

		if (!session.data.accessToken) {
			throw { message: "Unauthorized", status: 401 };
		}

		return next({
			context: {
				session,
			},
		});
	});
