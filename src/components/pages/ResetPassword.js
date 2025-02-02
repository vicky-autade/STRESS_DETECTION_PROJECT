
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import resetPasswordImage from '../assets/lock.png'; // Placeholder image for reset password page
import '../style/LoginPageStyle.css';
import axios from 'axios'; 
import Loader from "./Loader";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Step for controlling form fields
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/requestResetPassword`, {
        email: formData.email,
      });
      
      const data = await response.data;
      console.log("Response Data requestResetPassword : "+data);
      console.log("is valid check :"+data.sucess);
      if (data.sucess) {
        toast.success("Verification email sent successfully!");
        // setStep(2); // Show password fields after email verification
      } else {
        console.log("In else requestResetPassword");
        toast.error("Error sending verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }finally {
      setLoading(false); // Hide loader after API call finishes
    }
  };

  // Remove handlePasswordSubmit function and instead handle password reset logic here if needed

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="login-wrapper">
          <div className="login-image">
            <img src={resetPasswordImage} alt="Password reset illustration" />
          </div>

          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="form-header">
              <h2>{step === 1 ? "Verify Your Email" : "Reset Your Password"}</h2>
              <p>{step === 1 ? "Enter your email to receive a verification link" : "Enter your new password below"}</p>
            </div>

            {step === 1 ? (
              <div className="form-group animate-in">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>
            ) : (
              <>
                <div className="form-group animate-in">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    disabled
                  />
                </div>

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
              </>
            )}

            <button type="submit" className="submit-button animate-in">
              {loading ? "Processing..." : step === 1 ? "Verify Email" : "Reset Password"}
            </button>

            {step === 1 ? (
              <p className="signup-link animate-in">
                Remembered your password? <Link to="/login">Login</Link>
              </p>
            ) : (
              <p className="signup-link animate-in">
                Remember your password? <Link to="/login">Login</Link>
              </p>
            )}
          </form>
        </div>
      </div>
      {loading && <Loader />} {/* Show loader when loading is true */}

    </main>
  );
};

export default ResetPasswordPage;

