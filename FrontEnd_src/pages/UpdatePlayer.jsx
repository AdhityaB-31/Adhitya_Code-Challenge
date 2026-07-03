import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import playerService from "../services/playerService";

const validationSchema = Yup.object({
	playerName: Yup.string().required("Player name is required"),
	jerseyNo: Yup.number()
		.typeError("Must be a number")
		.required("Jersey number is required")
		.min(1, "Must be at least 1"),
	role: Yup.string().required("Please select a role"),
	totalMatch: Yup.number()
		.typeError("Must be a number")
		.required("Total matches is required")
		.min(0, "Cannot be negative"),
	teamName: Yup.string().required("Team name is required"),
	countryName: Yup.string().required("Please select a country"),
	description: Yup.string().required("Description is required"),
});

const emptyForm = {
	playerName: "",
	jerseyNo: "",
	role: "",
	totalMatch: "",
	teamName: "",
	countryName: "",
	description: "",
};

function UpdatePlayer(props) {
	const [searchId, setSearchId] = useState(props.editId ? String(props.editId) : "");
	const [formValues, setFormValues] = useState(emptyForm);
	const [playerLoaded, setPlayerLoaded] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("info");
	const [currentId, setCurrentId] = useState(props.editId || null);

	React.useEffect(() => {
		if (props.editId) {
			fetchPlayer(props.editId);
		}
	}, [props.editId]);

	const fetchPlayer = (id) => {
		setMessage("");
		setPlayerLoaded(false);
		playerService
			.getPlayerById(id)
			.then((res) => {
				setFormValues({
					playerName: res.data.playerName,
					jerseyNo: String(res.data.jerseyNo),
					role: res.data.role,
					totalMatch: String(res.data.totalMatch),
					teamName: res.data.teamName,
					countryName: res.data.countryName,
					description: res.data.description,
				});
				setCurrentId(id);
				setPlayerLoaded(true);
			})
			.catch(() => {
				setMessage("Player not found with ID: " + id);
				setMessageType("danger");
				setPlayerLoaded(false);
			});
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchId || isNaN(searchId)) {
			setMessage("Please enter a valid Player ID.");
			setMessageType("warning");
			return;
		}
		fetchPlayer(Number(searchId));
	};

	const handleSubmit = (values, { setSubmitting }) => {
		const playerData = {
			...values,
			jerseyNo: Number(values.jerseyNo),
			totalMatch: Number(values.totalMatch),
		};

		playerService
			.updatePlayer(currentId, playerData)
			.then(() => {
				setMessage("Player updated successfully!");
				setMessageType("success");
				setSubmitting(false);
				setTimeout(() => props.goToPage("all"), 1500);
			})
			.catch(() => {
				setMessage("Error updating player. Please try again.");
				setMessageType("danger");
				setSubmitting(false);
			});
	};

	return (
		<div className="container">
			<h2 className="mb-4">Update Player</h2>

			<div className="card mb-4">
				<div className="card-header fw-bold">
					Step 1 — Enter Player ID to Load Details
				</div>
				<div className="card-body">
					<form onSubmit={handleSearch} className="d-flex gap-3 align-items-end">
						<div className="flex-grow-1">
							<label className="form-label">Player ID</label>
							<input
								type="number"
								className="form-control"
								placeholder="e.g. 1"
								value={searchId}
								onChange={(e) => setSearchId(e.target.value)}
								min="1"
							/>
						</div>
						<button type="submit" className="btn btn-warning">
							Load Player
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

			{playerLoaded && (
				<div className="card">
					<div className="card-header fw-bold">
						Step 2 — Edit Details for Player ID: {currentId}
					</div>
					<div className="card-body">
						<Formik
							initialValues={formValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							enableReinitialize
						>
							{({ isSubmitting }) => (
								<Form>
									<div className="mb-3">
										<label className="form-label">Player Name</label>
										<Field type="text" name="playerName" className="form-control" />
										<ErrorMessage name="playerName" component="div" className="text-danger" />
									</div>

									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Jersey Number</label>
											<Field type="number" name="jerseyNo" className="form-control" />
											<ErrorMessage name="jerseyNo" component="div" className="text-danger" />
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label">Role</label>
											<Field as="select" name="role" className="form-control">
												<option value="">Select Role</option>
												<option value="Batsman">Batsman</option>
												<option value="Bowler">Bowler</option>
												<option value="Keeper">Keeper</option>
												<option value="All Rounder">All Rounder</option>
											</Field>
											<ErrorMessage name="role" component="div" className="text-danger" />
										</div>
									</div>

									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Team Name</label>
											<Field type="text" name="teamName" className="form-control" />
											<ErrorMessage name="teamName" component="div" className="text-danger" />
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label">Country</label>
											<Field as="select" name="countryName" className="form-control">
												<option value="">Select Country</option>
												<option value="India">India</option>
												<option value="Australia">Australia</option>
												<option value="England">England</option>
											</Field>
											<ErrorMessage name="countryName" component="div" className="text-danger" />
										</div>
									</div>

									<div className="mb-3">
										<label className="form-label">Total Matches</label>
										<Field type="number" name="totalMatch" className="form-control" />
										<ErrorMessage name="totalMatch" component="div" className="text-danger" />
									</div>

									<div className="mb-3">
										<label className="form-label">Description</label>
										<Field as="textarea" name="description" className="form-control" rows="3" />
										<ErrorMessage name="description" component="div" className="text-danger" />
									</div>

									<button
										type="submit"
										className="btn btn-primary"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Updating..." : "Update Player"}
									</button>

									<button
										type="button"
										className="btn btn-secondary ms-2"
										onClick={() => props.goToPage("all")}
									>
										Cancel
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</div>
	);
}

export default UpdatePlayer;
