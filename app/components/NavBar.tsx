import Link from "next/link";
import Heading from "./Heading";
import NavLink from "./NavLink";

const NavBar = () => {
	return (
		<>
			<nav>
				<ul className="flex gap-2">
					<li className="font-bold font-orbitron capitalize">
						<NavLink href={"/"} prefetch={false}>
							RadevBear blog
						</NavLink>
					</li>
					<li className="ml-auto capitalize">
						<NavLink href="/reviews" prefetch={false}>
							Reviews
						</NavLink>
					</li>
					<li className="capitalize">
						<NavLink href="/about" prefetch={false}>
							About
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
};
export default NavBar;
