/* @flow */
import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './components/Navigation';

class App extends Component {
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
