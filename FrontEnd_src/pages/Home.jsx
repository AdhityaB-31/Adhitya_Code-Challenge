import React from "react";

function Home(props) {
	return (
		<div className="container mt-4">
			<h2>Welcome to Cricket Team Management</h2>
			<p>This website helps you manage cricket players.</p>

			<hr />

			<div className="row">
				<div className="col-md-3">
					<h4>All Players</h4>
					<p>See all players list</p>
					<button
						className="btn btn-primary"
						onClick={() => props.goToPage("all")}
					>
						Go
					</button>
				</div>

				<div className="col-md-3">
					<h4>Add Player</h4>
					<p>Add a new player</p>
					<button
						className="btn btn-success"
						onClick={() => props.goToPage("add")}
					>
						Go
					</button>
				</div>

				<div className="col-md-3">
					<h4>Search by Team</h4>
					<p>Find players by team</p>
					<button
						className="btn btn-secondary"
						onClick={() => props.goToPage("byteam")}
					>
						Go
					</button>
				</div>

				<div className="col-md-3">
					<h4>Search by Role</h4>
					<p>Find players by role</p>
					<button
						className="btn btn-dark"
						onClick={() => props.goToPage("byrole")}
					>
						Go
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
