import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Card from "../components/Card";
import Face from "../components/Face";
import Header from "../components/Header";

export default function Home({ data }) {
  const [posts, setPosts] = useState(data.data);
  const [meta, setMeta] = useState(data.mataData);
  const [page, setPage] = useState(1);

  const handlePaginate = async () => {
    const res = await fetch(
      `https://dev.api.ajatdarojat45.id/webs?page=${page + 1}`
    );
    const data = await res.json();
    console.log(data.data);
    setPosts([...posts, ...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  };

  return (
    <>
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

      <div className="container mx-auto md:px-64">
        <Header title="ajatdarojat45" />
        <Face />
        <hr />

        {posts.map((post, i) => {
          return <Card post={post} key={i} />;
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://dev.api.ajatdarojat45.id/webs?page=1`);
  const data = await res.json();
  return { props: { data } };
}
