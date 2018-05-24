import React, { Component } from 'react';
import Record from './Record'
import axios from 'axios'
class Records extends Component {
	constructor() {
		super();
		this.state = {
			error: null,
			records: [],
			isLoaded: false
		}
	}
	componentDidMount() {
		axios.get('http://5b068722ff98d70014f3883b.mockapi.io/records').then(
			response => this.setState({
				records: response.data,
				isLoaded: true
			})
		).catch(
			error => this.setState({
				isLoaded: true,
				error
			}))
	}
	render() {
		const { error, isLoaded, records } = this.state
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<h2>Records</h2>
					<table className="table table-bordered">
						<thead>
							<tr>
								<td>Date</td>
								<td>Title</td>
								<td>Ammount</td>
							</tr>
						</thead>
						<tbody>
							{records.map((record, i) => <Record key={record.id} {...record} />)}
						</tbody>
					</table>
				</div>
			);
		}

	}
}

export default Records;
