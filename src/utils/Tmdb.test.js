import Tmdb from './Tmdb';
import 'url-search-params-polyfill';

it('passes test with URLSearchParams', () => {
  expect(Tmdb._makeGetUrl('movie', ['list'], { lang: 'en' })).toEqual(
    new URL(
      'https://api.themoviedb.org/3/movie/list?lang=en&api_key=' +
        Tmdb.apiConfig.key
    )
  );
});
