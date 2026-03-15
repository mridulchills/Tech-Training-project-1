function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img
        src={movie.medium_cover_image}
        alt={`${movie.title} poster`}
        loading="lazy"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <p>⭐ {movie.rating} / 10</p>
        <p>{movie.genres?.join(', ') || 'Genre not listed'}</p>
      </div>
    </article>
  );
}

export default MovieCard;
