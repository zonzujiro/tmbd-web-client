import React, {Component, Fragment} from 'react';
import logo from '../logo.svg';
import '../App.css';

class MoviesList extends Component {
  render() {
    return (
      <Fragment>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TMDB Web client - moviesList</h1>
        </div>
      </Fragment>
    );
  }
}

export default MoviesList;
