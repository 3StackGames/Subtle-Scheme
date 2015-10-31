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
                  <CurrentPhase gameState={ state } updatePlayer={ this.setPlayer } shufflePlayers={ this.shufflePlayers } />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentPlayer = this.currentPlayer;
    let players = nextState.gameState.players;

    let playerJoined = currentPlayer.playerJoined;
    let displayName = currentPlayer.displayName;

    if(currentPlayer.playerJoined !== false || players == undefined) return;

    for(let i = 0; i < players.length; i++)
    {
      if(players[i].displayName !== displayName) continue;

      this.currentPlayer = { displayName, playerJoined: true };
      this.forceUpdate();
      break;
    }
  }

  @autobind
  setPlayer(player) {
    this.currentPlayer = player;
    this.forceUpdate();
  }

  @autobind
  shufflePlayers(playerCount) {
    return this.props.shufflePlayers(playerCount + 1);
  }
}