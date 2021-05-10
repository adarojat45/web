import Head from "next/head";
import { List, ListItem, Nav, NavItem, Header, Footer } from "../components";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Home({ data, image, url }) {
  const [posts, setPosts] = useState(data.data);
  const [showPosts, setShowPosts] = useState(data.data);
  const [meta, setMeta] = useState(data.mataData);
  const [page, setPage] = useState(1);
  const [categories] = useState([
    "All",
    "Blog",
    "Podcast",
    "Video",
    "Eksperimen",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const newPosts = posts.filter((post) =>
      post.categories.every((category) =>
        selectedCategory.includes(category.name)
      )
    );
    selectedCategory === "All" ? setShowPosts(posts) : setShowPosts(newPosts);
  }, [selectedCategory, posts]);

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

  const handleSelectCategory = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ajat Darojat | @ajatdarojat45</title>
        <meta
          name="description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
        />
        {/* twitter */}
        <meta name="twitter:url" content="https://ajatdarojat45.id" />
        <meta name="twitter:title" content="Ajat Darojat | @ajatdarojat45" />
        <meta
          name="twitter:description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
        />
        <meta name="author" content="@ajatdarojat45" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ajatdarojat45" />
        <meta name="twitter:creator" content="@ajatdarojat45" />
        <meta name="twitter:image:src" content={image} />
        <meta property="article:published_time" content="" />
        {/* twitter */}
        {/* facebook */}
        <meta property="fb:app_id" content="442555743786001" />
        <meta property="og:url" content="https://ajatdarojat45.id" />
        <meta property="og:title" content="Ajat Darojat | @ajatdarojat45" />
        <meta
          property="og:description"
          content="Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
        />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        {/* facebook */}
        <link rel="icon" href={image} />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
      </Head>

      <main className="container mx-auto">
        <InfiniteScroll
          dataLength={posts.length}
          next={handleNext}
          hasMore={page * meta.perPage < meta.total ? true : false}
          loader={
            <p className="text-center m-5">
              <b>Loading...</b>
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
          <div className="divide-y divide-gray-100">
            <Header image={image} />
            <Nav>
              {categories.map((category, index) => (
                <NavItem
                  isActive={selectedCategory === category ? true : false}
                  onClick={handleSelectCategory}
                  key={index}
                >
                  {category}
                </NavItem>
              ))}
            </Nav>
            <List>
              {showPosts.map((post, index) => (
                <ListItem
                  key={post.id}
                  post={{
                    ...post,
                    image: `https://source.unsplash.com/random/300x200?sig=${index}`,
                  }}
                />
              ))}
            </List>
          </div>
        </InfiniteScroll>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const resp = await fetch(process.env.BASE_URL);
    const data = await resp.json();
    return {
      props: {
        data,
        url: process.env.BASE_URL,
        image: process.env.DISPLAY_PICTURE,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        url: process.env.BASE_URL,
        image: process.env.DISPLAY_PICTURE,
      },
    };
  }
}

export default Home;
