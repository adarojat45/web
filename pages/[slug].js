import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Head from "next/head";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Detail({ data, image }) {
  const [post, setPost] = useState(data);

  return (
    <div className="container mx-auto md:px-64">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{post.name}</title>
        <meta name="description" content={post.name} />
        <meta name="author" content="@ajatdarojat45" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ajatdarojat45" />
        <meta name="twitter:creator" content="@ajatdarojat45" />
        <meta name="twitter:title" content={post.name} />
        <meta
          name="twitter:url"
          content={`https://ajatdarojat45.id/${post.slug}`}
        />
        <meta name="twitter:description" content={post.name} />
        <meta name="twitter:image:src" content={image} />
        <meta property="article:published_time" content="" />
        <meta property="og:title" content={post.name} />
        <meta
          property="og:description"
          content="Ajat Darojat | @ajatdarojat45"
        />
        <meta property="og:url" content="https://ajatdarojat45.id" />
        <meta property="og:image" content={image} />
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
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-119525260-1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-119525260-1');
            `,
          }}
        />
      </Head>
      <Header title={post.name} />
      <hr />
      <Card post={post} isDetail={true} />
      <hr />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.BASE_URL}/findBySlug?slug=${slug}`);
  const data = await res.json();
  return { props: { data, image: process.env.DISPLAY_PICTURE } };
}
