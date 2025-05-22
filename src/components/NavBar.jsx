import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie Hub</Link>
        </div>
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/top-rated" className="nav-link" onClick={() => setIsMenuOpen(false)}>Top Rated</Link>
            <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
        </div>
    </nav>
  );
}

export default NavBar;