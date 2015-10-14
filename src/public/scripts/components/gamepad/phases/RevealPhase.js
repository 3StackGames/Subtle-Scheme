'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import { events } from '../../../digital-compass/constants';

export default class RevealPhase extends React.Component {
	constructor(props) {
		super(props);

		this.engine.socket.on(events.DISPLAY_ACTION_COMPLETE, this.actionButton);
		this.displayButtons = false;
	}

	render() {
		if(this.displayButtons)
		{
			return (
	        	<div>
	        		
	        	</div>
			);
		}

		return <div className="small-header">Look at the display!</div>;
	}

	@autobind
	actionButton() {
		this.displayButtons = true;
		this.forceUpdate();
	} 
}