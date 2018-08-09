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
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Pagination from 'react-js-pagination';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import _ from 'lodash/fp';
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
  fetchedDataBundle: Object,
  classes: Object,
  error: Object,
  dispatch: Dispatch,
  location: Object,
};

type State = {
  inputValue: number | string,
  activePage: number,
  favorites: string,
};

class MainPage extends Component<Props, State> {
  componentDidMount() {
    const urlParamsValues = queryString.parse(this.props.location.search);
    this.setState({ activePage: urlParamsValues.page || 1 });
    this.props.getMovies.movies(
      null,
      urlParamsValues.page || 1,
      'popularity.desc'
    );
    const favorites = localStorage.getItem('favorites') || JSON.stringify([]);
    localStorage.setItem('favorites', favorites);
  }

  handleSearchChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
      activePage: 1,
    });
  };

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    const urlParamsValues = queryString.parse(this.props.location.search);
    this.setState({ activePage: urlParamsValues.page });
    this.props.getMovies.movies(
      this.state.inputValue,
      urlParamsValues.page || this.state.activePage,
      'popularity.desc'
    );
  };

  handlePageChange = (pageNumber: number) => {
    const { inputValue } = this.state;
    const value = inputValue || null;
    this.setState({ activePage: pageNumber });
    this.props.getMovies.movies(value, pageNumber);
    const history = createBrowserHistory({ basename: '/' });
    history.push(`?page=${pageNumber}`);
  };

  addMovieToListOfFavorites = (id: number) => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const duplicate = _.find(e => e === id, parsedFavorites);
      if (duplicate !== id) {
        parsedFavorites.push(id);
        const favToString = JSON.stringify(parsedFavorites);
        localStorage.setItem('favorites', favToString);
      }
    }
  };

  deleteMovieFromFavorites = (id: number) => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const updatedList = _.filter(e => e !== id, parsedFavorites);
      const updatedListToString = JSON.stringify(updatedList);
      localStorage.setItem('favorites', updatedListToString);
    }
  };

  sortSearchResults = (sortParam: string) => {
    const sortParameters = sortParam || 'popularity.desc';
    this.props.getMovies.movies(
      this.state.inputValue,
      this.state.activePage,
      sortParameters
    );
  };

  render() {
    const { classes, fetchedDataBundle, error } = this.props;
    const poster = 'https://image.tmdb.org/t/p/w500';
    const { total_pages } = fetchedDataBundle.data;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!fetchedDataBundle.isLoaded) {
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
          <Button
            className={classes.button}
            onClick={this.sortSearchResults.bind(this, 'release_date.desc')}
          >
            Sort by year
          </Button>
          <Button
            className={classes.button}
            onClick={this.sortSearchResults.bind(this, 'vote_average.desc')}
          >
            Sort by rang
          </Button>
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <Grid
                container
                className={classes.container}
                justify="center"
                spacing={8}
              >
                {fetchedDataBundle.data.results.map(item => (
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
                        <Typography
                          gutterBottom
                          variant="headline"
                          component="h4"
                        >
                          Release date: {item.release_date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          color="primary"
                          onClick={this.deleteMovieFromFavorites.bind(
                            this,
                            item.id
                          )}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          className={classes.button}
                          aria-label="Favorite"
                          id={item.id}
                          onClick={this.addMovieToListOfFavorites.bind(
                            this,
                            item.id
                          )}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid>
                <Pagination
                  prevPageText="prev"
                  nextPageText="next"
                  firstPageText="first"
                  lastPageText="last"
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={total_pages}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </main>
      );
    }
  }
}

function mapStateToProps(state) {
  return { fetchedDataBundle: state.movies, isLoaded: state.isLoaded };
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
