import React, { Component } from 'react';
import * as RecordApi from '../utils/RecordApi'
export default class RecordForm extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			date: "",
			title: "",
			ammount: ""
		})
	}

	valid() {
		return this.state.date && this.state.title && this.state.ammount
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value })
	}
	handleSubmit(event) {
		event.preventDefault();
		RecordApi.create({
			date: this.state.date,
			title: this.state.title,
			ammount: Number.parseInt(this.state.ammount, 10)
		}).then(
			response => {
				this.props.handleNewRecords(response.data)
				this.setState({
					date: "",
					title: "",
					ammount: ""
				})
			}
		).catch(
			error => console.log(error)
		)
	}
	render() {
		return (
			<form action="" className="form-inline mb1" onSubmit={this.handleSubmit.bind(this)}>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder="Date" onChange={this.handleChange.bind(this)} name="date" value={this.state.date} />
				</div>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder="Title" onChange={this.handleChange.bind(this)} name="title" value={this.state.title} />
				</div>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder="Ammount" onChange={this.handleChange.bind(this)} name="ammount" value={this.state.ammount} />
				</div>
				<button className="btn btn-primary" disabled={!this.valid()}>Create Reacord</button>
			</form>
		);
	}
}

