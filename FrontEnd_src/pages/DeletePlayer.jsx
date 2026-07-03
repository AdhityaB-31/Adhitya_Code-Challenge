import React, { useState } from "react";
import playerService from "../services/playerService";

function DeletePlayer(props) {
	const [searchId, setSearchId] = useState("");
	const [player, setPlayer] = useState(null);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("info");
	const [deleted, setDeleted] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();
		setMessage("");
		setPlayer(null);
		setDeleted(false);

		if (!searchId || isNaN(searchId)) {
			setMessage("Please enter a valid Player ID.");
			setMessageType("warning");
			return;
		}

		playerService
			.getPlayerById(Number(searchId))
			.then((res) => {
				setPlayer(res.data);
			})
			.catch(() => {
				setMessage("Player not found with ID: " + searchId);
				setMessageType("danger");
			});
	};

	const handleDelete = () => {
		if (!player) return;

		playerService
			.deletePlayer(player.playerId)
			.then(() => {
				setMessage("Player " + player.playerName + " deleted successfully!");
				setMessageType("success");
				setPlayer(null);
				setDeleted(true);
				setSearchId("");
			})
			.catch(() => {
				setMessage("Error deleting player. Please try again.");
				setMessageType("danger");
			});
	};

	return (
		<div className="container">
			<h2 className="mb-4">Delete Player</h2>

			<div className="card mb-4">
				<div className="card-header fw-bold">
					Step 1 — Enter Player ID
				</div>
				<div className="card-body">
					<form onSubmit={handleSearch} className="d-flex gap-3 align-items-end">
						<div className="flex-grow-1">
							<label className="form-label">Player ID</label>
							<input
								type="number"
								className="form-control"
								placeholder="e.g. 3"
								value={searchId}
								onChange={(e) => {
									setSearchId(e.target.value);
									setPlayer(null);
									setMessage("");
									setDeleted(false);
								}}
								min="1"
							/>
						</div>
						<button type="submit" className="btn btn-danger">
							Find Player
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => props.goToPage("all")}
						>
							Back to List
						</button>
					</form>
				</div>
			</div>

			{message && (
				<div className={`alert alert-${messageType}`}>{message}</div>
			)}

			{player && (
				<div className="card">
					<div className="card-header fw-bold">
						Step 2 — Confirm Deletion
					</div>
					<div className="card-body">
						<p className="fw-bold mb-3">
							Are you sure you want to permanently delete this player?
						</p>

						<table className="table table-bordered mb-4">
							<tbody>
								<tr>
									<th className="table-secondary w-25">Player ID</th>
									<td>{player.playerId}</td>
								</tr>
								<tr>
									<th className="table-secondary">Name</th>
									<td>{player.playerName}</td>
								</tr>
								<tr>
									<th className="table-secondary">Jersey No</th>
									<td>{player.jerseyNo}</td>
								</tr>
								<tr>
									<th className="table-secondary">Role</th>
									<td>{player.role}</td>
								</tr>
								<tr>
									<th className="table-secondary">Team</th>
									<td>{player.teamName}</td>
								</tr>
								<tr>
									<th className="table-secondary">Country</th>
									<td>{player.countryName}</td>
								</tr>
								<tr>
									<th className="table-secondary">Total Matches</th>
									<td>{player.totalMatch}</td>
								</tr>
								<tr>
									<th className="table-secondary">Description</th>
									<td>{player.description}</td>
								</tr>
							</tbody>
						</table>

						<button className="btn btn-danger me-2" onClick={handleDelete}>
							Yes, Delete Player
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => {
								setPlayer(null);
								setMessage("");
								setSearchId("");
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{deleted && (
				<div className="mt-3">
					<button className="btn btn-primary me-2" onClick={() => props.goToPage("all")}>
						View All Players
					</button>
					<button
						className="btn btn-outline-danger"
						onClick={() => {
							setDeleted(false);
							setMessage("");
						}}
					>
						Delete Another Player
					</button>
				</div>
			)}
		</div>
	);
}

export default DeletePlayer;
