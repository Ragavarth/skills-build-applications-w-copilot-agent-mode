
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/workouts/`;
	}
	return 'http://localhost:8000/api/workouts/';
};

function Workouts() {
	const [workouts, setWorkouts] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching workouts from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched workouts:', results);
				setWorkouts(results);
			})
			.catch(err => console.error('Error fetching workouts:', err));
	}, []);

	return (
		<div className="card p-4">
			<h2 className="mb-4">Workouts</h2>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead className="table-danger">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Suggested For</th>
						</tr>
					</thead>
					<tbody>
						{workouts.map((w, idx) => (
							<tr key={w._id || idx}>
								<td>{idx + 1}</td>
								<td>{w.name}</td>
								<td>{w.description}</td>
								<td>{w.suggested_for}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Workouts;
