
import React, { useEffect,useCallback,useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { FaUserCircle } from "react-icons/fa"; // Import profile icon
import "./Header.css";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode for token decoding

const Header = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  
  // Function to scroll to top
  const scrollToTop = () => {
    console.log("Scrolling to top...");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // // Function to log out user
  // const handleLogout = () => {
  //   Cookies.remove("authToken"); // Remove token
  //   setIsLoggedIn(false);
  //   toast.success("Logged out successfully!");
  //   console.log("User logged out.");
  
  // };
  const handleLogout = async () => {
    try {
      // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/logout`, {
      //   method: "POST",
      //   credentials: "include", // Ensure cookies are sent with the request
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // });
  
      // if (!response.ok) {
      //   throw new Error("Failed to log out from backend");
      // }
  
      Cookies.remove("authToken"); // Remove token from cookies
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      console.log("User logged out and removed from backend.");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
  // Function to check token expiration and log out if expired
  const checkTokenExpiration = () => {
    const token = Cookies.get("authToken");
    console.log("Checking token expiration...");
    console.log("Token: ", token);
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      console.log("Current time: ", currentTime);
      console.log("Token expiration: ", decodedToken.exp);  
      if (decodedToken.exp < currentTime) {
        handleLogout(); 
      } else {
        setTimeout(() => {
          handleLogout();
        }, (decodedToken.exp * 1000) - Date.now()); 
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  }; // Add handleLogout as a dependency

  useEffect(() => {
    checkTokenExpiration();
  }, [checkTokenExpiration]);

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
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
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
    </header>
  );
};

export default Header;
