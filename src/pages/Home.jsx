import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                setError("Failed to load popular movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

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
                setError("Failed to load popular movies. Please try again later.");
            }
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    }

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

        {error && (
            <div className="error-message">
                {error}
            </div>
        )}
        {loading ? (<div className="loading">Loading...</div>
        ) : (
        <div className="movies-grid"> 
            {movies.map(
                (movie) => 
                movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id}  />
                ))}
            
        </div>
        )}
    </div>
  );
}

export default Home;