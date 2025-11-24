import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import Login from "@/components/Login";
import User from "@/lib/models/user";
import { hashPassword } from "@/utils/password";
import { useAppSession } from "@/utils/session";

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((d: { email: string; password: string }) => d)
	.handler(async ({ data }) => {
		const user = await User.findOne({
			email: data.email,
		});
		if (!user) {
			return {
				error: true,
				message: "User not found",
				userNotFound: true,
			};
		}

		const hashedPassword = await hashPassword(data.password);
		if (user.password !== hashedPassword) {
			return {
				error: true,
				message: "Incorrect password",
			};
		}

		// Create a session
		// biome-ignore lint/correctness/useHookAtTopLevel: <naming>
		const session = await useAppSession();

		await session.update({
			email: user.email,
			id: user._id.toString(),
			role: "user", // user.role,
		});
	});

export const Route = createFileRoute("/_authed")({
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}
	},
	errorComponent: ({ error }) => {
		if (error.message === "Not authenticated") {
			return <Login />;
		}

		throw error;
	},
});
