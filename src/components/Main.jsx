import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/index';

import { enableDebug } from '../actions/general';

import Playspace from './Playspace';


export default class Main extends React.Component {
  state = {}

  static DEBUG = true

  static STORAGE_KEY = 'teststoragekey'

  constructor() {
    super();

    let reloadedState;
    if (this.constructor.STORAGE_KEY && sessionStorage[this.constructor.STORAGE_KEY]) {
      reloadedState = JSON.parse(sessionStorage[this.constructor.STORAGE_KEY]);
    }

    this.state.store = createStore(reducers, reloadedState);

    if (this.constructor.DEBUG) {
      this.state.store.subscribe(() => console.log(this.state.store.getState()));
      this.state.store.dispatch(enableDebug());
    }

    if (this.constructor.STORAGE_KEY) {
      this.state.store.subscribe(() => {
        sessionStorage.setItem(this.constructor.STORAGE_KEY, JSON.stringify(this.state.store.getState()));
      });
    }
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Playspace />
      </Provider>
    );
  }
}
