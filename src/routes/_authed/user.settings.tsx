import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMutation } from "@/hooks/useMutation";
import User from "@/lib/models/user";
import { useAppSession } from "@/utils/session";

const updateProfilePicture = createServerFn({
	method: "POST",
})
	.inputValidator((d: { profilePic: string }) => d)
	.handler(async ({ data }) => {
		const {
			data: { email: userEmail },
		} = await useAppSession();

		await User.findOneAndUpdate(
			{ email: userEmail },
			{ profilePic: data.profilePic },
			{ new: true },
		);
	});

export const Route = createFileRoute("/_authed/user/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	// const updateProfilePictureMutation = useMutation({
	// 	fn: updateProfilePicture,
	// });

	return <div>Handle some user settings here</div>;
}
