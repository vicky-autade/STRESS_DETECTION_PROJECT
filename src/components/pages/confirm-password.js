import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import resetPasswordImage from '../assets/lock.png'; // Placeholder image for reset password page
import '../style/LoginPageStyle.css';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    try {
      // Send the password and token to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: formData.password, // Password entered by the user
          token, // Token from the URL
        }),
      });

      const data = await response.json();
      console.log(data.message);
      // Handle response from the backend
      if (data.success) {
        toast.success("Password reset successful!");
        navigate("/login"); // Redirect user to login page
      } else {
        toast.error("Error resetting password. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
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
              <p>Enter your new password below</p>
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

            <button type="submit" className="submit-btn animate-in">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
