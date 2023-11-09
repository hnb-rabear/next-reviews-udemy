"use client";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useIsClient } from "@/lib/hook";

export const SearchBox = () => {
	const isClient = useIsClient();

	// do not render on the server
	if (!isClient) {
		return null;
	}

	// render on the client
	return (
		<Combobox>
			<Combobox.Input placeholder="Search..." />
		</Combobox>
	);
};
export default SearchBox;
