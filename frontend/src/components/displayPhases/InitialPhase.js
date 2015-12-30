import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { DisplayLobby } from '../../components'

export default class InitialPhase extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.engine.displayJoin()
  }

  render() {
    const { players = [], gameCode } = this.props.gameState
    return (
      <div>
        <div className="small-header">Waiting for players ({players.length}/8)...</div>
        <div className="joinNotice">
          <div className="title">
            The game code is : <div className="gamecode">{gameCode}</div>
          </div>

          <div className="content">
            <p>Join on your phone or tablet at <span className="everybody">http://SubtleSche.me/</span></p>
            <p>Press <span className="everybody">EVERYBODY IS IN</span> to start the game.</p>
          </div>
          <DisplayLobby players={players} />
        </div>
      </div>
    )
  }
}
