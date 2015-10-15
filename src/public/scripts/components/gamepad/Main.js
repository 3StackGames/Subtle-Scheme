'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import phases from './phases';
import Component from '../Component';

export default class Main extends Component {
	constructor(props) {
		super(props);

		this.currentPlayer = {};
	}

	render() {
		let state = this.state.gameState;

		state.currentPlayer = this.currentPlayer;

		if(state.currentPhase == undefined) state.currentPhase = { phaseName: "InitialPhase" };
		let CurrentPhase = phases[state.currentPhase.phaseName] || phases.InitialPhase;

		return (
		    <div className="gamepad-page">
		        <div className="container">
		            <div className="row">
		                <div className="col-xs-12">
		                    <h1>Subtle Scheme</h1>
		                    <div id="gamepad">
								<CurrentPhase gameState={ state } updatePlayer={ this.setPlayer } />
							</div>
		                </div>
		            </div>
		        </div>
		    </div>
		);
	}

	@autobind
	setPlayer(player) {
		this.currentPlayer = player;
		this.forceUpdate();
	}
}