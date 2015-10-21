'use strict';

import React from 'react';
import autobind from 'autobind-decorator';
import Component from '../../Component';

export default class PackSelectionPhase extends Component {
  render() {
    let state = this.state.gameState;

    if(state.players[0].displayName === state.currentPlayer.displayName)
    {
      return (
        <div>
          <div className="small-header">Please select question packs</div>
          <form onSubmit={ this.sbumitPacks }>
            <div id="warning" className="notice-red" />
            { state.packOptions.map((pack, key) => {
              return (
                <div key={ key } className="form-group">
                  <input className="form-control checkbox" type="checkbox" name="questionPack[]" id={ "questionPack-" + key } value={ pack } />
                  <label htmlFor={ "questionPack-" + key }>{ pack }</label>
                </div>
              );
            }) }
            <button type="submit" className="btn">Use Selected Question Packs</button>
          </form>
        </div>
      );
    }

    return <div className="small-header">Waiting for question packs to be selected.</div>;
  }

  @autobind
  sbumitPacks(e) {
    e.preventDefault();

    let state = this.state.gameState;
    let questionPacks =  document.getElementsByName("questionPack[]");
    let packs = [];

    for(let i = 0; i < questionPacks.length; i++)
    {
      let questionPack = questionPacks[i];
      
      if(questionPack.checked === true)
      {
        packs.push(questionPack.value);
      }
    }

    if(packs.length == 0)
    {
      let warning = document.getElementById('warning');
      warning.innerHTML  = 'Please select a question pack!';
      return;
    }

    let player = state.currentPlayer.displayName;
    let gameCode = state.gameCode;
    this.engine.gamepadInput({ packs, player, gameCode });
  }
}