import axios from "axios";

class PlayerService {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8080/api/player",
			headers: { "Content-Type": "application/json" },
		});
	}

	getAllPlayers() {
		return this.api.get("/getall");
	}

	getPlayerById(id) {
		return this.api.get(`/getbyid/${id}`);
	}

	createPlayer(data) {
		return this.api.post("/create", data);
	}

	updatePlayer(id, data) {
		return this.api.put(`/update/${id}`, data);
	}

	deletePlayer(id) {
		return this.api.delete(`/delete/${id}`);
	}

	getPlayersByTeam(teamName) {
		return this.api.get(`/getbyteam/${teamName}`);
	}

	getPlayersByRole(role) {
		return this.api.get(`/getbyrole/${role}`);
	}
}

export default new PlayerService();
