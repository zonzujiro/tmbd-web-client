/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

let store = configureStore();

if (root instanceof Element) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <App />
    </Provider>,
    root
  );
}
