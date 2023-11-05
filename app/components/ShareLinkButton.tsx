"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

const ShareLinkButton = () => {
	const [clicked, setClicked] = useState(false);

	function onShareClick() {
		navigator.clipboard.writeText(window.location.href);
		setClicked(true);
		setTimeout(() => {
			setClicked(false);
		}, 30000);
	}

	return (
		<button
			onClick={onShareClick}
			className="border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
		>
			<LinkIcon className="w-4 h-4" />
			Share {clicked ? "(copied)" : ""}
		</button>
	);
};
export default ShareLinkButton;
