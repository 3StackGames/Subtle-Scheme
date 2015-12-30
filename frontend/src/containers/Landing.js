import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActs from '../modules/auth'
import autobind from 'autobind-decorator'

@connect(state => ({
  auth: state.auth
}))
export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isCreatingAccount: false
    }

    this.authActs = bindActionCreators(authActs, props.dispatch)
  }

  render() {
    const { props } = this

    return (
      <div className="index-page">
        <h1>Subtle Scheme</h1>
        <div><Link to="/display" className="btn">Create Room</Link></div>
        <div><Link to="/gamepad" className="btn">Join Room</Link></div>
        <div className="login-wrap">
          <h3>Login</h3>
          <p className="text-detail">We'll make sure you don't get repeat questions :)</p>
          <form>
            <div className="form-group">
              <label htmlFor="loginUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="loginUsername"
                onChange={this.handleUsernameInput} />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                onChange={this.handlePasswordInput} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" onChange={this.handleCreateToggle}/> Create new account
              </label>
            </div>
          </form>
          <button className="btn-login" onClick={this.authenticate}>Submit</button>
        </div>
      </div>
    )
  }

  @autobind
  handleUsernameInput(e) {
    const input = e.target.value
    this.setState({
      username: input
    })
  }

  @autobind
  handlePasswordInput(e) {
    const input = e.target.value
    this.setState({
      password: input
    })
  }

  @autobind
  handleCreateToggle(e) {
    const isChecked = e.target.checked
    this.setState({
      isCreatingAccount: isChecked
    })
  }

  @autobind
  authenticate(e) {
    const { isCreatingAccount, username, password } = this.state
    if (isCreatingAccount) {
      this.authActs.createAccount(username, password)
    } else {
      this.authActs.login(username, password)
    }
  }
}
