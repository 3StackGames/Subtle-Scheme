'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class EndPhase extends Component {
	render() {
		return (
	        <div>
	        	<button onClick={ this.keepPlaying } className="btn">Move On</button>
	        	<button onClick={ this.restartGame } className="btn btn-danger">Restart Game</button>
	        </div>
        );
	}

	@autobind
	keepPlaying() {
		let state = this.state.gameState;
		let gameCode = state.gameCode;
		let player = state.currentPlayer.displayName;
		this.engine.gamepadInput({ gameCode, player, moveOn: true });
	}

	@autobind
	restartGame() {
		let state = this.state.gameState;
		let gameCode = state.gameCode;
		let player = state.currentPlayer.displayName;

		this.engine.gamepadInput({ gameCode, player, restart: true });
	}
}