import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'mobx-react';
import fs from './support/fs';
import Stack from './router';
import stores from './stores';

export default class UrNote extends Component {
  async componentWillMount() {
    // create app directory
    await fs.mkdir();
  }

  render() {
    return (
      <Provider {...stores}>
        <Stack />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('UrNote', () => UrNote);
