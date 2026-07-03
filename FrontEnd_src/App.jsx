import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllPlayers from "./pages/AllPlayers";
import AddPlayer from "./pages/AddPlayer";
import SearchByTeam from "./pages/SearchByTeam";
import SearchByRole from "./pages/SearchByRole";

function App() {
	const [page, setPage] = useState("home");
	const [editId, setEditId] = useState(null);

	const goToPage = (pageName) => {
		setPage(pageName);
	};

	const renderPage = () => {
		if (page === "home") {
			return <Home goToPage={goToPage} />;
		}

		if (page === "all") {
			return <AllPlayers goToPage={goToPage} setEditId={setEditId} />;
		}

		if (page === "add") {
			return <AddPlayer goToPage={goToPage} />;
		}

		if (page === "edit") {
			return <AddPlayer goToPage={goToPage} editId={editId} />;
		}

		if (page === "byteam") {
			return <SearchByTeam />;
		}

		if (page === "byrole") {
			return <SearchByRole />;
		}
	};

	return (
		<div>
			<Navbar goToPage={goToPage} />

			<div className="container mt-4">{renderPage()}</div>
		</div>
	);
}

export default App;
