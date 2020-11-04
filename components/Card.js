import Link from "next/link";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function Card(props) {
  const { post, isDetail } = props;

  return (
    <div className="rounded overflow-hidden shadow-lg my-5">
      <div className="px-6 py-4">
        {post.categories.map((category, i) => {
          return (
            <Link
              href="/category/[slug]"
              as={`/category/${category.slug}`}
              key={i}
            >
              <a className="text-sm leading-tight text-gray-600 mr-1">
                {category.name}
              </a>
            </Link>
          );
        })}
        <Link href="/[slug]" as={`/${post.slug}`}>
          <a className="text-xl block mb-2">{post.name}</a>
        </Link>
        {isDetail && (
          <p class="text-gray-700 text-base mb-4">
            <ReactMarkdown plugins={[gfm]} children={post.description} />
          </p>
        )}
        {post.tags.map((tag, i) => {
          return (
            <Link href="/tag/[slug]" as={`/tag/${tag}`} key={i}>
              <a className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-1 mb-2">
                #{tag}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
