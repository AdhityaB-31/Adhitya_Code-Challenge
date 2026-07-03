import React from "react";

function Navbar(props) {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<span className="navbar-brand">Cricket Team Management</span>

			<button
				className="btn btn-link text-white"
				onClick={() => props.goToPage("home")}
			>
				Home
			</button>

			<button
				className="btn btn-link text-white"
				onClick={() => props.goToPage("all")}
			>
				All Players
			</button>

			<button
				className="btn btn-link text-white"
				onClick={() => props.goToPage("add")}
			>
				Add Player
			</button>

			<button
				className="btn btn-link text-white"
				onClick={() => props.goToPage("byteam")}
			>
				Search by Team
			</button>

			<button
				className="btn btn-link text-white"
				onClick={() => props.goToPage("byrole")}
			>
				Search by Role
			</button>
		</nav>
	);
}

export default Navbar;
