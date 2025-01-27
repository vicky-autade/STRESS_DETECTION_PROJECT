import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { FaUserCircle } from "react-icons/fa"; // Import profile icon
import "./Header.css";

const Header = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  const scrollToTop = () => {
    console.log("Scrolling to top...");
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 onClick={scrollToTop}>Stress Research Analyzer</h1>
        </Link>
      </div>

      <nav className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/profile" className="nav-link">
              <FaUserCircle className="profile-icon" />
            </Link>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged out successfully!");
              }}
              className="logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
           
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
        
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
