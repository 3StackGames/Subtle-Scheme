'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class EndPhase extends Component {
  render() {
    let state = this.state.gameState;

    if(state.players[0].displayName === state.currentPlayer.displayName)
    {
      return (
        <div>
          <div className="small-header">GameOver</div>
          <button onClick={ this.restartGame } className="btn btn-danger">Restart Game</button>
        </div>
      );
    }

    return (
      <div>
        <div className="small-header">GameOver</div>
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