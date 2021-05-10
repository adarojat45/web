export default function Nav({ children }) {
  return (
    <nav className="flex p-2 justify-center">
      <ul className="flex md:space-x-2">{children}</ul>
    </nav>
  );
}
