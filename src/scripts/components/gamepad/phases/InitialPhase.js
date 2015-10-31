'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class InitialPhase extends Component {
  render() {
    let state = this.state.gameState;

    if(state.currentPlayer.playerJoined)
    {
      let everyoneIsIn;
      if(state.players[0].displayName === state.currentPlayer.displayName)
      {
        everyoneIsIn = <button onClick={ this.everyoneIsIn } className="btn">EVERYONE IS IN</button>;
      }

      return (
        <div>
          <div className="small-header">You are in!</div>
          { everyoneIsIn }
        </div>
      );
    }

    return (
      <div>
        <div className="small-header">Join Room</div>
        <form onSubmit={ this.handlePlayerJoin }>
          <div id="warning" className="notice-red" />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" ref="name" placeholder="ex: John" />
          </div>
          <div className="form-group">
            <label htmlFor="gameCode">Game Code</label>
            <input type="text" className="form-control" id="gameCode" ref="code" placeholder="gameCode" maxLength="4" size="4" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Enter</button>
          </div>
        </form>
      </div>
    );
  }

  @autobind
  handlePlayerJoin(e) {
    e.preventDefault();
    document.getElementsByClassName('btn')[0].disabled = true;

    let name = this.refs.name.getDOMNode().value.trim();
    let gameCode = this.refs.code.getDOMNode().value.trim().toUpperCase();

    let warning = document.getElementById('warning');

    warning.innerHTML = '';

    if(!name || !gameCode)
    {
      document.getElementsByClassName('btn')[0].disabled = false;
      warning.innerHTML  = 'All fields need to be filled out!';
      return;
    }

    this.props.updatePlayer({ displayName: name, playerJoined: false });

    this.engine.gamepadJoin({name, gameCode});
  }

  @autobind
  everyoneIsIn() {
    document.getElementsByClassName('btn')[0].disabled = true;
    this.engine.beginGame();
  }
}