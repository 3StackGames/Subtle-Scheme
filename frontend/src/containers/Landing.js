import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

@connect(state => ({
  auth: state.auth
}))
export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { props } = this

    return (
      <div className="index-page">
        <h1>Subtle Scheme</h1>
        <div><Link to="/display" className="btn">Create Room</Link></div>
        <div><Link to="/gamepad" className="btn">Join Room</Link></div>
      </div>
    )
  }
}
