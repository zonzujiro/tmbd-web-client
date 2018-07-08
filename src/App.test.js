import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

let store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
