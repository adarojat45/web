import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Category({ data, slug, url, image }) {
  const [posts, setPosts] = useState(data.data);
  const [meta, setMeta] = useState(data.mataData);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const res = await fetch(`${url}/findByCategory?page=1&category=${slug}`);
    const data = await res.json();
    setPosts([...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  }, [slug]);

  const handleNext = async () => {
    const res = await fetch(
      `${url}/findByCategory?page=${page + 1}&category=${slug}`
    );
    const data = await res.json();
    setPosts([...posts, ...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  };

  const handleRefresh = async () => {
    const res = await fetch(`${url}/findByCategory?page=1&category=${slug}`);
    const data = await res.json();
    setPosts([...data.data]);
    setMeta(data.mataData);
    setPage(1);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ajat Darojat | @ajatdarojat45</title>
        <meta
          name="description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
        />
        <meta name="author" content="@ajatdarojat45" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ajatdarojat45" />
        <meta name="twitter:creator" content="@ajatdarojat45" />
        <meta name="twitter:title" content="Ajat Darojat | @ajatdarojat45" />
        <meta name="twitter:url" content="https://ajatdarojat45.id" />
        <meta
          name="twitter:description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
        />
        <meta name="twitter:image:src" content={image} />

        <meta property="article:published_time" content="" />
        <meta property="og:title" content="Ajat Darojat | @ajatdarojat45" />
        <meta
          property="og:description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
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
      <div className="container mx-auto md:px-64">
        <InfiniteScroll
          dataLength={posts.length}
          next={handleNext}
          hasMore={page * meta.perPage < meta.total ? true : false}
          loader={
            <p className="text-center m-5">
              <b>Loading...</b>
            </p>
          }
          endMessage={
            <p className="text-center m-5">
              <b>Yay! Kamu sudah liat semuanya.</b>
            </p>
          }
          refreshFunction={handleRefresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center m-5">&#8593; Release to refresh</h3>
          }
        >
          <Header title="Category" />
          <hr />

          {posts.map((post, i) => {
            return (
              <>
                <Card post={post} key={i} />
              </>
            );
          })}
        </InfiniteScroll>
        <hr />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(
    `${process.env.BASE_URL}/findByCategory?page=1&category=${slug}`
  );
  const data = await res.json();
  return {
    props: {
      data,
      slug,
      url: process.env.BASE_URL,
      image: process.env.DISPLAY_PICTURE,
    },
  };
}
