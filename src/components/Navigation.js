/* @flow */
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ActorPage from './ActorPage';
import MoviePage from './MoviePage';
import MoviesList from './MoviesList';
import MainPage from './MainPage';

const styles = {
  root: {
    flexGrow: 1,
  },
};

type Props = {
  classes: Object,
};

type State = {};

const routes = [
  { path: '/', title: 'Main page' },
  { path: '/actor', title: 'Actor page' },
  { path: '/movie', title: 'Movie page' },
  { path: '/list', title: 'List of movies' },
];

const NavLink = props => <Link {...props} />;

class Navigation extends Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Fragment>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  TMDB
                </Typography>
                <nav>
                  <ul className="navigation-menu">
                    {routes.map((route, idx) =>
                      this.renderRouteLinkListItem(idx, route)
                    )}
                  </ul>
                </nav>
              </Toolbar>
            </AppBar>
          </div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/actor" component={ActorPage} />
          <Route exact path="/movie" component={MoviePage} />
          <Route exact path="/list" component={MoviesList} />
        </Fragment>
      </Router>
    );
  }

  renderRouteLinkListItem(idx, route) {
    return (
      <li key={idx}>
        <Button color="inherit" component={NavLink} to={route.path}>
          {route.title}
        </Button>
      </li>
    );
  }
}

export default withStyles(styles)(Navigation);
