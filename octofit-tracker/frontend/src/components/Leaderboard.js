
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
	}
	return 'http://localhost:8000/api/leaderboard/';
};

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching leaderboard from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched leaderboard:', results);
				setLeaderboard(results);
			})
			.catch(err => console.error('Error fetching leaderboard:', err));
	}, []);

	return (
		<div className="card p-4">
			<h2 className="mb-4">Leaderboard</h2>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead className="table-success">
						<tr>
							<th>#</th>
							<th>Team</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{leaderboard.map((l, idx) => (
							<tr key={l._id || idx}>
								<td>{idx + 1}</td>
								<td>{l.team}</td>
								<td>{l.points}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Leaderboard;
