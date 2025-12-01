import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
	placeholder?: string;
	onSubmit?: (query: string) => void;
	initialQuery?: string;
	autoFocus?: boolean;
}

export default function SearchBar({
	placeholder = "Search songs, artists, albums...",
	onSubmit,
	initialQuery = "",
}: SearchBarProps) {
	const [query, setQuery] = useState(initialQuery);
	// keep input in sync with provided initialQuery (from URL search params)
	useEffect(() => setQuery(initialQuery), [initialQuery]);

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && query.trim()) {
			onSubmit?.(query.trim());
		}
	}

	return (
		<div className="relative w-full">
			<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				// autoFocus purposely omitted to satisfy linting rules
				className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none ring-green-600/0 transition focus:ring-2"
			/>
		</div>
	);
}
