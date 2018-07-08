/* @flow */
import React, { Component } from 'react';
import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from 'components/Navigation';
import 'url-search-params-polyfill';

type Props = {};

type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Navigation />
      </div>
    );
  }
}

export default App;
