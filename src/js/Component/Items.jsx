import React from "react";
import PropTypes from "prop-types";

const Items = props => {
	return (
		<div className="p-3">
			<li className="col-xl-12 bg-light">{props.name}</li>
		</div>
	);
};

Items.propTypes = {
	name: PropTypes.string
};

export default Items;
