import React, { Component } from 'react';
import Record from './Record'
import RecordForm from './RecordForm'
import * as RecordsApi from '../utils/RecordApi'
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
		RecordsApi.getAll().then(
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
	addRecord(record) {
		console.log(record);
		this.setState({
			error: null,
			records: [
				...this.state.records,
				record
			],
			isLoaded: true
		})
	}
	updateRecord(record, data) {
		const recordIndex = this.state.records.indexOf(record);
		const newRecords = this.state.records.map((item, index) => {
			if (index !== recordIndex) {
				return item;
			}
			return {
				...item,
				...data
			}
		})
		this.setState({
			records: newRecords
		})
	}
	render() {
		const { error, isLoaded, records } = this.state
		let recordsComponent = ''
		if (error) {
			recordsComponent = <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			recordsComponent = <div>Loading...</div>;
		} else {
			recordsComponent = (
				<table className="table table-bordered">
					<thead>
						<tr>
							<td>Date</td>
							<td>Title</td>
							<td>Ammount</td>
						</tr>
					</thead>
					<tbody>
						{records.map((record, i) => <Record key={record.id} record={record} handleEditRecord={this.updateRecord.bind(this)} />)}
					</tbody>
				</table>
			);
		}
		return (
			<div>
				<h2>Records</h2>
				<RecordForm handleNewRecords={this.addRecord.bind(this)} />
				{recordsComponent}
			</div>
		)
	}
}

export default Records;
