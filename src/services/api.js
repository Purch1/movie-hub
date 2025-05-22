const API_KEY = "9d84429498444cdb6d68869de782ce2d";
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data.results;
}

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
}

export const getMovieRecommendations = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie recommendations");
    }
    const data = await response.json();
    return data.results;
}

export const getMovieCredits = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie credits");
    }
    const data = await response.json();
    return data;
}