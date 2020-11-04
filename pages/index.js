import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Card from "../components/Card";
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

      <Header title="ajatdarojat45" />

      <div className="flex mb-4">
        <div className="w-3/4 items-center">
          <div>
            <p className="text-4xl font-semibold mb-1 ">
              Halo, saya Ajat Darojat. 👋🏼
            </p>
            <p className="text-xl text-gray-700">
              Manusia yang ingin berguna dan bermanfaat.
            </p>
            <p className="italic text-xl mb-4 text-gray-700 underline">
              "Luruskan niat, perbaiki sikap, luaskan ilmu dan manfaat"
            </p>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1"
            >
              /Linkedin
            </a>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1"
            >
              /Youtube
            </a>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1"
            >
              /Instagram
            </a>
          </div>
        </div>
        <div className="flex justify-end w-1/4">
          <img
            className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-40 rounded-full"
            src="https://cms.ajatdarojat45.id/photos/1/IMG_20200305_180224_451.jpg"
            alt="Woman's Face"
          />
        </div>
      </div>
      <hr />

      {posts.map((post, i) => {
        return <Card post={post} key={i} />;
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://dev.api.ajatdarojat45.id/webs?page=1`);
  const data = await res.json();
  return { props: { data } };
}
