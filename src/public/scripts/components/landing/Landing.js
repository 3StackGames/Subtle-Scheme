'use strict';

import React from 'react';

import { Link } from 'react-router';

export default class Landing extends React.Component {
	render() {
		return (
	        <div className="index-page">
                <h1>Subtle Scheme</h1>
        		<div><Link to="/display" className="btn">Create Room</Link></div>
        		<div><Link to="/gamepad" className="btn">Join Room</Link></div>
			</div>
		);
	}
}