import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserCircle, FaBars, FaTimes, FaHome, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Added icons
import "./Header.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  let user = props.user;
  let setUser = props.setUser;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref for the sidebar

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to log out from backend");
      }

      localStorage.removeItem("jwt");
      localStorage.removeItem("jwt_expiry");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        handleLogout();
      } else {
        setTimeout(() => {
          handleLogout();
        }, decodedToken.exp * 1000 - Date.now());
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, [navigate]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <header className="header" style={{ paddingRight: "30px" }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 onClick={scrollToTop}>Stress Research Analyzer</h1>
        </Link>
      </div>

      <nav className="nav-links">
        {isLoggedIn ? (
          user.role === "admin" ? (
            <>
              <Link to="/admin" className="nav-link sam">
                Dashboard
              </Link>
              <Link to={isLoggedIn && user.role ? "/profile" : "/login"} className="nav-link">
                {user && user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="profile-icon"
                  />
                ) : (
                  <FaUserCircle className="profile-icon" />
                )}
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/first" className="nav-link sam">
                Home
              </Link>
              <Link to="/profile" className="nav-link">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="profile-icon"
                  />
                ) : (
                  <FaUserCircle className="profile-icon" />
                )}
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          )
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Navigation Elements */}
     {isMobile &&( <div className="mobile-nav">
        {isLoggedIn && (
          <Link to="/profile" className="mobile-profile">
            {user && user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="profile-icon" />
            ) : (
              <FaUserCircle className="profile-icon" />
            )}
          </Link>
        )}
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>
     )}

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && (
        <div className="mobile-sidebar" ref={sidebarRef}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
          {isLoggedIn ? (
            <>
              <Link
                to={user && user.role === "admin" ? "/admin" : "/first"}
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <FaHome className="sidebar-icon" /> {/* Home icon */}
                <span>Home</span>
              </Link>
              <button className="sidebar-link" onClick={handleLogout}>
                <FaSignOutAlt className="sidebar-icon" /> {/* Logout icon */}
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <FaSignInAlt className="sidebar-icon" /> {/* Login icon */}
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserPlus className="sidebar-icon" /> {/* Sign Up icon */}
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;