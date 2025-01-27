import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import resetPasswordImage from '../assets/lock.png'; // Placeholder image for reset password page
import '../style/LoginPageStyle.css';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Step for controlling form fields
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/requestResetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Verification email sent successfully!");
        setStep(2); // Show password fields after email verification
      } else {
        toast.error("Error sending verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password, token }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successful!");
        navigate("/login");
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

          <form onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit} className="login-form">
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

            <button type="submit" className="submit-btn animate-in">
              {step === 1 ? "Verify Email" : "Reset Password"}
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
    </main>
  );
};

export default ResetPasswordPage;
