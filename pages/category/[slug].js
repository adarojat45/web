import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "../../components/Card";
import Header from "../../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Category({ data, slug, url }) {
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
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 className="text-center m-5">&#8593; Release to refresh</h3>
        }
      >
        <div className="container mx-auto md:px-64">
          <Header title="Category" />
          <hr />

          {posts.map((post, i) => {
            return (
              <>
                <Card post={post} key={i} />
              </>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(
    `${process.env.BASE_URL}/findByCategory?page=1&category=${slug}`
  );
  const data = await res.json();
  return { props: { data, slug, url: process.env.BASE_URL } };
}
