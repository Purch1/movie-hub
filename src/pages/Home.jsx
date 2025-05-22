import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies, getGenres, getMoviesByGenre } from "../services/api";
import MovieList from "../components/MovieList";
import GenreFilter from "../components/GenreFilter";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Popular Movies");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [popularMovies, genreList] = await Promise.all([
                    getPopularMovies(),
                    getGenres()
                ]);
                setMovies(popularMovies);
                setGenres(genreList);
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

    useEffect(() => {
        const fetchMoviesByGenres = async () => {
            if (selectedGenres.length === 0) {
                // If no genres selected, show popular movies
                try {
                    setLoading(true);
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                    setTitle("Popular Movies");
                    setError(null);
                } catch (error) {
                    setError("Failed to load popular movies.");
                } finally {
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                // For simplicity, we'll filter by the first selected genre
                // In a more advanced implementation, you could filter by multiple genres
                const genreMovies = await getMoviesByGenre(selectedGenres[0]);
                setMovies(genreMovies);
                
                // Get the name of the selected genre
                const genreName = genres.find(g => g.id === selectedGenres[0])?.name || "Genre";
                setTitle(`${genreName} Movies`);
                setError(null);
            } catch (error) {
                console.error("Error fetching movies by genre:", error);
                setError("Failed to load genre movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByGenres();
    }, [selectedGenres]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") {
            setError("Please enter a search query.");
            return;
        }
        if(loading) return;

        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            if (searchResults.length === 0) {
                setError("No results found.");
            } else {
                setMovies(searchResults);
                setTitle(`Search Results: "${searchQuery}"`);
                setError(null);
                setSelectedGenres([]); // Clear genre selection when searching
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
                // In a more advanced implementation, you could allow multiple genres
                return [genreId];
            }
        });
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
        ) : (
            <MovieList movies={movies} title={title} />
        )}
    </div>
  );
}

export default Home;