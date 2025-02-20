import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import loginImage from '../assets/login.png';
import '../style/LoginPageStyle.css';
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

  useEffect(() => {
    console.log("🔄 Setting up foreground notification listener...");
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔔 Foreground message received:", payload);

      // Show toast notification
      toast(payload.notification.body, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeButton: true,
      });

      // Show manual browser notification
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/firebase-logo.png",
          data: { url: payload.data?.url || "https://stress-detection-project.vercel.app" }
        });
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

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
        sendTokenToBackend(token, email);
      } else {
        console.log("⚠ No FCM token received. Check notification permissions.");
      }
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  };

  const sendTokenToBackend = async (token, email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/save-token`, {
        fcmToken: token,
        email: email,
      });
      console.log("✅ Token sent successfully:", response.data);
    } catch (error) {
      console.error("❌ Error sending FCM token:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.data;
      if (data.isValidUser) {
        const token = data.user.token;
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp * 1000;
        localStorage.setItem("jwt", token);
        localStorage.setItem("jwt_expiry", expiresAt);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        setUser(data.user);
        requestPermission(data.user.email);
        setIsLoggedIn(true);
        console.log("🔑 Login successful:", data);
        toast.success("Login successful !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast",
        });
        localStorage.setItem("userRole", data.user.role);
        Navigate(data.user.role === "nonAdmin" ? "/first" : "/admin");
      } else {
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
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="login-wrapper">
          <div className="login-image">
            <img src={loginImage} alt="Peaceful meditation illustration" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your stress management journey</p>
            </div>
            <div className="form-group animate-in">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
            </div>
            <div className="form-group password-field animate-in">
              <div className="input-container-pass">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <span className="password-toggle-icon" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <AiOutlineEyeInvisible fontSize={20} /> : <AiOutlineEye fontSize={20} />}
                </span>
              </div>
            </div>
            <button type="submit" className="submit-button animate-in" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          
           <p className="login-link animate-in">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link">
                          Sign up
                        </Link>
                      </p>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </main>
  );
}


export default LoginPage;
