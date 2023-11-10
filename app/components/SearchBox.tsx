"use client";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useIsClient } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export const SearchBox = () => {
	const router = useRouter();
	const isClient = useIsClient();
	const [query, setQuery] = useState("");
	const [reviews, setReviews] = useState([]);
	const [debounceQuery] = useDebounce(query, 400);

	useEffect(() => {
		if (debounceQuery.length > 1) {
			const controller = new AbortController();
			const search = async () => {
				const url = `api/search?query=${encodeURIComponent(
					debounceQuery
				)}`;
				const response = await fetch(url, {
					signal: controller.signal,
				});
				const rr = await response.json();
				setReviews(rr);
			};
			search();
			return () => controller.abort();
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

	// const filtered = reviews
	// 	.filter((review) => review.title.includes(query))
	// 	.slice(0, 10);

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
