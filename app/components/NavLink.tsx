"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({ children, href, prefetch }) => {
	const pathName = usePathname();

	if (pathName == href) {
		return (
			<>
				<span className="text-orange-800">{children}</span>
			</>
		);
	}
	return (
		<>
			<Link
				prefetch={prefetch}
				href={href}
				className="text-orange-800 hover:underline"
			>
				{children}
			</Link>
		</>
	);
};
export default NavLink;
