import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

const themes = {
  light: {
    foreground: "#2d3748",
    background: "#edf2f7",
  },
  dark: {
    foreground: "#edf2f7",
    background: "#2d3748",
  },
};

export default function Detail({ data, image }) {
  const [post, setPost] = useState(data);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const newTheme = localStorage.getItem("theme");
    newTheme ? setTheme(newTheme) : setTheme("light");
  }, []);

  const handleSetTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://ajatdarojat45-id.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
            `,
          }}
        />
      </Head>
      <body
        style={{
          backgroundColor: themes[theme].background,
          color: themes[theme].foreground,
        }}
      >
        <div className="container mx-auto md:px-64">
          <Header title={post.name} theme={theme} onSetTheme={handleSetTheme} />
          <br />
          <Card post={post} isDetail={true} />
          <br />
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{" "}
            <a href="https://disqus.com/?ref_noscript">
              comments powered by Disqus.
            </a>
          </noscript>
          <hr />
          <Footer />
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.BASE_URL}/findBySlug?slug=${slug}`);
  const data = await res.json();
  return { props: { data, image: process.env.DISPLAY_PICTURE } };
}
