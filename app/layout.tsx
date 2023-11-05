import Link from "next/link";
import "./global.css";
import NavBar from "./components/NavBar";
import { exo2, orbitron } from "./fonts";
import Heading from "./components/Heading";

interface LayoutProps {
	children: React.ReactNode;
}

export const metadata = {
	title: {
		default: "RadevBear blog",
		template: "%s | RadevBear blog",
	},
	description:
		"Welcome to my Unity Game Development blog, your ultimate resource for game creation with Unity. Discover tutorials, tips, and insights to level up your skills. Let's explore Unity together!",
};

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
			<body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
				<header>
					<NavBar />
				</header>
				<main className="grow  py-2">{children}</main>
				<footer className="border-t py-3 text-center text-slate-500 text-xs">
					Game data and images of{" "}
					<a
						href="https://rawg.io/"
						target="_blank"
						className="text-orange-800 hover:underline"
					>
						RAWG
					</a>
				</footer>
			</body>
		</html>
	);
}
