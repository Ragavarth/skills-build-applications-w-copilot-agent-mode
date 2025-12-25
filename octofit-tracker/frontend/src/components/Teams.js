
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/teams/`;
	}
	return 'http://localhost:8000/api/teams/';
};

function Teams() {
	const [teams, setTeams] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching teams from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched teams:', results);
				setTeams(results);
			})
			.catch(err => console.error('Error fetching teams:', err));
	}, []);

	return (
		<div className="card p-4">
			<h2 className="mb-4">Teams</h2>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead className="table-info">
						<tr>
							<th>#</th>
							<th>Team Name</th>
						</tr>
					</thead>
					<tbody>
						{teams.map((t, idx) => (
							<tr key={t._id || idx}>
								<td>{idx + 1}</td>
								<td>{t.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Teams;
