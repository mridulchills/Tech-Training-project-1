const GENRES = [
  'all',
  'action',
  'adventure',
  'animation',
  'comedy',
  'crime',
  'drama',
  'fantasy',
  'horror',
  'mystery',
  'romance',
  'sci-fi',
  'thriller'
];

function MovieFilters({ filters, onFilterChange, onSearch }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="queryTerm"
          type="text"
          value={filters.queryTerm}
          placeholder="Search by movie title"
          onChange={handleInputChange}
        />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre</label>
        <select id="genre" name="genre" value={filters.genre} onChange={handleInputChange}>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre === 'all' ? 'All genres' : genre[0].toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="minimumRating">Minimum rating</label>
        <select
          id="minimumRating"
          name="minimumRating"
          value={filters.minimumRating}
          onChange={handleInputChange}
        >
          {[0, 5, 6, 7, 8, 9].map((rating) => (
            <option key={rating} value={rating}>
              {rating === 0 ? 'Any rating' : `${rating}+`}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Search Movies</button>
    </form>
  );
}

export default MovieFilters;
