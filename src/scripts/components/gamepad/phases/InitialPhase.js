'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class InitialPhase extends Component {
  constructor(props) {
    super(props);

    this.playerJoined = false;
    this.tempName = null;
  }

  render() {
    if(this.playerJoined)
    {
      return (
        <div>
          <div className="small-header">You are in!</div>
          <button onClick={ this.engine.beginGame } className="btn">EVERYONE IS IN</button>
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

    let name = this.refs.name.getDOMNode().value.trim();
    let gameCode = this.refs.code.getDOMNode().value.trim().toUpperCase();

    let warning = document.getElementById('warning');

    warning.innerHTML = '';

    if(!name || !gameCode)
    {
      warning.innerHTML  = 'All fields need to be filled out!';
      return;
    }

    this.tempName = name;

    this.engine.gamepadJoin({name, gameCode});
  }

  @autobind
  gamestateUpdate(state) {
    if(!this.canUpdate || this.tempName === null || this.state.gameState === undefined) return;

    let players = this.state.gameState.players;

    for(let i = 0; i < players.length; i++)
    {
      if(players[i].displayName !== this.tempName) continue;

      this.playerJoined = true;
      this.props.updatePlayer({ displayName: this.tempName });
      break;
    }
  }
}