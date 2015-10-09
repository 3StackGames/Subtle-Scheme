'use strict';

import React from 'react';
import Component from '../../Component';

export default class VotePhase extends Component {
	render() {
		let state = this.state.gameState;
		let currentQuestion = state.currentQuestion;

		return (
			<div>
				<div className="showGameCode">Game Code: <span>{ state.gameCode }</span></div>
				<div className="choosingTime">
					<h3 className="title">{ currentQuestion.question }</h3>
					<WaitingPlayerChoosing
						players={ state.players }
						currentQuestion={ currentQuestion }
						lies={ state.lies }
					/>
				</div>
			</div>
		);
	}
}

class WaitingPlayerChoosing extends React.Component {
	render() {
		// return <div />;

		let players = this.props.players;
		let currentQuestion = this.props.currentQuestion;
		let lies = this.props.lies;

		let finishedUsers = 0;

		var choices = [
			<div key="0" className="col-xs-4">
				<div className="choiceItems">{currentQuestion.answer}</div>
			</div>
		];

		for(let i = 0; i < lies.length; i++)
		{
			choices.push(
				<div key={ i + 1 } className="col-xs-4">
					<div className="choiceItems">{ lies[i].lie }</div>
				</div>
			);
		}

		let listPlayers = players.map((player, key) => {
			let displayName = player.displayName;
			let active = "";

			if(this.contains(currentQuestion.believers, displayName))
			{
				active = "active";
				finishedUsers++;
			} else {
				for(let i = 0; i < lies.length; i++)
				{
					if(this.contains(lies[i].believers, displayName))
					{
						active = "active";
						finishedUsers++;
						break;
					}
				}
			}

			return (
				<div key={ key } className={ active }>
					<div className="playerLobbyItem"></div>
				</div>
			);
		});

		// choices = shuffle(choices);

		let finishElement;

		if(finishedUsers == players.length)
		{
			finishElement = <div className="finished">Everyone has chosen!</div>;

			// this.endChoosing();
		}

		return (
			<div className="relative">
				<div className="choiceList row">{ choices }</div>
				{ finishElement }
				<div className="WaitingPlayerChoosing playerColor">{ listPlayers }</div>
			</div>
		);
	}

	contains(array, value) {
		for(let i = 0; i < array.length; i++)
		{
			if(array[i] === value) return true;
		}

		return false;
	}
}