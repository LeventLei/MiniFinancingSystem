import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Record extends Component {

	render() {
		return (
			<tr>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.title}</td>
				<td>{this.props.record.ammount}</td>
			</tr>
		);
	}
}
Record.PropTypes = {
	date: PropTypes.string,
	title: PropTypes.string,
	ammount: PropTypes.number
}

