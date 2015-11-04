'use strict';

import React from 'react';
import Component from '../../Component';

export default class EndPhase extends Component {
	render() {
		let state = this.state.gameState;
		let players = state.players;
		let gameCode = state.gameCode;

		return (
			<div>
				<div className="showGameCode">Game Code: <span>{ gameCode }</span></div>
				<h3 className="title">Game Over!</h3>
				<DisplayScore players={ players } />
				<div className="text-center">
					<div className="small-text">Keep Playing?</div>
					<div className="small-text">(Look at your gamepad screen!)</div>
				</div>
			</div>
		);
	}
}

class DisplayScore extends React.Component {
	render() {
		var players = this.props.players;

		players.sort(function(a, b) {
			if (a.score < b.score) {
				return 1;
			}

			return 0;
		});

		let playerList = this.props.players.map((player, key) => {
			return (
				<div key={ key } className={"playerBoardItem player_" + this.playerId(player.displayName)}>
					<div className="playerName">{ player.displayName }</div>
					<div className="totalPoints">{ player.score }</div>
					<div className="clear"></div>
				</div>
			);
		});
		return <div className="scoreBoard">{ playerList }</div>;
	}

	playerId(playerName) {
		let players = this.props.players;

		for(let i = 0; i < players.length; i++)
		{
			if(players[i].displayName === playerName) return i + 1;
		}

		return 0;
	}
}