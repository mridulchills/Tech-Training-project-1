import axios from 'axios';

const API_BASE_URL = 'https://yts.mx/api/v2';

export const getMovies = async ({ genre = 'all', minimumRating = 0, queryTerm = '' } = {}) => {
  const response = await axios.get(`${API_BASE_URL}/list_movies.json`, {
    params: {
      limit: 50,
      sort_by: 'year',
      genre: genre !== 'all' ? genre : undefined,
      minimum_rating: Number(minimumRating) || undefined,
      query_term: queryTerm.trim() || undefined
    }
  });

  return response?.data?.data?.movies || [];
};
