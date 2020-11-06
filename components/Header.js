import Link from "next/link";

export default function Header(props) {
  const { title, theme, onSetTheme } = props;

  return (
    <>
      <div className="flex pt-4 items-center md:mx-0 mb-2">
        <div className="w-3/4 flex items-center ml-5">
          <Link href="/">
            <a className="text-lg">
              {title !== "ajatdarojat45" && <span>⬅️</span>} /{title}
            </a>
          </Link>
        </div>
        <div className="w-1/4 flex justify-end mr-5">
          {theme === "dark" ? (
            <span onClick={onSetTheme}>🌝</span>
          ) : (
            <span onClick={onSetTheme}>🌚</span>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
