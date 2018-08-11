/* @flow */
import api from 'utils/Tmdb.js';
import Dispatch from 'types/types';
const initialState = {
  data: [],
  isLoaded: false,
  movies: [],
};

const MOVIE_LOADING = 'MOVIE_LOADING';
const MOVIE_LOADED = 'MOVIE_LOADED';
const MOVIE_ERROR = 'MOVIE_ERROR';

//TODO: add some concrete types for the state and for actions.

const reducer = (state: Object = initialState, action: Object) => {
  let newState;
  switch (action.type) {
    case MOVIE_LOADING:
      return action;
    case MOVIE_ERROR:
      return action;
    case MOVIE_LOADED:
      newState = action;
      return newState;
    default:
      return state;
  }
};

export const receiveMovies = (json: Object) => {
  return { type: MOVIE_LOADED, data: json, isLoaded: true };
};

export const handleErrors = (error: Object) => {
  return { type: MOVIE_ERROR, data: error, isLoaded: false };
};

export const movies = (
  value: string | number,
  page: number,
  sortBy: string
) => {
  const searchParams = {
    query: value,
    page: page,
    sort_by: sortBy,
  };
  if (value) {
    return async (dispatch: Dispatch) => {
      try {
        const movies = await api.searchAmong('multi', searchParams);
        return dispatch(receiveMovies(movies));
      } catch (error) {
        dispatch(handleErrors(error));
      }
    };
  } else {
    return async (dispatch: Dispatch) => {
      try {
        const movies = await api.discoverMovie(searchParams);
        return dispatch(receiveMovies(movies));
      } catch (error) {
        dispatch(handleErrors(error));
      }
    };
  }
};

export default reducer;
