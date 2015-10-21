'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class VotePhase extends Component {
  constructor(props) {
    super(props);

    this.rngArray = props.shufflePlayers(props.gameState.players.length);
    this.selectedAnswer = false;
  }

  render() {
    let state = this.state.gameState;
    let currentQuestion = state.currentQuestion;
    let lies = state.lies;
    let displayName = state.currentPlayer.displayName;

    let choices = [<Button key="0" selectAnswer={ this.selectAnswer } answer={ currentQuestion.answer }/>];

    for(let i = 0; i < lies.length; i++)
    {
      let lie = lies[i];
      if(displayName === lie.liar) continue;
      choices.push(<Button key={ i + 1 } selectAnswer={ this.selectAnswer } answer={ lie.lie }/>);
    }

    choices = this.shuffleOptions(choices, this.rngArray);

    if(this.selectedAnswer) choices = <div className="notice">Waiting for other players...</div>;

    return (
      <div className="choiceList">{ choices }</div>
    );
  }

  @autobind
  selectAnswer(answer) {
    let state = this.state.gameState;
    let player = state.currentPlayer.displayName;
    let gameCode = state.gameCode;

    this.engine.gamepadInput({ answer, player, gameCode });
    this.selectedAnswer = true;
    this.forceUpdate();
  }

  shuffleOptions(choices, array) {
    return array.map((v) => {
      return choices[v];
    });
  }
}

class Button extends React.Component {
  render() {
    let answer = this.props.answer;
    return <button onClick={ this.buttonHandle } className="btn choiceItems">{ answer }</button>;
  }

  @autobind
  buttonHandle() {
    let answer = this.props.answer;
    this.props.selectAnswer(answer);
  }
}