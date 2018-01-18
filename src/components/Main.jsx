import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/index';

import { enableDebug } from '../actions/general';

import Playspace from './Playspace';

const store = createStore(reducers);

const DEBUG = true;

if (DEBUG) {
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(enableDebug());
}

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Playspace />
      </Provider>
    );
  }
}
