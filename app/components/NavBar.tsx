import Link from "next/link";
import Heading from "./Heading";

const NavBar = () => {
	return (
		<>
			<nav>
				<ul className="flex gap-2">
					<li>
						<Link
							href="/"
							className="font-orbitron text-orange-800 hover:underline"
						>
							RadevBear blog
						</Link>
					</li>
					<li className="ml-auto">
						<Link
							href="/reviews"
							className="font-orbitron text-orange-800 hover:underline"
						>
							Reviews
						</Link>
					</li>
					<li>
						<Link
							href="/about"
							className="font-orbitron text-orange-800 hover:underline"
						>
							About
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
export default NavBar;
