import React, { useState, useEffect } from "react";
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

const initialForm = {
	playerName: "",
	jerseyNo: "",
	role: "",
	totalMatch: "",
	teamName: "",
	countryName: "",
	description: "",
};

function AddPlayer(props) {
	const [formValues, setFormValues] = useState(initialForm);
	const [message, setMessage] = useState("");
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (props.editId) {
			playerService
				.getPlayerById(props.editId)
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
					setLoaded(true);
				})
				.catch(() => {
					setMessage("Error loading player data");
					setLoaded(true);
				});
		} else {
			setLoaded(true);
		}
	}, [props.editId]);

	const handleSubmit = (values, { setSubmitting }) => {
		const playerData = {
			...values,
			jerseyNo: Number(values.jerseyNo),
			totalMatch: Number(values.totalMatch),
		};

		if (props.editId) {
			playerService
				.updatePlayer(props.editId, playerData)
				.then(() => {
					setMessage("Player updated successfully!");
					setSubmitting(false);
					setTimeout(() => props.goToPage("all"), 1500);
				})
				.catch(() => {
					setMessage("Error updating player");
					setSubmitting(false);
				});
		} else {
			playerService
				.createPlayer(playerData)
				.then(() => {
					setMessage("Player added successfully!");
					setSubmitting(false);
					setTimeout(() => props.goToPage("all"), 1500);
				})
				.catch(() => {
					setMessage("Error adding player");
					setSubmitting(false);
				});
		}
	};

	if (!loaded) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container">
			<h2 className="mb-4">
				{props.editId ? "Edit Player" : "Add New Player"}
			</h2>

			{message && <div className="alert alert-info">{message}</div>}

			<div className="border p-4">
				<Formik
					initialValues={formValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ isSubmitting }) => (
						<Form>
							<div className="mb-3">
								<label className="form-label">
									Player Name
								</label>

								<Field
									type="text"
									name="playerName"
									className="form-control"
								/>

								<ErrorMessage
									name="playerName"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="row">
								<div className="col-md-6 mb-3">
									<label className="form-label">
										Jersey Number
									</label>

									<Field
										type="number"
										name="jerseyNo"
										className="form-control"
									/>

									<ErrorMessage
										name="jerseyNo"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="col-md-6 mb-3">
									<label className="form-label">Role</label>

									<Field
										as="select"
										name="role"
										className="form-control"
									>
										<option value="">Select Role</option>
										<option value="Batsman">Batsman</option>
										<option value="Bowler">Bowler</option>
										<option value="Keeper">Keeper</option>
										<option value="All Rounder">
											All Rounder
										</option>
									</Field>

									<ErrorMessage
										name="role"
										component="div"
										className="text-danger"
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-6 mb-3">
									<label className="form-label">
										Team Name
									</label>

									<Field
										type="text"
										name="teamName"
										className="form-control"
									/>

									<ErrorMessage
										name="teamName"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="col-md-6 mb-3">
									<label className="form-label">
										Country
									</label>

									<Field
										as="select"
										name="countryName"
										className="form-control"
									>
										<option value="">Select Country</option>
										<option value="India">India</option>
										<option value="Australia">
											Australia
										</option>
										<option value="England">England</option>
									</Field>

									<ErrorMessage
										name="countryName"
										component="div"
										className="text-danger"
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="form-label">
									Total Matches
								</label>

								<Field
									type="number"
									name="totalMatch"
									className="form-control"
								/>

								<ErrorMessage
									name="totalMatch"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">
									Description
								</label>

								<Field
									as="textarea"
									name="description"
									className="form-control"
									rows="3"
								/>

								<ErrorMessage
									name="description"
									component="div"
									className="text-danger"
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Please wait..."
									: props.editId
										? "Update Player"
										: "Add Player"}
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
	);
}

export default AddPlayer;
