import React, { Component } from 'react';
import Record from './Record'
import RecordForm from './RecordForm'
import AmmountBox from './AmmountBox'
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
	deleteRecord(record) {
		console.log(record)
		const recordIndex = this.state.records.indexOf(record)
		const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
		this.setState({
			records: newRecords
		})
	}
	credit() {
		let credits = this.state.records.filter((record) => {
			return record.ammount >= 0
		})
		return credits.reduce((prev, curr) => {
			return prev + Number.parseInt(curr.ammount, 0)
		}, 0)
	}

	debit() {
		let debits = this.state.records.filter((record) => {
			return record.ammount < 0
		})
		return debits.reduce((prev, curr) => {
			return prev + Number.parseInt(curr.ammount, 0)
		}, 0)
	}

	balance() {
		return this.credit() + this.debit()
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
				<table className="table table-bordered mt-1">
					<thead>
						<tr>
							<td>Date</td>
							<td>Title</td>
							<td>Ammount</td>
							<td>Options</td>
						</tr>
					</thead>
					<tbody>
						{records.map((record, i) =>
							<Record
								key={record.id}
								record={record}
								handleEditRecord={this.updateRecord.bind(this)}
								handleDelete={this.deleteRecord.bind(this)}
							/>
						)}
					</tbody>
				</table>
			);
		}
		return (
			<div>
				<h2 className="text-center mt-2 mb-2">Mini Account Tool</h2>
				<div className="row mb-3">
					<AmmountBox text="Credit" type="success" ammount={this.credit()} />
					<AmmountBox text="Debit" type="danger" ammount={this.debit()} />
					<AmmountBox text="Blance" type="info" ammount={this.balance()} />
				</div>
				<RecordForm handleNewRecords={this.addRecord.bind(this)} />
				{recordsComponent}
			</div>
		)
	}
}

export default Records;
