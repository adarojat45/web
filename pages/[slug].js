import Head from "next/head";
import { Footer } from "../components";
import parse from "html-react-parser";
import Moment from "react-moment";
import Prism from "prismjs";
import { useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/solid";

function Detail({ data, image }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data?.name}</title>
        <meta name="title" content={data?.name}></meta>
        <meta
          name="description"
          content={
            data?.excerpt
              ? data?.excerpt
              : "Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
          }
        />
        {/* twitter */}
        <meta
          name="twitter:url"
          content={`https://ajatdarojat45.id/${data?.slug}`}
        />
        <meta name="twitter:title" content={data?.name} />
        <meta
          name="description"
          content={
            data?.excerpt
              ? data?.excerpt
              : "Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
          }
        />
        <meta name="author" content="@ajatdarojat45" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ajatdarojat45" />
        <meta name="twitter:creator" content="@ajatdarojat45" />
        <meta
          name="twitter:image:src"
          content="https://source.unsplash.com/random/1200x628"
        />
        <meta property="article:published_time" content="" />
        {/* twitter */}
        {/* facebook */}
        <meta property="fb:app_id" content="442555743786001" />
        <meta
          property="og:url"
          content={`https://ajatdarojat45.id/${data?.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data?.name} />
        <meta
          property="og:description"
          content={
            data?.excerpt
              ? data?.excerpt
              : "Website dan blog pribadi Ajat Darojat, baca tulisan dan lihat eksperimen saya"
          }
        />
        <meta
          property="og:image"
          content="https://source.unsplash.com/random/1200x628"
        />
        {/* facebook */}

        <link rel="icon" href={image} />
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
            .prose code {
              background-color: rgba(0,0,0,.05);
              border-radius: 3px;
              padding: 2px 4px;
              font-weight: normal !important;
            }
            code::before {
              display: none;
            }
            code::after {
              display: none;
            }
        `,
          }}
        />
      </Head>

      <main className="container mx-auto">
        <article className="mt-10 prose prose-indigo md:prose-lg lg:prose-xl max-w-none">
          <Link href="/">
            <a>Kembali</a>
          </Link>
          <header className="text-center">
            <div className="text-center mb-5">
              <p
                className="inline text-gray-500 font-light"
                title={`${data?.createdAt} minutes`}
              >
                <Moment format="MMM. DD">{data?.createdAt}</Moment> (
                <Moment fromNow>{data?.createdAt}</Moment>)
              </p>
            </div>
            <h1 className="text-center">
              <span className="text-3x1 font-medium tracking-light text-gray-900 sm:text-4x1">
                {data?.name}
              </span>
            </h1>
            <div className="text-center">
              {data?.tags.map((tag, index) => (
                <p key={index} className="inline text-gray-500 font-light">
                  #{tag}{" "}
                </p>
              ))}
            </div>
            <div className="text-center">
              <hr className="mt-8 border-t2 mx-auto" />
            </div>
          </header>
          <div className="mt-8 mx-auto px-5 text-justify">
            {parse(data?.description)}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  try {
    const resp = await fetch(`${process.env.BASE_URL}/findBySlug?slug=${slug}`);
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

export default Detail;
