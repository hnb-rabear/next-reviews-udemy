"use client";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useIsClient } from "@/lib/hook";

const reviews = [
	{ slug: "subnautica-23", title: "Subnautica Update 3" },
	{ slug: "hades-2018", title: "Hades" },
	{ slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
	{ slug: "black-mesa", title: "Black Mesa" },
	{ slug: "disco-elysium", title: "Disco Elysium" },
	{ slug: "dead-cells", title: "Dead Cells" },
	{ slug: "a-way-out-2018", title: "A Way Out" },
	{ slug: "warhammer-vermintide-2", title: "Warhammer: Vermintide 2" },
	{ slug: "celeste", title: "Celeste" },
	{ slug: "subnautica", title: "Subnautica" },
];

export const SearchBox = () => {
	const isClient = useIsClient();

	// do not render on the server
	if (!isClient) {
		return null;
	}

	// render on the client
	return (
		<div className="relative w-48">
			<Combobox>
				<Combobox.Input
					placeholder="Search..."
					className="border px-2 py-1 rounded"
				/>
				<Combobox.Options className="absolute bg-white">
					{reviews.map((review) => (
						<Combobox.Option key={review.slug} value={review.slug}>
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
