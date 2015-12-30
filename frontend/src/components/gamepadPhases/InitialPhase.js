import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import autobind from 'autobind-decorator'
import objectPath from 'object-path'

export default class InitialPhase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      gameCode: '',
      errors: {
        username: true,
        gameCode: true
      }
    }
  }

  // NOTE: Handle found room
  render() {
    const user = JSON.parse(localStorage.getItem('gamepad.user'))
    const timestamp = parseInt(localStorage.getItem('gamepad.timestamp'), 10)
    const difference = (+new Date - timestamp) / (1000 * 60 * 60)
    let foundRoom

    if(typeof user === "object" && difference <= 3)
    {
      foundRoom = (
        <div className="form-group">
          <label>Found Room:</label>
          <button onClick={this.handleJoinRoom} type="button" className="btn">Join Back {user.gameCode} as {user.displayName}</button>
        </div>
      )
    }

    if (objectPath.get(this.props, ['currentPlayer', 'joined'])) {
      return (
        <div>
          <div className="small-header">You are in!</div>
          {this.everyoneIsInButton}
        </div>
      );
    }

    return (
      <div>
        <div className="small-header">Join Room</div>
        <form>
          {foundRoom}
          <div id="warning" className="notice-red" />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={this.handleUsernameInput}
              className="form-control"
              id="username"
              placeholder="ex: John" />
          </div>
          <div className="form-group">
            <label htmlFor="gameCode">Game Code</label>
            <input
              type="text"
              onChange={this.handleGameCodeInput}
              className="form-control"
              id="gameCode"
              placeholder="gameCode"
              maxLength="4"
              size="4" />
          </div>
          <div className="form-group">
            <button
              disabled={!this.isInputValid}
              onClick={this.handlePlayerJoin}
              className="btn">
              Enter
            </button>
          </div>
        </form>
      </div>
    )
  }

  get everyoneIsInButton() {
    if (this.props.gameState.players[0].displayName === this.props.currentPlayer.displayName) {
      return <button onClick={this.everyoneIsIn} className="btn">EVERYONE IS IN</button>;
    }
  }

  @autobind
  everyoneIsIn(e) {
    e.target.disabled = true
    this.props.engine.beginGame()
  }

  @autobind
  handleUsernameInput(e) {
    const { isDirty, errors } = this.state
    const input = e.target.value

    let error = null
    if (input.length === 0) {
      error = 'Enter a username!'
    }
    else if (input.length > 16) {
      error = 'Choose a shorter username!'
    }

    this.setState({
      username: input,
      errors: {
        ...errors,
        username: error
      }
    })
  }

  @autobind
  handleGameCodeInput(e) {
    const { isDirty, errors } = this.state
    const input = e.target.value

    let error = null
    if (input.length === 0) {
      error = 'Enter a game code!'
    }
    else if (input.length !== 4) {
      // Set error to `true` if you don't want to print an error message
      // but still want to recognize that an error has occurred
      error = true
    }

    this.setState({
      gameCode: input,
      errors: {
        ...errors,
        gameCode: error
      }
    })
  }

  get isInputValid() {
    return !this.state.errors.username && !this.state.errors.gameCode
  }

  @autobind
  handlePlayerJoin(e) {
    const { username, gameCode } = this.state
    const { playerActs, engine } = this.props
    e.preventDefault()
    e.target.disabled = true

    playerActs.setPlayer({
      displayName: this.state.username,
      joined: false
    })

    localStorage.removeItem('gamepad.user');
    localStorage.removeItem('gamepad.timestamp');

    engine.gamepadJoin({
      gameCode,
      name: username
    })
  }

  @autobind
  handleJoinRoom(e) {
    e.preventDefault()
    e.target.disabled = true

    const { playerActs, engine } = this.props
    const { displayName, gameCode } = JSON.parse(localStorage.getItem('gamepad.user'))

    playerActs.setPlayer({ displayName, joined: false })
    engine.gamepadJoin({ name: displayName, gameCode })
  }
}