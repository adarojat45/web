export default function NavItem({ href, isActive, children, onClick }) {
	return (
		<li>
			<a
				href="#"
				className={`block px-4 py-2 rounded-md ${isActive ? "bg-gray-100" : ""}`}
				onClick={() => onClick(children)}
			>
				{children}
			</a>
		</li>
	);
}
