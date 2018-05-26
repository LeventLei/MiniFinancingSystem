import React from 'react';

const AmmountBox = ({ text, type, ammount }) => {
	return (
		<div className="col">
			<div className="card">
				<div className={`card-header bg-${type} text-white`}>
					{text}
				</div>
				<div className="card-body">{ammount}</div>
			</div>
		</div>
	)
}

export default AmmountBox;