'use strict';

import React from 'react';
import autobind from 'autobind-decorator';

import Component from '../../Component';

export default class InitialPhase extends Component {
	componentWillMount() {
		super.componentWillMount();
		this.engine.displayJoin();
	}

	render() {
		let state = this.state.gameState;
		let players = state.players || [];

		return (
			<div>
				<div className="small-header">Waiting for players ({ players.length }/8)...</div>
				<div className="joinNotice">
					<div className="title">
						The game code is : <div className="gamecode">{ state.gameCode }</div>
					</div>

					<div className="content">
						<p>Join on your phone or tablet at <span className="everybody">http://SubtleSche.me/</span></p>
						<p>Press <span className="everybody">EVERYBODY IS IN</span> to start the game.</p>
					</div>
					<DisplayLobby players={ players } />
				</div>
			</div>
		);
	}
}

class DisplayLobby extends React.Component {
	render() {
		let players = this.props.players;

		let listPlayers = players.map((player, key) => {
			return (
				<div className="col-xs-4 active" key={ key }>
					<div className="playerLobbyItem">{ player.displayName }</div>
				</div>
			);
		});

		for(var i = players.length; i <= 7; i++)
		{
			listPlayers.push(
				<div className="col-xs-4" key={ i }>
					<div className="playerLobbyItem">?</div>
				</div>
			)
		}

		return (
			<div className="row playerLobby playerColor">
				{ listPlayers }
			</div>
		)
	}
}