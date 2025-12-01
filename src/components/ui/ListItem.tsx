import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { msToMinutes } from "@/utils/time";

const ListItem = ({
	id,
	title,
	img,
	subTitle,
	onClick,
	spotifyLink,
	duration_ms,
}: {
	id: string;
	title: string;
	img: string;
	onClick: () => void;
	subTitle?: string;
	spotifyLink?: string;
	duration_ms?: number;
}) => (
	<m.li
		initial={{ opacity: 0, y: 6 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.25 }}
		key={id}
		className="p-1"
	>
		<m.button
			type="button"
			onClick={onClick}
			className="rounded p-2 cursor-pointer hover:bg-gray-100 flex items-center gap-3 w-full"
		>
			<div className="min-w-0 flex-1 text-left flex items-center gap-3">
				<div className="h-10 w-10 overflow-hidden rounded">
					{img ? (
						<img src={img} alt="cover" className="h-full w-full object-cover" />
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
							No Art
						</div>
					)}
				</div>
				<div className="flex flex-col min-w-0">
					<div className="truncate text-sm font-medium text-gray-900">
						{title}
					</div>
					{subTitle && (
						<div className="truncate text-xs text-gray-600">{subTitle}</div>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2">
				{duration_ms && (
					<div className="text-xs text-gray-500">
						{msToMinutes(duration_ms)}
					</div>
				)}
				{spotifyLink ? (
					<a
						href={spotifyLink}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
					>
						<ExternalLink className="h-3 w-3" />
						Spotify
					</a>
				) : null}
			</div>
		</m.button>
	</m.li>
);

export default ListItem;
