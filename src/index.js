/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

let store = configureStore();

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>,
  document.getElementById('root')
);
