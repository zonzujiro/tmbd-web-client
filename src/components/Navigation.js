import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ActorPage from './ActorPage';
import MoviePage from './MoviePage';
import MoviesList from './MoviesList';

class Navigation extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <header>
              <nav>
                <ul className="navigation-menu">
                  <li>
                    <Link to="/actor">Actor page</Link>
                  </li>
                  <li>
                    <Link to="/movie">Movie page</Link>
                  </li>
                  <li>
                    <Link to="/list">List of movies</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Route exact path="/actor" component={ActorPage} />
            <Route path="/movie" component={MoviePage} />
            <Route path="/list" component={MoviesList} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default Navigation;
