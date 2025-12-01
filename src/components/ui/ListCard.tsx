import { m } from "framer-motion";

const ListCard = ({
	title,
	subTitle,
	img,
	id,
	onClick,
}: {
	title: string;
	subTitle?: string;
	img: string;
	id: string;
	onClick: () => void;
}) => {
	return (
		<m.button
			type="button"
			key={id}
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className="rounded-lg border border-gray-200 bg-white p-3 hover:cursor-pointer hover:shadow-lg transition-shadow"
			onClick={onClick}
		>
			<div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
				{img ? (
					<img
						src={img}
						alt={title}
						className="h-full w-full object-cover hover:scale-105 transition-transform"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
						No Art
					</div>
				)}
			</div>
			<div className="mt-2 truncate text-sm font-medium text-gray-900">
				{title}
			</div>
			{subTitle && (
				<div className="truncate text-xs text-gray-600">{subTitle}</div>
			)}
		</m.button>
	);
};

export default ListCard;
