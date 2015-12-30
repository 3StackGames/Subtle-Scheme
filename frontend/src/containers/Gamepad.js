import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'
import engine from '../engine'
import * as gameStateActs from '../modules/gameState'
import * as playerActs from '../modules/currentPlayer'
import { gamepadPhases as phases } from '../components'
import { currentPhase, bindGameStateDecorator } from '../utils'

@connect(state => ({
  auth: state.auth,
  gameState: state.gameState,
  currentPlayer: state.currentPlayer
}))
@bindGameStateDecorator(engine)
export default class Gamepad extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.gameStateActs = bindActionCreators(gameStateActs, props.dispatch)
    this.playerActs = bindActionCreators(playerActs, props.dispatch)
  }

  componentWillReceiveProps(nextProps) {
    const player = nextProps.currentPlayer
    const players = nextProps.gameState.players
    if (player && players && !player.joined) {
      const joined = Boolean(nextProps.gameState.players
        .find(p => p.displayName === player.displayName))
      if (joined) this.playerActs.join()
    }
  }

  render() {
    const { gameState, currentPlayer } = this.props
    const CurrentPhase = currentPhase(gameState, phases)

    return (
      <div className="gamepad-page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Subtle Scheme</h1>
              <div id="gamepad">
                <CurrentPhase
                  engine={engine}
                  gameState={gameState}
                  currentPlayer={currentPlayer}
                  playerActs={this.playerActs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  @autobind
  bindState() {
    this.gameStateActs.stateUpdate(engine.getState())
  }
}
