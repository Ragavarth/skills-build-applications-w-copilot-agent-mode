
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/users/`;
	}
	return 'http://localhost:8000/api/users/';
};

function Users() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching users from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched users:', results);
				setUsers(results);
			})
			.catch(err => console.error('Error fetching users:', err));
	}, []);

	return (
		<div className="card p-4">
			<h2 className="mb-4">Users</h2>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead className="table-warning">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Team</th>
						</tr>
					</thead>
					<tbody>
						{users.map((u, idx) => (
							<tr key={u._id || idx}>
								<td>{idx + 1}</td>
								<td>{u.name}</td>
								<td>{u.email}</td>
								<td>{u.team}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Users;
