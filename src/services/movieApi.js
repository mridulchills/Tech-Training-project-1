import axios from 'axios';

const MOVIES_ENDPOINT = 'https://yts.mx/api/v2/list_movies.json?limit=50&sort_by=year';
const FALLBACK_PROXY_URL = 'https://api.allorigins.win/raw?url=';

const applyClientFilters = (movies, { genre = 'all', minimumRating = 0, queryTerm = '' } = {}) => {
  const normalizedQuery = queryTerm.trim().toLowerCase();
  const requiredRating = Number(minimumRating) || 0;

  return movies.filter((movie) => {
    const matchesGenre = genre === 'all' || movie.genres?.some((movieGenre) => movieGenre.toLowerCase() === genre.toLowerCase());
    const matchesRating = Number(movie.rating) >= requiredRating;
    const matchesTitle = !normalizedQuery || movie.title?.toLowerCase().includes(normalizedQuery);

    return matchesGenre && matchesRating && matchesTitle;
  });
};

const fetchFromEndpoint = async (url) => {
  const response = await axios.get(url);
  return response?.data?.data?.movies || [];
};

export const getMovies = async (filters = {}) => {
  try {
    const movies = await fetchFromEndpoint(MOVIES_ENDPOINT);
    return applyClientFilters(movies, filters);
  } catch {
    const proxiedUrl = `${FALLBACK_PROXY_URL}${encodeURIComponent(MOVIES_ENDPOINT)}`;
    const movies = await fetchFromEndpoint(proxiedUrl);
    return applyClientFilters(movies, filters);
  }
};
