import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Head from "next/head";
import Card from "../components/Card";
import Header from "../components/Header";

export default function Detail({ data }) {
  const [post, setPost] = useState(data);

  return (
    <div className="container mx-auto md:px-64">
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
      <Header title={post.name} />
      <hr />
      <Card post={post} isDetail={true} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.BASE_URL}/findBySlug?slug=${slug}`);
  const data = await res.json();
  return { props: { data } };
}
