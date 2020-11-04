import Link from "next/link";

export default function Header(props) {
  const { title } = props;
  return (
    <div className="flex mb-4 mt-4 items-center md:mx-0 mx-2">
      <div className="w-1/2 flex items-center">
        <Link href="/">
          <a className="text-lg text-gray-700">
            {title !== "ajatdarojat45" && <span>⬅️</span>} /{title}
          </a>
        </Link>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        {/* <span>🌝</span> */}
      </div>
    </div>
  );
}
