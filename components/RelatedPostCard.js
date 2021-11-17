import Link from "next/link";

export default function RelatedPostCard({ post }) {
	return (
		<article
			className="p-4 flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:w-1/4"
			style={{ minWidth: "25%" }}
		>
			<img
				src={post.image}
				alt=""
				className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
				width="144"
				height="144"
			/>
			<div className="">
				<dl className="flex flex-wrap text-sm font-medium whitespace-pre">
					<div className="flex-none w-full mt-0.5 font-normal">
						{post.categories.map((category) => (
							<p key={category.id} className="inline text-sm text-gray-700">
								{category.name}{" "}
							</p>
						))}
					</div>
				</dl>
				<Link href={`/${post.slug}`}>
					<a className="text-sm text-left font-medium text-black mb-1 mt-1">
						{post.name}
					</a>
				</Link>
			</div>
		</article>
	);
}
