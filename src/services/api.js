const API_KEY = "9d84429498444cdb6d68869de782ce2d";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  const data = await response.json();
  return data;
};

export const getMovieRecommendations = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie recommendations");
  }
  const data = await response.json();
  return data.results;
};

export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  const data = await response.json();
  return data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }
  const data = await response.json();
  return data;
};
