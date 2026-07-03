import React, { useState } from "react";
import playerService from "../services/playerService";

function SearchByTeam() {
	const [teamName, setTeamName] = useState("");
	const [playerList, setPlayerList] = useState(null);

	const handleChange = (e) => {
		setTeamName(e.target.value);
	};

	const searchPlayers = () => {
		if (!teamName) {
			alert("Please enter team name");
			return;
		}

		playerService
			.getPlayersByTeam(teamName)
			.then((player) => {
				setPlayerList(player.data);
			})
			.catch(() => {
				alert("Error occurred while searching");
			});
	};

	return (
		<div className="container mt-4">
			<h2>Search Players by Team</h2>

			<div className="mb-3">
				<label>Enter Team Name</label>

				<input
					type="text"
					className="form-control"
					value={teamName}
					onChange={handleChange}
					placeholder="Enter Team Name (Eg. Chennai Super Kings)"
				/>
			</div>

			<button className="btn btn-primary mb-3" onClick={searchPlayers}>
				Search
			</button>

			{playerList !== null && playerList.length === 0 && (
				<p>No players found.</p>
			)}

			{playerList !== null && playerList.length > 0 && (
				<div>
					<p>Found {playerList.length} player(s)</p>

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

export default SearchByTeam;
