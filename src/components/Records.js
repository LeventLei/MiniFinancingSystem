import React, { Component } from 'react';
import Record from './Record'
class Records extends Component {
	constructor() {
		super();
		this.state = {
			records: [
				{ "id": 1, "date": "2018-05-24", "title": "收入", "ammount": 20 },
				{ "id": 2, "date": "2018-05-25", "title": "支出", "ammount": 199 },
				{ "id": 3, "date": "2018-05-26", "title": "支出", "ammount": 1991 }
			]
		}
	}
	render() {
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
						{this.state.records.map((record, i) => <Record key={record.id} record={record} />)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Records;
