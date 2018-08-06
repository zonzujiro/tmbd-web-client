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
import Pagination from 'react-js-pagination';
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
  activePage: number,
};

class MainPage extends Component<Props, State> {
  state = {
    activePage: 1,
  };

  componentDidMount() {
    this.props.getMovies.movies(null, 1);
  }

  handleSearchChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.props.getMovies.movies(this.state.inputValue, this.state.activePage);
    console.log('handleSubmit');
  };

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    const value = this.state.inputValue;
    if (value) {
      this.setState({ activePage: pageNumber });
      this.props.getMovies.movies(value, pageNumber);
    } else {
      this.setState({ activePage: pageNumber });
      this.props.getMovies.movies(null, pageNumber);
    }
  };

  render() {
    const { classes, data, error } = this.props;
    const poster = 'https://image.tmdb.org/t/p/w500';
    const { total_pages } = data.data;

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
                {data.data.results.map(item => (
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
