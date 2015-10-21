'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class LiePhase extends Component {
  constructor(props) {
    super(props);

    this.finishedInstruction = false;
    this.sentLie = false;
    this.alert;
  }

  render() {
    let state = this.state.gameState;
    let currentQuestion = state.currentQuestion;

    let displayQuestion = (
      <div>
        <div className="small-header">Look at the display!</div>
      </div>
    );

    if(this.finishedInstruction)
    {
      displayQuestion = (
        <div className="questionTime">
          <div className="title">{ currentQuestion.question }</div>
          <form onSubmit={ this.submitLie }>
            { this.alert ? <div className="notice-red">{ this.alert }</div> : '' }
            <div className="form-group">
              <input type="text" className="form-control" ref="lie" placeholder="Lie!" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">Enter Lie</button>
            </div>
          </form>
        </div>
      );
    }

    if(this.sentLie) displayQuestion = <div className="notice">Waiting for other players...</div>;

    return displayQuestion;
  }

  @autobind
  displayActionComplete() {
    if(!this.canUpdate) return;
    
    this.finishedInstruction = true;
    this.forceUpdate();
  }

  @autobind
  submitLie(e) {
    e.preventDefault();
    this.alert = undefined;

    let state = this.state.gameState;
    let lie = this.refs.lie.getDOMNode().value.trim();

    if(lie.length == 0)
    {
      this.alert = "Please enter in a LIE!";
      this.forceUpdate();
      return;
    }

    let answer = state.currentQuestion.answer;
    let cleanedLie = lie.toLowerCase().replace(/\s/g, '');

    if(cleanedLie == answer.toLowerCase().replace(/\s/g, ''))
    {
      this.alert = "You picked either a lie or a truth! Please enter something else.";
    }

    let otherLies = state.lies;

    for(let i = 0; i < otherLies.length; i++)
    {
      let otherLie = otherLies[i].lie.toLowerCase().replace(/\s/g, '');

      if(cleanedLie == otherLie)
      {
        this.alert = "You picked either a lie or a truth! Please enter something else.";
        break;
      }
    }

    if(this.alert)
    {
      this.forceUpdate();
      return;
    }

    this.sentLie = true;

    let player = state.currentPlayer.displayName;
    let gameCode = state.gameCode;
    this.engine.gamepadInput({ lie, player, gameCode });
  }
}