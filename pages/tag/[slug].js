import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Card from "../../components/Card";
import Header from "../../components/Header";

export default function Tag({ data, slug }) {
  const [posts, setPosts] = useState(data.data);
  const [meta, setMeta] = useState(data.mataData);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(async () => {
    const res = await fetch(
      `https://dev.api.ajatdarojat45.id/webs/findByTag?page=1&tag=${slug}`
    );
    const data = await res.json();
    setPosts([...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  }, [slug]);

  const handlePaginate = async () => {
    const res = await fetch(
      `https://dev.api.ajatdarojat45.id/webs/findByTag?page=${
        page + 1
      }&tag=${slug}`
    );
    const data = await res.json();
    setPosts([...posts, ...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto px-40">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <Header title={`#${router.query.slug}`} />

      {posts.map((post, i) => {
        return (
          <>
            <Card post={post} key={i} />
          </>
        );
      })}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(
    `https://dev.api.ajatdarojat45.id/webs/findByTag?page=1&tag=${slug}`
  );
  const data = await res.json();
  return { props: { data, slug } };
}
