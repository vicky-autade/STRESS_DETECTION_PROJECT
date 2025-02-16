import React, { useState } from 'react';
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { data, Link, useNavigate } from "react-router-dom";
import loginImage from '../assets/login.png';
import '../style/LoginPageStyle.css';
import { useEffect } from 'react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Loader from './Loader';
import axios from 'axios';
import { messaging } from "../../firebase-config";
import { getToken, onMessage } from "firebase/messaging";

axios.defaults.withCredentials = true;

const LoginPage = ({ isLoggedIn, setIsLoggedIn, user, setUser, setFcmToken, fcmToken }) => {
  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const Navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestPermission = async (email) => {
    try {
      console.log("Requesting notification permission...");
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("✅ Notification permission granted.");
        getFCMToken(email);
      } else {
        console.log("❌ Notification permission denied.");
      }
    } catch (error) {
      console.error("❌ Error checking notification permission:", error);
    }
  };

  const getFCMToken = async (email) => {
    try {
      console.log("🔄 Waiting for service worker to be ready...");
      const registration = await navigator.serviceWorker.ready;
      const token = await getToken(messaging, { serviceWorkerRegistration: registration });

      if (token) {
        console.log("✅ FCM Token:", token);
        setFcmToken(token);
        sendTokenToBackend(token,email); // Automatically send token
      } else {
        console.log("⚠ No FCM token received. Check notification permissions.");
      }
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  };

  const sendTokenToBackend = async (token,email) => {
    
    try {
      const response = await axios.post("https://stress-detection-backend.vercel.app/api/save-token", {
        fcmToken: token,
        email: email,
      });
      console.log("✅ Token sent successfully:", response.data);
    } catch (error) {
      console.error("❌ Error sending FCM token:", error);
    }
  };

  onMessage(messaging, (payload) => {
    console.log("🔔 Message received:", payload);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Printing the form data");
    console.log(formData);
    try {
      console.log("Backend URL: ", process.env.REACT_APP_BACKEND_URL);
      // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/login`, {
      //   method: "POST",
      //   credentials: "include", // Include cookies
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend Response : " + response.data); // Handle the response data
      console.log("Backend headers : " + response.headers); // Handle the response data
      const data = await response.data;

      // Log the response data
      console.log("Response: ", data);
      if (data.isValidUser) {

        const token = data.user.token;
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp * 1000; // Convert to milliseconds

        // Store token in cookies with expiration
        // Cookies.set("jwt", token, { expires: new Date(expiresAt), secure: true,sameSite:"None",path:"/" });
        // console.log(Cookies.get("jwt"));
        localStorage.setItem("jwt", token);
        localStorage.setItem("jwt_expiry", expiresAt);

        console.log("JWT Token stored in localStorage:", localStorage.getItem("jwt"));
        setUser(data.user);
        requestPermission(data.user.email);
        setIsLoggedIn(true);
        // console.log("User Logged in successfully!");
        toast.success("Login successful !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast",
        });
        // Cookies.set("userId", data.user.id, { expires: 7, secure: true });  // Expires in 7 days
        // Cookies.set("userName", data.user.userName, { expires: 7 });
        // Cookies.set("userRole", data.user.role, { expires: 7 });

        console.log("Login successful, user data stored in cookies.");

        // Optionally, reset form fields
        setFormData({ name: "", email: "", message: "" });
        localStorage.setItem("userRole", data.user.role); // Store user role
        Navigate(data.user.role === "nonAdmin" ? "/first" : "/admin");
      } else {
        console.error("User Login failed!");
        toast.error(data.message, {
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
      console.log("Error message : " + error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

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
    <main className="page-content" >
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
              <div className="input-container-pass">
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
              <Link to="/reset-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            {/* <button type="submit" className="submit-button animate-in">Login</button> */}
            <button type="submit" className="submit-button animate-in" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className="signup-link animate-in">
              New to Stress Research Analyzer? <br></br><Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>


      </div>

      {isLoading && <Loader />}
    </main>
  );
}

export default LoginPage;
