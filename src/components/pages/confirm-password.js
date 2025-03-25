import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import resetPasswordImage from '../assets/lock.png'; // Placeholder image for reset password page
import '../style/LoginPageStyle.css';
import axios from 'axios';
import Loader from './Loader';

const ResetPasswordPage = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // If the token is not present in the URL, redirect to login
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired link.");
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    try {
      // Send the password and token to the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/resetpassword`, {
        newPassword: formData.password, // Password entered by the user
        token, // Token from the URL
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      const data = response.data;
      // Handle response from the backend
      if (data.sucess) {
        toast.success("Password reset successful!");
        navigate("/login"); // Redirect user to login page
      } else {
        toast.error("Error resetting password. Please try again.");
      }
    } catch (error) {
      
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    }finally {
      setLoading(false); // Hide loader after API call finishes
    }
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="login-wrapper">
          <div className="login-image">
            <img src={resetPasswordImage} alt="Password reset illustration" />
          </div>

          <form onSubmit={handlePasswordSubmit} className="login-form">
            <div className="form-header">
              <h2>Reset Your Password</h2>
              
              <p style={{marginTop:"20px"}}>Enter your new password below</p>
            </div>

            {/* Password field */}
            <div className="form-group password-field animate-in">
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </span>
              </div>
            </div>

            {/* Confirm password field */}
            <div className="form-group password-field animate-in">
              <div className="input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-button animate-in">
               {loading ? "Processing" : "Reset Password"} 
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader />} {/* Show loader when loading is true */}  
    </main>
  );
};

export default ResetPasswordPage;
