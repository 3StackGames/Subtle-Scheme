import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'
import engine from '../engine'
import * as gameStateActs from '../modules/gameState'
import { displayPhases as phases } from '../components'
import { currentPhase, bindGameStateDecorator } from '../utils'


@connect(state => ({
  auth: state.auth,
  gameState: state.gameState
}))
@bindGameStateDecorator(engine)
export default class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.gameStateActs = bindActionCreators(gameStateActs, props.dispatch)
  }

  render() {
    const { gameState, auth } = this.props
    const CurrentPhase = currentPhase(gameState, phases)

    return (
      <div className="display-page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Bamboozle</h1>
              <div id="display">
                <CurrentPhase engine={engine} gameState={gameState} />
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