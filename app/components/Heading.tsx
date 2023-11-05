import { orbitron } from "@/app/fonts";

const Heading = ({ children }) => {
	return (
		<>
			<h1 className={`font-bold pb-3 text-2xl font-orbitron`}>
				{children}
			</h1>
		</>
	);
};
export default Heading;
