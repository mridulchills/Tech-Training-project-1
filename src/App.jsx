import { useEffect, useState } from 'react';
import MovieFilters from './components/MovieFilters';
import MovieList from './components/MovieList';
import { getMovies } from './services/movieApi';

const defaultFilters = {
  queryTerm: '',
  genre: 'all',
  minimumRating: 0
};

function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await getMovies(filters);
      setMovies(data);
    } catch {
      setError('Unable to fetch movie data right now. Please try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchTrigger]);

  const handleFilterChange = (name, value) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setFetchTrigger((previousCount) => previousCount + 1);
  };

  return (
    <main className="app">
      <header>
        <h1>Movie Explorer</h1>
        <p>Browse and search movies by title, genre, and rating.</p>
        <p className="hint">If the public API is blocked on your network, sample movie data is shown automatically.</p>
      </header>

      <MovieFilters filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />

      {isLoading && <p className="status-message">Loading movies...</p>}
      {!isLoading && error && <p className="status-message error">{error}</p>}
      {!isLoading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default App;
