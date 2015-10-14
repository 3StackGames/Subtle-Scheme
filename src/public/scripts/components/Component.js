'use strict';

import React from 'react';
import engine from '../engine'
import autobind from 'autobind-decorator'

import { events } from '../digital-compass/constants'

export default class Component extends React.Component {
	constructor(props) {
		super(props);

		this.state = { gameState: engine.getState() };
		this.canUpdate = false;
		this.engine = engine;

		engine.socket.on(events.DISPLAY_ACTION_COMPLETE, this.displayActionComplete);
	}

	componentWillMount() {
		this.canUpdate = true;
		engine.addStateListener(this.bindState);
		this.setState({ gameState: engine.getState() });

		let phase = this.state.gameState.currentPhase;
		if(!phase) return;
		console.groupCollapsed("%c " + phase.phaseName + " ", 'background-color: #4CAF50; color: white;');
	}

	componentWillUnmount() {
		console.groupEnd();

		this.canUpdate = false;
		engine.removeStateListener(this.bindState);
	}

	componentWillReceiveProps(props) {
        if(props.gameState == undefined) return;
		this.setState({ gameState: props.gameState });
	}

	render() {
		return <div />;
	}

	@autobind
	bindState() {
		if(this.canUpdate) this.setState({ gameState: engine.getState() });
	}

	displayActionComplete() {}

	static PropTypes = {};
	static defaultProps = {};
	static contextTypes = {};
}