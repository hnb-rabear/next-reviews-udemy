"use client";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useIsClient } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import searchData from "@/lib/searchData";

export const SearchBox = () => {
	const router = useRouter();
	const isClient = useIsClient();
	const [query, setQuery] = useState("");
	const [reviews, setReviews] = useState([]);
	const [debounceQuery] = useDebounce(query, 400);

	useEffect(() => {
		if (debounceQuery.length > 1) {
			const filteredReviews = searchData
				.filter(
					(item) =>
						item.slug.includes(debounceQuery) ||
						item.title.includes(debounceQuery)
				)
				.slice(0, 10);
			setReviews(filteredReviews);
		} else {
			setReviews([]);
		}
	}, [debounceQuery]);

	// do not render on the server
	if (!isClient) {
		return null;
	}

	const handleChange = (review) => {
		router.push("/reviews/" + review.slug);
	};

	// render on the client
	return (
		<div className="relative w-48">
			<Combobox onChange={handleChange}>
				<Combobox.Input
					placeholder="Search..."
					className="border px-2 py-1 rounded"
					onChange={(event) => setQuery(event.target.value)}
					value={query}
				/>
				<Combobox.Options className="absolute bg-white">
					{reviews.map((review) => (
						<Combobox.Option key={review.slug} value={review}>
							{({ active }) => (
								<span
									className={`block px-2 truncate w-full ${
										active ? "bg-orange-100" : ""
									}`}
								>
									{review.title}
								</span>
							)}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox>
		</div>
	);
};
export default SearchBox;
