import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import autobind from 'autobind-decorator'
import R from 'ramda'

export default class PackSelectionPhase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPacks: R.range(0, props.gameState.packOptions.length).fill(false)
    }
  }

  render() {
    // let state = this.state.gameState;
    const { gameState, currentPlayer } = this.props

    if(gameState.players[0].displayName === currentPlayer.displayName) {
      return (
        <div>
          <div className="small-header">Please select question packs</div>
          <form>
            <div id="warning" className="notice-red" />
            {gameState.packOptions.map((pack, key) => {
              return (
                <div key={key} className="form-group">
                  <input
                    className="form-control checkbox"
                    type="checkbox"
                    name="questionPack[]"
                    id={"questionPack-" + key}
                    value={pack}
                    onChange={(e, pack) => this.handleCheck(e, key)} />
                  <label htmlFor={ "questionPack-" + key}>{pack}</label>
                </div>
              );
            })}
            <button
              onClick={this.submitPacks}
              disabled={!this.isInputValid}
              className="btn">
              Use Selected Question Packs
            </button>
          </form>
        </div>
      );
    }

    return <div className="small-header">Waiting for question packs to be selected.</div>;
  }

  get isInputValid() {
    const numSelected = this.state.selectedPacks
      .filter(selected => selected)
      .length

    console.log(numSelected)
    return numSelected > 0
  }

  @autobind
  handleCheck(e, key) {
    const isChecked = e.target.checked
    const selected = [...this.state.selectedPacks]
    selected[key] = isChecked
    this.setState({
      selectedPacks: selected
    })
  }

  @autobind
  submitPacks(e) {
    const { gameState, currentPlayer, engine } = this.props
    e.preventDefault()
    e.target.disabled = true

    const packs = this.state.selectedPacks
      .filter(selected => selected)
      .map((_, key) => gameState.packOptions[key])

    engine.gamepadInput({
      packs,
      player: currentPlayer.displayName,
      gameCode: gameState.gameCode
    })
  }
}