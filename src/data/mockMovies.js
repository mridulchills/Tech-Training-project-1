const TITLE_PREFIXES = [
  'Shadow',
  'Last',
  'Hidden',
  'Broken',
  'Golden',
  'Silent',
  'Dark',
  'Crimson',
  'Endless',
  'Neon'
];

const TITLE_SUFFIXES = [
  'Empire',
  'Signal',
  'Journey',
  'Legacy',
  'Promise',
  'Storm',
  'Code',
  'Rising',
  'Memory',
  'Horizon'
];

const GENRE_GROUPS = [
  ['Action', 'Thriller'],
  ['Adventure', 'Fantasy'],
  ['Animation', 'Comedy'],
  ['Crime', 'Drama'],
  ['Drama', 'Romance'],
  ['Horror', 'Mystery'],
  ['Sci-Fi', 'Action'],
  ['Thriller', 'Mystery']
];

const mockMovies = Array.from({ length: 5000 }, (_, index) => {
  const id = index + 1;
  const prefix = TITLE_PREFIXES[index % TITLE_PREFIXES.length];
  const suffix = TITLE_SUFFIXES[Math.floor(index / TITLE_PREFIXES.length) % TITLE_SUFFIXES.length];
  const rating = Number((5 + (index % 50) * 0.1).toFixed(1));
  const year = 1980 + (index % 45);
  const genres = GENRE_GROUPS[index % GENRE_GROUPS.length];
  const title = `${prefix} ${suffix} ${id}`;

  return {
    id,
    title,
    year,
    rating,
    genres,
    medium_cover_image: `https://via.placeholder.com/220x330?text=${encodeURIComponent(title)}`
  };
});

export default mockMovies;
