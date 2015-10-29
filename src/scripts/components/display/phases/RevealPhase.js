'use strict';

import React from 'react';
import Component from '../../Component';

export default class RevealPhase extends Component {
	constructor(props) {
		super(props);

		this.revealing = 0;
	}

	render() {
		let state = this.state.gameState;
		let lies = state.lies;
		let currentQuestion = state.currentQuestion;
		this.revealing++;

		let showAnswer;
		let gameCode = state.gameCode;
		let players = state.players;

		if(this.revealing > lies.length + 1 || state.displayAction)
		{
			if(!state.displayAction) this.engine.displayActionComplete({ gameCode });

			return (
				<div>
					<div className="showGameCode">Game Code: <span>{ gameCode }</span></div>
					<DisplayScore players={ players } />
					<div className="small-text text-center">(Look at your gamepad screen!)</div>
				</div>
			);
		}
		else if(this.revealing > lies.length)
		{
			showAnswer = this.revealRealAnswer(currentQuestion);
		}
		else if(this.revealing <= lies.length)
		{
			while(lies[this.revealing - 1].believers.length < 1)
			{
				this.revealing++;
				if(this.revealing > lies.length)
				{
					showAnswer = this.revealRealAnswer(currentQuestion);
					break;
				}
			}

			if(this.revealing <= lies.length)
			{
				showAnswer = this.revealLie(lies[this.revealing - 1]);
			}
		}

		this.revealTimer();

		return (
			<div>
				<div className="showGameCode">Game Code: <span>{ gameCode }</span></div>
				<div className="revealingTime">
					<h3 className="title">{ state.currentQuestion.question }</h3>
					<div className="choiceList row">{ showAnswer }</div>
				</div>
			</div>
		);
	}

	revealRealAnswer(currentQuestion) {
		let scrubs = currentQuestion.believers.map((player, key) => {
			return (
				<div key={ key } className={"scrub player_" + this.playerId(player)} style={ this.angle() }>
					{ player }
				</div>
			);
		});

		return (
			<div className="col-xs-12">
				<div className="singleChoice answer">
					<div className="showAuthor">
						Correct Answer:
					</div>
					{ currentQuestion.answer }
				</div>
				<div className="showScrubs">{ scrubs }</div>
			</div>
		);
	}

	revealLie(lie) {
		let scrubs = lie.believers.map((player, key) => {
			return (
				<div key={ key } className={"scrub player_" + this.playerId(player)} style={ this.angle() }>
					{ player }
				</div>
			);
		});

		return (
			<div className="col-xs-12">
				<div className={"singleChoice player_" + this.playerId(lie.liar)}>
					{ lie.lie }
					<div className="showAuthor">
						By: { lie.liar }
					</div>
				</div>
				<div className="showScrubs">
					{ scrubs }
				</div>
			</div>
		);
	}

	angle() {
		let randomAngle = Math.floor((Math.random() * 14) - 7);
		return {
			transform: 'rotate('+ randomAngle +'deg)'
		};
	}

	playerId(playerName) {
		let players = this.state.gameState.players;

		for(let i = 0; i < players.length; i++)
		{
			if(players[i].displayName === playerName) return i + 1;
		}

		return 0;
	}

	revealTimer() {
		setTimeout(() => {
			this.forceUpdate();
		}, 2000);
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
