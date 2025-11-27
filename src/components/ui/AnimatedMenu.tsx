import { useEffect, useRef, useState } from "react";
import { Motion, useReducedMotion } from "@/components/motion/MotionProvider";

export interface MenuItem {
	label: string;
	icon?: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

interface AnimatedMenuProps {
	trigger: React.ReactNode;
	items: MenuItem[];
	align?: "left" | "right";
}

export default function AnimatedMenu({
	trigger,
	items,
	align = "right",
}: AnimatedMenuProps) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);

	return (
		<div ref={menuRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="rounded-md p-2 hover:bg-gray-100"
				aria-haspopup="menu"
				aria-expanded={open}
			>
				{trigger}
			</button>
			{open && (
				<Motion.div
					initial={{ opacity: 0, scale: 0.95, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -4 }}
					transition={{ duration: reduced ? 0 : 0.15 }}
					role="menu"
					className={`absolute top-full z-50 mt-1 min-w-[180px] rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 ${
						align === "right" ? "right-0" : "left-0"
					}`}
				>
					{items.map((item) => (
						<button
							key={item.label}
							type="button"
							role="menuitem"
							disabled={item.disabled}
							onClick={() => {
								item.onClick();
								setOpen(false);
							}}
							className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{item.icon && <span className="text-gray-500">{item.icon}</span>}
							<span>{item.label}</span>
						</button>
					))}
				</Motion.div>
			)}
		</div>
	);
}
