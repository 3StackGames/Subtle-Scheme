'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import phases from './phases';
import Component from '../Component';

export default class Main extends Component {
  render() {
    let state = this.state.gameState;

    if(state.currentPhase == undefined) state.currentPhase = { phaseName: "InitialPhase" };
    let CurrentPhase = phases[state.currentPhase.phaseName] || phases.InitialPhase;

    return (
      <div className="display-page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Subtle Scheme</h1>
              <div id="display">
                <CurrentPhase gameState={ this.state.gameState } shufflePlayers={ this.shufflePlayers } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  shufflePlayers(playerCount) {
    return this.props.shufflePlayers(playerCount + 1);
  }
}