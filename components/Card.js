import Link from "next/link";
import Moment from "react-moment";
import { Collapse } from "react-collapse";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function Card(props) {
  const { post, isDetail } = props;
  const [isCollapse, setIsCollapse] = useState(isDetail);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(async () => {
    console.log(isCollapse);
    if (isCollapse === true && !isDetail) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/findBySlug?slug=${post.slug}`
      );
      const data = await res.json();
    }
  }, [isCollapse]);

  return (
    <div className="rounded overflow-hidden shadow-lg mb-2">
      <div className="px-6 py-4">
        <div className="flex">
          <div className="w-3/4">
            {post.categories.map((category, i) => {
              return (
                <Link
                  href="/category/[slug]"
                  as={`/category/${category.slug}`}
                  key={i}
                >
                  <a className="text-sm leading-tight mr-1 font-normal">
                    {category.name}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="w-1/4 flex justify-end">
            <a onClick={handleCollapse}>
              {isCollapse ? <span>⬆️</span> : <span>⬇️</span>}
            </a>
          </div>
        </div>
        <p className="text-xs m-0 mb-2 font-normal">
          <Moment format="MMM. DD">{post.createdAt}</Moment> (
          <Moment fromNow>{post.createdAt}</Moment>)
        </p>
        <Link href="/[slug]" as={`/${post.slug}`}>
          <a className="text-xl block mb-2 font-medium">{post.name}</a>
        </Link>
        <Collapse isOpened={isCollapse}>
          <div className=" text-base mb-4">
            {ReactHtmlParser(post.description)}
          </div>
        </Collapse>
        {post.tags.map((tag, i) => {
          return (
            <Link href="/tag/[slug]" as={`/tag/${tag}`} key={i}>
              <a className="inline-block text-sm mr-2 mb-2 font-light">
                #{tag}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
