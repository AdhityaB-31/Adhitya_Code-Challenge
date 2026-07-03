import React from "react";

function Navbar(props) {
	return (
		<nav
			className="navbar navbar-dark bg-dark"
			style={{ flexWrap: "nowrap", overflowX: "auto", gap: "2px" }}
		>
			<span
				className="navbar-brand"
				style={{ whiteSpace: "nowrap", fontSize: "0.95rem", marginRight: "4px" }}
			>
				Cricket Team Management
			</span>

			{[
				{ label: "Home", page: "home" },
				{ label: "All Players", page: "all" },
				{ label: "Add Player", page: "add" },
				{ label: "Update Player", page: "update" },
				{ label: "Delete Player", page: "delete" },
				{ label: "Search by Team", page: "byteam" },
				{ label: "Search by Role", page: "byrole" },
			].map(({ label, page }) => (
				<button
					key={page}
					className="btn btn-link text-white"
					style={{ whiteSpace: "nowrap", fontSize: "0.85rem", padding: "4px 8px" }}
					onClick={() => props.goToPage(page)}
				>
					{label}
				</button>
			))}
		</nav>
	);
}

export default Navbar;
