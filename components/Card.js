import Link from "next/link";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Moment from "react-moment";

export default function Card(props) {
  const { post, isDetail } = props;

  return (
    <Link href="/[slug]" as={`/${post.slug}`}>
      <div className="rounded overflow-hidden shadow-lg my-5 bg-gray-100">
        <div className="px-6 py-4">
          {post.categories.map((category, i) => {
            return (
              <Link
                href="/category/[slug]"
                as={`/category/${category.slug}`}
                key={i}
              >
                <a className="text-sm leading-tight text-gray-600 mr-1 font-normal">
                  {category.name}
                </a>
              </Link>
            );
          })}
          <p className="text-xs text-gray-700 mb-2 font-normal">
            <Moment format="MMM. DD">{post.createdAt}</Moment> (
            <Moment fromNow>{post.createdAt}</Moment>)
          </p>
          <Link href="/[slug]" as={`/${post.slug}`}>
            <a className="text-xl block mb-2 font-medium">{post.name}</a>
          </Link>
          {isDetail && (
            <p className="text-gray-700 text-base mb-4">
              <ReactMarkdown plugins={[gfm]} children={post.description} />
            </p>
          )}
          {post.tags.map((tag, i) => {
            return (
              <Link href="/tag/[slug]" as={`/tag/${tag}`} key={i}>
                <a className="inline-block text-sm text-gray-700 mr-2 mb-2 font-light">
                  #{tag}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
