import { useState, useEffect } from "react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Button is displayed after scrolling for 500 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div>
			{isVisible && (
				<div
					onClick={scrollToTop}
					className="fixed bg-white rounded-full h-16 w-16 flex items-center justify-center shadow-2xl bottom-24 right-5 lg:bottom-5 lg:right-5"
					style={{
						boxShadow: "rgb(0 0 0 / 40%) 0px 4px 8px",
						cursor: "pointer",
						bottom: 90,
					}}
				>
					<svg
						width="2em"
						height="2em"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="icon"
					>
						<path
							d="M12 10.545L7.176 15.37a1.86 1.86 0 11-2.631-2.631l6.077-6.077a1.949 1.949 0 012.756 0l6.077 6.077a1.86 1.86 0 11-2.631 2.63L12 10.546z"
							fill="currentcolor"
							fillRule="evenodd"
						></path>
					</svg>
				</div>
			)}
		</div>
	);
}
