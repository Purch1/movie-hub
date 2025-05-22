import { Route, Routes } from 'react-router-dom';
import './css/App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import TopRated from './pages/TopRated';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/top-rated" element={<TopRated />} />
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
  )
}

export default App
