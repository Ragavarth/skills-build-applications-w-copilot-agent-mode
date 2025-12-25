
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/activities/`;
	}
	return 'http://localhost:8000/api/activities/';
};

function Activities() {
	const [activities, setActivities] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching activities from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched activities:', results);
				setActivities(results);
			})
			.catch(err => console.error('Error fetching activities:', err));
	}, []);

	return (
		<div className="card p-4">
			<h2 className="mb-4">Activities</h2>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead className="table-primary">
						<tr>
							<th>#</th>
							<th>Activity Type</th>
							<th>User Email</th>
							<th>Duration (min)</th>
						</tr>
					</thead>
					<tbody>
						{activities.map((a, idx) => (
							<tr key={a._id || idx}>
								<td>{idx + 1}</td>
								<td>{a.activity_type}</td>
								<td>{a.user_email}</td>
								<td>{a.duration}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Activities;
