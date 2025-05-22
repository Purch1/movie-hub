import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies, getGenres, getMoviesByGenre, getTopRatedMovies } from "../services/api";
import MovieList from "../components/MovieList";
import GenreFilter from "../components/GenreFilter";
import Pagination from "../components/Pagination";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState({});
    const [featuredGenres, setFeaturedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                // Fetch all necessary data in parallel
                const [topRatedData, popularData, genreList] = await Promise.all([
                    getTopRatedMovies(),
                    getPopularMovies(),
                    getGenres()
                ]);
                
                setTopRatedMovies(topRatedData.results || []);
                setPopularMovies(popularData.results || []);
                setGenres(genreList || []);
                
                // Select 3 popular genres to feature
                const popularGenreIds = [28, 35, 14]; // Action, Comedy, Fantasy
                setFeaturedGenres(
                    genreList.filter(genre => popularGenreIds.includes(genre.id)) || []
                );
                
                // Fetch movies for each featured genre
                const genreMoviesMap = {};
                await Promise.all(
                    popularGenreIds.map(async (genreId) => {
                        const genreData = await getMoviesByGenre(genreId);
                        genreMoviesMap[genreId] = genreData.results || [];
                    })
                );
                
                setGenreMovies(genreMoviesMap);
                setError(null);
            } catch (error) {
                console.error("Error fetching initial data:", error);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") {
            setError("Please enter a search query.");
            return;
        }
        if(loading) return;

        setLoading(true);
        setIsSearching(true);

        try {
            const searchData = await searchMovies(searchQuery);
            if (searchData.results.length === 0) {
                setError("No results found.");
            } else {
                setSearchResults(searchData.results);
                setError(null);
            }
        } catch (error) {
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    const handleGenreSelect = (genreId) => {
        setSelectedGenres(prevSelectedGenres => {
            if (prevSelectedGenres.includes(genreId)) {
                // If already selected, remove it
                return prevSelectedGenres.filter(id => id !== genreId);
            } else {
                // For this simple implementation, we'll only allow one selected genre
                return [genreId];
            }
        });
        
        setIsSearching(true);
    };

    const renderMovieRow = (movies, title) => {
        if (!movies || movies.length === 0) return null;
        
        return (
            <div className="movie-row-container">
                <h2 className="row-title">{title}</h2>
                <div className="movie-row">
                    {movies.slice(0, 5).map(movie => (
                        <div className="movie-row-item" key={movie.id}>
                            <MovieList movies={[movie]} title="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {genres.length > 0 && (
                <GenreFilter 
                    genres={genres} 
                    selectedGenres={selectedGenres} 
                    onGenreSelect={handleGenreSelect}
                />
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="loading">Loading...</div>
            ) : isSearching ? (
                <div className="search-results-container">
                    <h2 className="section-title">Search Results</h2>
                    <MovieList 
                        movies={searchResults} 
                        showViewAll={false}
                        horizontalScroll={false}
                    />
                </div>
            ) : (
                <div className="home-content">
                    <MovieList 
                        movies={topRatedMovies} 
                        title="Top Rated Movies" 
                        maxMovies={10}
                        viewAllLink="/top-rated" 
                        horizontalScroll={true}
                    />
                    
                    <MovieList 
                        movies={popularMovies} 
                        title="Popular Movies" 
                        maxMovies={10}
                        viewAllLink="/popular" 
                        horizontalScroll={true}
                    />
                    
                    {featuredGenres.map(genre => (
                        <MovieList 
                            key={genre.id}
                            movies={genreMovies[genre.id]} 
                            title={`${genre.name} Movies`}
                            maxMovies={10}
                            viewAllLink={`/genre/${genre.id}`}
                            horizontalScroll={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;