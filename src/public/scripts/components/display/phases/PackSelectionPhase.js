'use strict';

import React from 'react';
import Component from '../../Component';

export default class PackSelectionPhase extends Component {
	render() {
		let state = this.state.gameState;

		return (
			<div>
				<div className="showGameCode">Game Code: <span>{ state.gameCode }</span></div>
				<div className="choosingTime">
					<h3 className="title">{ state.players[0].displayName } is selecting the question packs.</h3>
				</div>
			</div>
		);
	}
}