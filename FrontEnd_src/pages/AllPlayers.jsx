import React, { useState, useEffect } from "react";
import playerService from "../services/playerService";

function AllPlayers(props) {
	const [playerList, setPlayerList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		loadPlayers();
	}, []);

	const loadPlayers = () => {
		setLoading(true);

		playerService
			.getAllPlayers()
			.then((player) => {
				setPlayerList(player.data);
				setLoading(false);
			})
			.catch(() => {
				setMessage("Error loading players");
				setLoading(false);
			});
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			playerService
				.deletePlayer(id)
				.then(() => {
					setMessage("Player deleted successfully");
					loadPlayers();
				})
				.catch(() => {
					setMessage("Error deleting player");
				});
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>All Players</h2>

			<button
				className="btn btn-primary mb-3"
				onClick={() => props.goToPage("add")}
			>
				Add New Player
			</button>

			{message && <div className="alert alert-info">{message}</div>}

			{playerList.length === 0 && <p>No players found.</p>}

			<table className="table table-bordered">
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Jersey No</th>
						<th>Role</th>
						<th>Team</th>
						<th>Country</th>
						<th>Total Matches</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{playerList.map((player) => (
						<tr key={player.playerId}>
							<td>{player.playerId}</td>
							<td>{player.playerName}</td>
							<td>{player.jerseyNo}</td>
							<td>{player.role}</td>
							<td>{player.teamName}</td>
							<td>{player.countryName}</td>
							<td>{player.totalMatch}</td>
							<td>{player.description}</td>

							<td>
								<button
									className="btn btn-warning btn-sm me-2"
									onClick={() => {
										props.setEditId(player.playerId);
										props.goToPage("edit");
									}}
								>
									Edit
								</button>

								<button
									className="btn btn-danger btn-sm"
									onClick={() =>
										handleDelete(player.playerId)
									}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AllPlayers;
