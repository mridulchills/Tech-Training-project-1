import mockMovies from '../data/mockMovies';

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

export const getMovies = async (filters = {}) => applyClientFilters(mockMovies, filters);
