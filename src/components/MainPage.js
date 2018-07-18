/* @flow */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForward from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import 'App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movies from 'modules/movies';

import { Dispatch } from 'types/types';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: 445,
  },
  card: {
    maxWidth: 345,
    minHeight: 600,
    margin: '20px auto',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  container: {
    padding: 0,
  },
  bottomNav: {
    width: '100%',
    padding: 0,
  },
});

type Props = {
  getMovies: Object,
  data: Object,
  classes: Object,
  error: Object,
  dispatch: Dispatch,
};

type State = {
  inputValue: number | string,
  favorites: Array<number>,
};

class MainPage extends Component<Props, State> {
  componentDidMount() {
    this.props.getMovies.movies();
  }

  handleSearchChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.props.getMovies.movies(this.state.inputValue);
  };

  //TODO: add functionality to handle list of favorites movies and bottom navigation
  handleBottomNavigationChange = (
    event: SyntheticInputEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log('handleBottomNavigationChange');
  };

  openListOfFavorites = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('openListOfFavorites');
  };

  addMovieToListOfFavorites = () => {
    console.log('addMovieToListOfFavorites');
  };

  deleteMovieFromFavorites = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('deleteMovieFromFavorites');
  };

  render() {
    const { classes, data, error } = this.props;
    const poster = 'https://image.tmdb.org/t/p/w500';

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!data.isLoaded) {
      return <LinearProgress />;
    } else {
      return (
        <main>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="search"
              onChange={this.handleSearchChange}
              label="Search field"
              type="search"
              className={classes.textField}
              margin="normal"
            />
          </form>
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <Grid
                container
                className={classes.container}
                justify="center"
                spacing={8}
              >
                {data.data.map(item => (
                  <Grid key={item.id} item>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={`${poster}${item.poster_path}`}
                        alt={item.title}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="headline"
                          component="h2"
                        >
                          {item.title}
                        </Typography>
                        <Typography component="p">{item.overview}</Typography>
                        <Typography
                          gutterBottom
                          variant="headline"
                          component="h2"
                        >
                          IMDB score: {item.vote_average}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          disabled
                          color="primary"
                          onClick={this.deleteMovieFromFavorites}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          className={classes.button}
                          aria-label="Favorite"
                          value={item.id}
                          onClick={this.addMovieToListOfFavorites}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <BottomNavigation
              value="recents"
              onChange={this.handleBottomNavigationChange}
              className={classes.bottomNav}
            >
              <BottomNavigationAction label="back" icon={<ArrowBack />} />
              <BottomNavigationAction
                label="Favorites"
                onClick={this.openListOfFavorites}
                icon={<FavoriteIcon />}
              />
              <BottomNavigationAction label="forward" icon={<ArrowForward />} />
            </BottomNavigation>
          </Grid>
        </main>
      );
    }
  }
}

function mapStateToProps(state) {
  return { data: state.movies, isLoaded: state.isLoaded };
}

const mapDispatchToProps = (dispatch: Dispatch<>) => {
  return {
    getMovies: bindActionCreators(movies, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
