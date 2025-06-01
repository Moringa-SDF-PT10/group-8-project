import { useContext } from 'react';
// kiarie: Import Link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// kiarie: Assuming you might have a NavBar.css or similar for styling
// johnson: added import for NavBar styles
import "../../styles/Navbar.css"



const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate after logout
  };
  
  return (
    <nav className="navbar">
      {/* johnson: updated navbar layout */}
        <div><strong>Group Travel Planner</strong></div>
        <div className="nav-links">
          {/* kiarie: Changed <a> to <Link to="..."> */}
          {user ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/trips" className="nav-link">Trips</Link>
              <Link to="/itinerary" className="nav-link">Itinerary</Link>
              <Link to="/bookings" className="nav-link">Bookings</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
              <Link to="/trip-activities-demo" className="nav-link">Destination & Activities</Link>
              <Link onClick={handleLogout} className="nav-link">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
    </nav>
  );
};

export default NavBar;