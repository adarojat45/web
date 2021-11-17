import SocialMedia from "./SocialMedia";

export default function Header({ image }) {
	return (
		<figure className="flex flex-col mt-5 p-8 md:p-0 items-center">
			<img
				className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto"
				src={image}
				alt=""
				width="384"
				height="512"
			/>
			<blockquote>
				<p className="text-lg text-center mt-5 font-normal italic mb-2">
					“Luruskan niat, perbaiki sikap, luaskan ilmu dan manfaat”
				</p>
			</blockquote>
			<div className="text-cyan-600 text-3xl">Ajat Darojat</div>
			<div className="text-gray-500">Software Engineer & Coding Instructor</div>
			<div className="mt-5 sm:mb-5">
				<SocialMedia />
			</div>
		</figure>
	);
}
