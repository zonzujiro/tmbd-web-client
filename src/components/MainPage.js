/* @flow */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movies from 'modules/movies';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: 445,
  },
  card: {
    maxWidth: 445,
    margin: '20px auto',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
});

type Props = {
  getMovies: Object,
  data: Array<number | string>,
  classes: Object,
};

type State = {
  inputValue: number | string,
};

class MainPage extends Component<Props, State> {
  componentDidMount() {
    this.props.getMovies.movies();
  }

  handleSearchChange = ({ target }: { target: HTMLInputElement }) => {
    this.setState({ inputValue: target.value });
  };

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.props.getMovies.movies(this.state.inputValue);
  };

  render() {
    const { classes, data, error } = this.props;
    const poster = 'https://image.tmdb.org/t/p/w500';

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!data.isLoaded) {
      return <LinearProgress color="secondary" variant="query" />;
    } else {
      return (
        <div>
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
          {data.data.map(item => (
            <div key={item.id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${poster}${item.poster_path}`}
                  alt={item.title}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="p">{item.overview}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { data: state.movies, isLoaded: state.isLoaded };
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: bindActionCreators(movies, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
