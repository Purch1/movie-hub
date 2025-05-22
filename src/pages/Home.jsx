import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies, getGenres, getMoviesByGenre } from "../services/api";
import MovieList from "../components/MovieList";
import GenreFilter from "../components/GenreFilter";
import Pagination from "../components/Pagination";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Popular Movies");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [lastQuery, setLastQuery] = useState("");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [popularMoviesData, genreList] = await Promise.all([
                    getPopularMovies(),
                    getGenres()
                ]);
                
                setMovies(popularMoviesData.results);
                setTotalPages(popularMoviesData.total_pages);
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
            if (selectedGenres.length === 0 && !lastQuery) {
                // If no genres selected and no search query, show popular movies
                try {
                    setLoading(true);
                    const popularMoviesData = await getPopularMovies(currentPage);
                    setMovies(popularMoviesData.results);
                    setTotalPages(popularMoviesData.total_pages);
                    setTitle("Popular Movies");
                    setError(null);
                } catch (error) {
                    setError("Failed to load popular movies.");
                } finally {
                    setLoading(false);
                }
                return;
            }

            if (lastQuery) {
                // If there's a search query, fetch search results for current page
                try {
                    setLoading(true);
                    const searchData = await searchMovies(lastQuery, currentPage);
                    setMovies(searchData.results);
                    setTotalPages(searchData.total_pages);
                    setTitle(`Search Results: "${lastQuery}"`);
                    setError(null);
                } catch (error) {
                    setError("Failed to search movies.");
                } finally {
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                // Filter by the selected genre
                const genreMoviesData = await getMoviesByGenre(selectedGenres[0], currentPage);
                setMovies(genreMoviesData.results);
                setTotalPages(genreMoviesData.total_pages);
                
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
    }, [selectedGenres, currentPage, lastQuery]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") {
            setError("Please enter a search query.");
            return;
        }
        if(loading) return;

        setLoading(true);

        try {
            const searchData = await searchMovies(searchQuery, 1);
            if (searchData.results.length === 0) {
                setError("No results found.");
            } else {
                setMovies(searchData.results);
                setTotalPages(searchData.total_pages);
                setTitle(`Search Results: "${searchQuery}"`);
                setError(null);
                setSelectedGenres([]); // Clear genre selection when searching
                setLastQuery(searchQuery); // Save the search query
                setCurrentPage(1); // Reset to first page
            }
        } catch (error) {
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    const handleGenreSelect = (genreId) => {
        setCurrentPage(1); // Reset to first page when changing genres
        setLastQuery(""); // Clear any search query
        
        setSelectedGenres(prevSelectedGenres => {
            if (prevSelectedGenres.includes(genreId)) {
                // If already selected, remove it
                return prevSelectedGenres.filter(id => id !== genreId);
            } else {
                // For this simple implementation, we'll only allow one selected genre
                return [genreId];
            }
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when changing pages
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
                <>
                    <MovieList movies={movies} title={title} />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Home;