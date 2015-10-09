'use strict';

import React from 'react';
import Component from '../../Component';

export default class LiePhase extends Component {
	constructor(props) {
		super(props);

		this.finishedInstruction = false;
	}

	componentDidMount() {
		setTimeout(() => {
			this.engine.displayActionComplete();
			this.finishedInstruction = true;
			this.forceUpdate();
		}, 3000);
	}

	render() {
		let state = this.state.gameState;
		let instruction = state.currentInstruction;
		let currentQuestion = state.currentQuestion;

		let displayQuestion = (
			<div>
				<div className="text-center to-fool">{ instruction.trickBonusPointValue } for everyone you fool</div>
				<div className="text-center for-truth">{ instruction.correctAnswerPointValue } for finding the truth</div>
			</div>
		);

		if(this.finishedInstruction)
		{
			displayQuestion = (
				<div>
					<div className="lyingTime">
						<h3 className="title">{ currentQuestion.question }</h3>
						<WaitingPlayerLies players={ state.players } lies={ state.lies }/>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className="showGameCode">Game Code: <span>{ state.gameCode }</span></div>
				{ displayQuestion }
			</div>
		);
	}
}

class WaitingPlayerLies extends React.Component {
	// endLies() {
	//     setTimeout(function() {
	//         socket.emit('done lying');
	//     }, 1000)
	// }

	render() {
		let players = this.props.players;
		let lies = this.props.lies;

		let finishedUsers = 0;

		let listPlayers = players.map((player, key) => {
			let displayName = player.displayName;
			let active = "";

			for(let i = 0; i < lies.length; i++)
			{
				let lie = lies[i];
				if(displayName == lie.liar)
				{
					active = "active";
					finishedUsers++;
					break;
				}
			}

			return (
				<div key={ key } className={ active }>
					<div className="playerLobbyItem"></div>
				</div>
			);
		});

		let finishElement;

		if(finishedUsers == players.length) {
			finishElement = <div className="finished">All lies have been entered!</div>;

			// this.endLies();
		}

		return (
			<div className="relative">
				{ finishElement }
				<div className="WaitingPlayerLies playerColor">
					{ listPlayers }
				</div>
			</div>
		);
	}
}