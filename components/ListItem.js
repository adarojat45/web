import Moment from "react-moment";
import Link from "next/link";

export default function ListItem({ post }) {
	return (
		<article className="p-4 flex space-x-4">
			<img
				src={post.image}
				alt=""
				className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
				width="144"
				height="144"
			/>
			<div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
				<dl className="flex flex-wrap text-sm font-medium whitespace-pre">
					<div className="flex-none w-full mt-0.5 font-normal">
						{post.categories.map((category) => (
							<p key={category.id} className="inline text-sm text-gray-700">
								{category.name}{" "}
							</p>
						))}
					</div>
					<div>
						<dt className="sr-only">Time</dt>
						<dd>
							<abbr
								className="text-gray-500 text-xs font-normal"
								title={`${post.createdAt} minutes`}
							>
								<Moment format="MMM. DD">{post.createdAt}</Moment> (
								<Moment fromNow>{post.createdAt}</Moment>)
							</abbr>
						</dd>
					</div>
				</dl>
				<Link href={`/${post.slug}`}>
					<a className="text-lg font-medium text-black mb-1 mt-1">{post.name}</a>
				</Link>
				<div className="mb-1 text-justify">
					<p className="inline text-gray-500 font-light">{post.excerpt}</p>
				</div>
				<div>
					{post.tags.map((tag, index) => (
						<p key={index} className="inline text-gray-400 font-light">
							#{tag}{" "}
						</p>
					))}
				</div>
			</div>
		</article>
	);
}
