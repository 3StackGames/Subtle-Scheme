'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class RevealPhase extends Component {
  render() {
    let state = this.state.gameState;

    if(state.players[0].displayName === state.currentPlayer.displayName && state.displayComplete)
    {
      return <button onClick={ this.keepPlaying } className="btn">Move On</button>;
    }

    return <div className="small-header">Look at the display!</div>;
  }

  @autobind
  keepPlaying() {
    document.getElementsByClassName('btn')[0].disabled = true;
    let state = this.state.gameState;
    let gameCode = state.gameCode;
    let player = state.currentPlayer.displayName;
    this.engine.gamepadInput({ gameCode, player, moveOn: true });
  }
}