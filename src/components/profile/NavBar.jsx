import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
          {user && (
            <>
              <a href="/profile" className="nav-link">Profile</a>
              <a href="/trips" className="nav-link">Trips</a>
              <a href="/itinerary" className="nav-link">Itinerary</a>
              <a href="/bookings" className="nav-link">Bookings</a>
              <a href="/settings" className="nav-link">Settings</a>
            </>
          )}
        </div>
        <div className="nav-actions">
          {user ? (
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="button button-primary"
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="nav-link">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;