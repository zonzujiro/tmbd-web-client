/* @flow */
/**
 * TMDB API client configuration
 * @type {{key: string, baseUrl: string, imageBaseUrl: string}}
 */
const apiConfig: { key: string, baseUrl: string, imageBaseUrl: string } = {
  key: '5265606bb69e99437c85eb04dc6f29b5',
  baseUrl: 'https://api.themoviedb.org/3/',
  imageBaseUrl: 'http://image.tmdb.org/t/p/',
};

/**
 * An abstraction layer above TMDB API https://developers.themoviedb.org/3/getting-started/introduction
 */
class Tmdb {
  apiConfig: Object;
  imageConfigCache: ?Object;

  constructor() {
    this.apiConfig = apiConfig;
    this.imageConfigCache = undefined;
  }

  /**
   * Discover movies as per https://developers.themoviedb.org/3/discover/movie-discover
   * @param {Object} searchParams - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  discoverMovie(searchParams?: Object = {}): Promise<Response> {
    return this.query('discover/movie', [], searchParams);
  }

  /**
   * Discover movies as per https://developers.themoviedb.org/3/discover/tv-discover
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  discoverTv(searchParams?: Object = {}): Promise<Response> {
    return this.query('discover/tv', [], searchParams);
  }

  /**
   * Find database object using external id as per https://developers.themoviedb.org/3/find/find-by-id
   * @param {string} externalId
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  findByExternalId(
    externalId: number | string,
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.query('find', [externalId], searchParams);
  }

  /**
   * Search db as per https://developers.themoviedb.org/3/search
   * @param {string} resource (company|collection|keyword|movie|multi|person|tv)
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  searchAmong(
    resource:
      | 'company'
      | 'collection'
      | 'keyword'
      | 'movie'
      | 'multi'
      | 'person'
      | 'tv',
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.query('search', [resource], searchParams);
  }

  /**
   * Get movie by id as per https://developers.themoviedb.org/3/movies
   * @param {string} movieId
   * @param {Array<string>} [subPath]
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  getMovie(
    movieId: number | string,
    subPath?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.query('movie', [movieId, ...subPath], searchParams);
  }

  /**
   * Get tv by id as per https://developers.themoviedb.org/3/tv/
   * @param {string} tvId
   * @param {Array<string>} [subPath]
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  getTv(
    tvId: number | string,
    subPath?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.query('tv', [tvId, ...subPath], searchParams);
  }

  /**
   * Get tv season by tvId and seasonNumber as per https://developers.themoviedb.org/3/tv-seasons/
   * @param {string} tvId
   * @param {string} seasonNumber
   * @param {Array<string>} [subPath]
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  getTvSeason(
    tvId: number | string,
    seasonNumber: number | string,
    subPath?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.getTv(tvId, ['season', seasonNumber, ...subPath], searchParams);
  }

  /**
   * Get tv episode season by tvId, seasonNumber, and episodeNumber as per https://developers.themoviedb.org/3/tv-episodes/
   * @param {string} tvId
   * @param {string} seasonNumber
   * @param {string} episodeNumber
   * @param {Array<string>} [subPath]
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  getTvEpisode(
    tvId: number | string,
    seasonNumber: number | string,
    episodeNumber: number | string,
    subPath?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.getTvSeason(
      tvId,
      seasonNumber,
      ['episode', episodeNumber, ...subPath],
      searchParams
    );
  }

  /**
   * Get person by id as per https://developers.themoviedb.org/3/people/
   * @param {string} personId
   * @param {Array<string>} [subPath]
   * @param {Object} [searchParams] - see query() for details
   * @returns {Promise<Response>} - see query() for details
   */
  getPerson(
    personId: number | string,
    subPath?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return this.query('person', [personId, ...subPath], searchParams);
  }

  /**
   * Commits a general purpose query
   * Usage: query().then(data => {}).catch(rejection => {})
   * @param {string} resource - like 'movie'
   * @param {Array<string>} [pathParams] - e.g. [movieId, 'images']
   * @param {Object} [searchParams] - see _makeGetUrl() for details
   * @returns {Promise<Response>} - response body data or rejection
   */
  query(
    resource: string,
    pathParams?: Array<number | string> = [],
    searchParams?: Object = {}
  ): Promise<Response> {
    return window
      .fetch(this._makeGetUrl(resource, pathParams, searchParams))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .catch(rejection => {
        throw rejection;
      });
  }

  /**
   * Gets image url of given size
   * @param {string} filePath
   * @param {number|string} size - call getImageryConfig() for available sizes per image type
   * @returns {string}
   */
  getImageUrl(filePath: string, size: number | string): URL {
    return new URL(this.apiConfig.imageBaseUrl + 'w' + size + filePath);
  }

  /**
   * Gets imagery configuration from TMDB API server
   * The response is being cached for re-use during same session
   * @returns {Promise<any>} - cached data or query() result, see query() for details
   */
  getImageryConfig(): Promise<mixed> {
    return this.imageConfigCache
      ? Promise.resolve(this.imageConfigCache)
      : this.query('configuration').then(config => {
          this.imageConfigCache = config;
          return config;
        });
  }

  /**
   * Builds an URL for GET request from components, adding an api_key
   * @param {string} resource - like 'movie'
   * @param {Array<string>} [pathParams] - e.g. ['tv', tvId, 'season', seasonNumber]
   * @param {Object} [searchParams] -
   *        {key0:value0, key1:value1}, will transform into ?key0=value0&key1=value1,
   *        keys and values are URL encoded for safety and consistency
   * @returns {URL}
   * @private
   */
  _makeGetUrl(
    resource: string,
    pathParams: Array<number | string> = [],
    searchParams: Object = {}
  ): URL {
    pathParams.unshift(resource);
    const searchParamsString = new URLSearchParams(
      Object.assign(searchParams, { api_key: this.apiConfig.key })
    ).toString();
    return new URL(
      this.apiConfig.baseUrl +
        pathParams.join('/') +
        (searchParamsString.length ? '?' + searchParamsString : '')
    );
  }
}

export default new Tmdb();
