import React, { useState } from "react";
import playerService from "../services/playerService";

function SearchByRole() {
	const [role, setRole] = useState("");
	const [playerList, setPlayerList] = useState([]);

	const handleChange = (e) => {
		setRole(e.target.value);
	};

	const searchPlayers = () => {
		if (!role) {
			alert("Please select a role");
			return;
		}

		playerService
			.getPlayersByRole(role)
			.then((player) => {
				setPlayerList(player.data);
				if (player.data.length === 0) {
					alert("No players found for this role");
				}
			})
			.catch(() => {
				alert("Error occurred while searching");
			});
	};

	return (
		<div>
			<h2>Search Players by Role</h2>

			<div className="mb-3">
				<label>Select Role</label>

				<select
					className="form-control"
					value={role}
					onChange={handleChange}
				>
					<option value="">-- Select Role --</option>
					<option value="Batsman">Batsman</option>
					<option value="Bowler">Bowler</option>
					<option value="Keeper">Keeper</option>
					<option value="All Rounder">All Rounder</option>
				</select>
			</div>

			<button className="btn btn-primary mb-3" onClick={searchPlayers}>
				Search
			</button>

			{playerList.length > 0 && (
				<div>
					<p>
						Found {playerList.length} player(s) with role: {role}
					</p>

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
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default SearchByRole;
