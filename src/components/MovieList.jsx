import MovieCard from './MovieCard';

function MovieList({ movies }) {
  if (!movies.length) {
    return <p className="status-message">No movies found for the selected filters.</p>;
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
