'use strict';

import React from 'react';

export default class App extends React.Component {
	render() {
		return React.cloneElement(this.props.children, { shufflePlayers: this.shufflePlayers });
	}

  shufflePlayers(count) {
    let array = new Array(count).join(',').split(',').map((i,k) => k)

    let i = array.length, tmp, random;

    while (0 !== i)
    {
      random = Math.floor(Math.random() * i);
      i -= 1;

      tmp = array[i];
      array[i] = array[random];
      array[random] = tmp;
    }

    return array;
  }
}