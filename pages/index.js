import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import Card from "../components/Card";
import Face from "../components/Face";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ data, url }) {
  const [posts, setPosts] = useState(data.data);
  const [meta, setMeta] = useState(data.mataData);
  const [page, setPage] = useState(1);

  const handleNext = async () => {
    const res = await fetch(`${url}?page=${page + 1}`);
    const data = await res.json();
    setPosts([...posts, ...data.data]);
    setMeta(data.mataData);
    setPage(page + 1);
  };

  const handleRefresh = async () => {
    const res = await fetch(`${url}?page=1`);
    const data = await res.json();
    setPosts([...data.data]);
    setMeta(data.mataData);
    setPage(1);
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
          <Header title="ajatdarojat45" />
          <Face />
          <hr />

          {posts.map((post, i) => {
            return <Card post={post} key={i} />;
          })}
        </InfiniteScroll>
        <hr />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}?page=1`);
  const data = await res.json();
  return { props: { data, url: process.env.BASE_URL } };
}
