import axios from 'axios';
import mockMovies from '../data/mockMovies';

const MOVIES_ENDPOINT = 'https://yts.mx/api/v2/list_movies.json?limit=50&sort_by=year';
const FALLBACK_PROXY_URL = 'https://api.allorigins.win/raw?url=';

const normalizeGenre = (value = '') => value.toLowerCase();

const applyClientFilters = (movies, { genre = 'all', minimumRating = 0, queryTerm = '' } = {}) => {
  const normalizedQuery = queryTerm.trim().toLowerCase();
  const normalizedGenre = normalizeGenre(genre);
  const requiredRating = Number(minimumRating) || 0;

  return movies.filter((movie) => {
    const matchesGenre =
      normalizedGenre === 'all' ||
      movie.genres?.some((movieGenre) => normalizeGenre(movieGenre) === normalizedGenre);

    const matchesRating = Number(movie.rating) >= requiredRating;
    const matchesTitle = !normalizedQuery || movie.title?.toLowerCase().includes(normalizedQuery);

    return matchesGenre && matchesRating && matchesTitle;
  });
};

const fetchFromEndpoint = async (url) => {
  const response = await axios.get(url, { timeout: 10000 });
  return response?.data?.data?.movies || [];
};

export const getMovies = async (filters = {}) => {
  try {
    const movies = await fetchFromEndpoint(MOVIES_ENDPOINT);
    return applyClientFilters(movies, filters);
  } catch {
    try {
      const proxiedUrl = `${FALLBACK_PROXY_URL}${encodeURIComponent(MOVIES_ENDPOINT)}`;
      const movies = await fetchFromEndpoint(proxiedUrl);
      return applyClientFilters(movies, filters);
    } catch {
      return applyClientFilters(mockMovies, filters);
    }
  }
};
