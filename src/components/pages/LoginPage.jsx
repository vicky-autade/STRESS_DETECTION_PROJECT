import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import loginImage from '../assets/login.png';
import '../style/LoginPageStyle.css';


const LoginPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Printing the form data");
    console.log(formData);
    try {
      console.log("Backend URL: ", process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Log the response data
      console.log("Response: ", data);
      if (data.isValidUser) {
        setIsLoggedIn(true);
        console.log("User Logged in successfully!");
        toast.success("Login successful !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast",
        });
        // Optionally, reset form fields
        setFormData({ name: "", email: "", message: "" });
        Navigate("/first");
      } else {
        console.error("User Login failed!");
        toast.error("Invalid credentials. Please try again.!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }



  };

  const Navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    handleChange(event);
    setFormData((prevData) => (

      {

        ...prevData, [event.target.name]: event.target.value
      }

    ))

  }


  const handleFormSubmit = (event) => {
    handleSubmit(event);
  }

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="login-wrapper">
          <div className="login-image">
            <img src={loginImage} alt="Peaceful meditation illustration" />
          </div>

          <form onSubmit={handleFormSubmit} className="login-form">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your stress management journey</p>
            </div>

            <div className="form-group animate-in">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group password-field animate-in">
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
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

            <div className="form-options animate-in">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#">
                <p className="forgot-password">Forgot Password?</p>
              </Link>
            </div>
            <button type="submit" className="submit-btn animate-in">Login</button>
          </form>
        </div>

        <p className="signup-link animate-in">
          New to Stress Research Analyzer? <Link to="/signup">Create an account</Link>
        </p>
      </div>


    </main>
  );
}

export default LoginPage;
