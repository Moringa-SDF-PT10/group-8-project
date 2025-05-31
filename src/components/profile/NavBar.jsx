import { useContext } from 'react';
// kiarie: Import Link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// kiarie: Assuming you might have a NavBar.css or similar for styling
// import './NavBar.css';


const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-links">
          {/* kiarie: Changed <a> to <Link to="..."> */}
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {user && (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/trips" className="nav-link">Trips</Link>
              <Link to="/itinerary" className="nav-link">Itinerary</Link>
              <Link to="/bookings" className="nav-link">Bookings</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
              {/* kiarie: Added new link for Trip Activities Demo */}
              <Link to="/trip-activities-demo" className="nav-link">Destination & Activities</Link>
            </>
          )}
        </div>
        <div className="nav-actions">
          {user ? (
            <button
              onClick={handleLogout} // kiarie: Use the defined handleLogout function
              className="button button-primary" // Assuming you have these CSS classes
            >
              Logout
            </button>
          ) : (
            <>
              {/* kiarie: Changed <a> to <Link to="..."> */}
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;