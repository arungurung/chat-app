import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user";
import { type SessionUser, useAppSession } from "@/utils/session";

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<SessionUser | null> => {
		const session = await useAppSession();
		await connectDB();

		if (!session.data.email) {
			return null;
		}

		try {
			const user = await User.findOne({ email: session.data.email });
			return {
				email: user?.email,
				id: user?._id.toString(),
				role: "user", // user?.role,
			};
		} catch (error) {
			console.error("Error fetching current user:", error);
			return null;
		}
	},
);
