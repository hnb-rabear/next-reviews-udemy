import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Span } from "next/dist/trace";
import Link from "next/link";

function parsePageParam(paramValue, maxValue) {
	if (paramValue) {
		const parsedValue = parseInt(paramValue, 10);
		if (isFinite(parsedValue) && paramValue > 0) {
			return parsedValue > maxValue ? maxValue : parsedValue;
		}
	}
	return 1;
}

const Pagination = ({ href, page, pageCount }) => {
	if (page > pageCount) page = pageCount;
	if (page < 1) page = 1;
	return (
		<>
			<div className="flex gap-2 pb-3">
				<PaginationLink
					href={`${href}?page=${page - 1}`}
					enabled={page > 1}
				>
					<ChevronLeftIcon className="h-5 w-5" />
					<span className="sr-only">Previous Page</span>
				</PaginationLink>
				<span>
					Page {page} of {pageCount}
				</span>
				<PaginationLink
					href={`${href}?page=${page + 1}`}
					enabled={page < pageCount}
				>
					<ChevronRightIcon className="h-5 w-5" />
					<span className="sr-only">Next Page</span>
				</PaginationLink>
			</div>
		</>
	);
};

function PaginationLink({ children, href, enabled }) {
	if (!enabled) {
		return (
			<span className="border rounded cursor-not-allowed text-sm text-slate-300 hover:bg-orange-200 ">
				{children}
			</span>
		);
	}
	return (
		<Link
			href={href}
			className="border rounded text-sm hover:bg-orange-200 "
		>
			{children}
		</Link>
	);
}

export default Pagination;
