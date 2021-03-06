import React, { useRef } from "react";
import useIntersect from "../hooks/useIntersect";

const insertAttribute = (node) => {
	node.setAttribute("issue-term", "url");
	node.setAttribute("repo", "ajatdarojat45/ajatdarojat45-comment");
	node.setAttribute("theme", "github-light");
	node.setAttribute("crossorigin", "anonymous");
	node.setAttribute("label", "✨💬✨ Comment");
};

export default function CommentBox() {
	const onIntersect = () => {
		try {
			const script = document.createElement("script");
			insertAttribute(script);

			script.onload = () => {
				const idSkeleton = document.getElementById("comment-skeleton");
				if (idSkeleton) {
					setTimeout(() => {
						idSkeleton.remove();
					}, 1000);
				}
			};

			script.async = true;
			script.src = "https://utteranc.es/client.js";

			const idParent = document.getElementById("comment-block");
			if (idParent) {
				insertAttribute(idParent);
				idParent.appendChild(script);
			}
		} catch (e) {
			console.error("Failed insert utterances.es", e);
		}
	};

	const targetRef = useIntersect(onIntersect, {}, true);

	return (
		<>
			<div id="comment-block" ref={targetRef}>
				<div id="comment-skeleton" className="flex justify-center">
					<div className="w-full max-w-760 rounded-lg p-4 mb-2 overflow-hidden shadow-lg dark:bg-gray-800">
						<div className="flex">
							<div className="rounded w-20 h-8 bg-gray-100 mr-2"></div>
							<div className="rounded w-20 h-8 bg-gray-100"></div>
						</div>
						<div className="rounded w-full h-28 bg-gray-100 my-2 flex items-center justify-center text-xl md:text-2xl">
							Loading comments...
						</div>
						<div className="flex justify-between">
							<div className="rounded w-40 h-4 bg-gray-100 mr-2"></div>
							<div className="rounded w-28 h-10 bg-gray-100"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
