'use strict';

import React from 'react';
import {
	App,
	Display,
	Gamepad,
	Landing
} from './components';

import {
	Route, IndexRoute
} from 'react-router';

export default (
	<Route path='/' component={ App }>
		<IndexRoute component={ Landing } />
	
		<Route path='display' component={ Display } />
		<Route path='gamepad' component={ Gamepad } />
	</Route>
);