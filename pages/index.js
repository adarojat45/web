import Head from "next/head";
import {
	List,
	ListItem,
	Nav,
	NavItem,
	Header,
	Footer,
	ScrollToTop,
} from "../components";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";
import { useCallback } from "react";

function Home({ data, image, url }) {
	const [posts, setPosts] = useState(data?.posts);
	const [showPosts, setShowPosts] = useState(data?.data);
	const [meta, setMeta] = useState(data?.metaData);
	const [page, setPage] = useState(1);
	const [categories] = useState([
		"All",
		"Blog",
		"Podcast",
		"Video",
		"Eksperimen",
	]);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let _posts = [];
		posts.map((post) => {
			post.categories.map((category) => {
				if (category.name === selectedCategory) {
					_posts = [..._posts, post];
				}
			});
		});
		selectedCategory === "All" ? setShowPosts(posts) : setShowPosts(_posts);
	}, [selectedCategory, posts]);

	const handleNext = async () => {
		if (searchInput === "") {
			const res = await fetch(`${url}/posts?page=${page + 1}`);
			const data = await res.json();
			setPosts([...posts, ...data.posts]);
			setMeta(data.metaData);
			setPage(page + 1);
		}
	};

	const handleRefresh = async () => {
		const res = await fetch(`${url}/posts?page=1`);
		const data = await res.json();
		setPosts([...data.posts]);
		setMeta(data.metaData);
		setPage(1);
		setSearchInput("");
	};

	const handleSelectCategory = (newCategory) => {
		setSelectedCategory(newCategory);
	};

	const handleSearchDelayed = useCallback(
		_.debounce(async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${url}/posts/search?q=${searchInput}`);
				const data = await res.json();
				setShowPosts(data);
			} catch (error) {
				console.log("🚀 ~ file: index.js ~ line 75 ~ _.debounce ~ error", error);
			} finally {
				setIsLoading(false);
			}
		}, 500),
		[searchInput]
	);

	const handleSearch = (e) => {
		let eventData = e.target.value;
		setSearchInput(eventData);
	};

	useEffect(() => {
		if (searchInput !== "") {
			handleSearchDelayed();
		} else {
			setShowPosts(posts);
		}
		return handleSearchDelayed.cancel;
	}, [searchInput, handleSearchDelayed]);

	return (
		<div>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Ajat Darojat | @ajatdarojat45</title>
				<meta name="title" content="Ajat Darojat | @ajatdarojat45"></meta>
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
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@ajatdarojat45" />
				<meta name="twitter:creator" content="@ajatdarojat45" />
				<meta
					name="twitter:image:src"
					content="https://res.cloudinary.com/ajatdarojat45/image/upload/v1620658750/ajatdarojat45/image_eya7le.png"
				/>
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
				<meta
					property="og:image"
					content="https://res.cloudinary.com/ajatdarojat45/image/upload/v1620658750/ajatdarojat45/image_eya7le.png"
				/>
				<meta property="og:type" content="website" />
				{/* facebook */}
				<link rel="icon" href={image} />
				<script
					data-name="BMC-Widget"
					data-cfasync="false"
					src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
					data-id="ajatdarojat45"
					data-description="Support me on Buy me a coffee!"
					data-message=""
					data-color="#FFDD00"
					data-position="Right"
					data-x_margin="18"
					data-y_margin="18"
				></script>
			</Head>

			<main className="container mx-auto max-w-3xl">
				{isLoading && (
					<div
						style={{
							backgroundColor: "rgba(0,0,0,0.0)",
							backgroundColor: "rgba(0,0,0,0.2)",
							height: "100vh",
							width: "100vw",
							zIndex: 1,
							top: 0,
							left: 0,
							position: "fixed",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<b>Sabar ya, lagi nyari nih...</b>
					</div>
				)}
				<InfiniteScroll
					dataLength={posts?.length}
					next={handleNext}
					hasMore={meta?.hasNextPage}
					loader={
						searchInput === "" ? (
							<p className="text-center m-5">
								<b>Loading...</b>
							</p>
						) : (
							""
						)
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
					<div className="divide-y divide-gray-100">
						<Header image={image} />
						{/* <Nav>
							{categories.map((category, index) => (
								<NavItem
									isActive={selectedCategory === category ? true : false}
									onClick={handleSelectCategory}
									key={index}
								>
									{category}
								</NavItem>
							))}
						</Nav> */}
						<div className="p-4">
							<div className="relative">
								<svg
									width="20"
									height="20"
									fill="currentColor"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									/>
								</svg>
								<input
									className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
									type="text"
									aria-label="Cari disini"
									placeholder="Cari disini"
									onChange={handleSearch}
									value={searchInput}
								/>
							</div>
						</div>
						<List>
							{showPosts?.map((post, index) => (
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
				<ScrollToTop />
			</main>
			<Footer />
		</div>
	);
}

export async function getStaticProps(context) {
	try {
		const resp = await fetch(`${process.env.BASE_URL}/posts`);
		const data = await resp.json();
		return {
			props: {
				data: data,
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
