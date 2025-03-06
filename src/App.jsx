import React, { useState, useEffect, Component } from 'react';
import { Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import './App.css';
// import axios from "axios";
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignUpPage';
import HomePage from './components/pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import First from './components/pages/First';
import Header from './components/pages/layout/Header';
import Footer from './components/pages/layout/Footer';
import ResetPassword from './components/pages/ResetPassword';
import Profile from './components/pages/profilePage';
import InputData from './components/pages/InputData';
import ConfirmPassword from './components/pages/confirm-password';
import { setupAxiosInterceptors } from './components/api/axiosClient';
import Recommandation from './components/pages/RecommandationPage'; 
import Feedback from './components/pages/Feedback'; 
import AdminHomePage from './components/pages/AdminHomePage'; 
import UserListPage from './components/pages/GetAllUserData'; 
import UserDetailPage from './components/pages/SingleUserDetailsPage';
import AdminStatistics from './components/pages/StatisticsAdmin';
import Loader from './components/pages/Loader';
import "./components/style/Loader.css";
import UserStatistics from './components/pages/userStatistics';
import About from './components/pages/About';
import AdminUserStatistics from './components/pages/AdminUserStatistics';
import PrivacyPage from './components/pages/PrivacyPolicyPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const userRole = localStorage.getItem("userRole"); // Get role from localStorage
  const [fcmToken, setFcmToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const expiry = localStorage.getItem("jwt_expiry");
    const storedUser = localStorage.getItem("user");
    console.log("Token:", token);
    console.log("Expiry:", expiry, "Current Time:", new Date().getTime());
    console.log("Stored User:", storedUser);
    // Check if token exists and is not expired
    if (token && expiry && new Date().getTime() < Number(expiry) && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser)); // Restore user data safely
    } else {
      console.log("Token expired or missing, clearing localStorage...");
      localStorage.removeItem("jwt");
      localStorage.removeItem("jwt_expiry");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false); // Mark as loaded
  }, []);
  if (loading) {
    return <Loader />// Prevent routing issues before auth check completes
  }

  return (
    <div className="app-container">
      <div className="header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      </div>
      <div>    
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/login" element={<LoginPage  fcmToken={fcmToken}  setFcmToken={setFcmToken}  isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}  user={user} setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><Profile user={user} setUser={setUser}/></PrivateRoute>} /> 
          <Route path="/about" element={<About/>} /> 
          <Route path="/privacyPolicy" element={<PrivacyPage/> }/>
          {/* Routes for Normal Users */}
          {userRole === "nonAdmin" && (
            <>
              <Route path="/first" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><First setIsLoggedIn={setIsLoggedIn} /></PrivateRoute>} />
              <Route path="/input-data" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><InputData user={user} /></PrivateRoute>} /> 
              <Route path="/userStatistics" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><UserStatistics user={user} /></PrivateRoute>} /> 
              <Route path="/recommandation" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><Recommandation  user={user} setUser={setUser}/></PrivateRoute>} />
              <Route path="/feedback" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><Feedback/></PrivateRoute>} /> 
              {/* <Route path="/about" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><About/></PrivateRoute>} /> 
              <Route path="/privacyPolicy" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><PrivacyPage/></PrivateRoute>} />  */}
            </>
          )}

          {/* Routes for Admins */}
          {userRole === "admin" && (
            <>
            <Route path="/Admin-userStatistics" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><AdminUserStatistics /></PrivateRoute>} /> 
              <Route path="/admin" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><AdminHomePage/></PrivateRoute>} />
              <Route path="/adminStatistics" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><AdminStatistics/></PrivateRoute>} /> 
              <Route path="/AllUserList" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><UserListPage/></PrivateRoute>} /> 
              <Route path="/UserDetailPage" element={<PrivateRoute isLoggedIn={isLoggedIn} loading={loading}><UserDetailPage/></PrivateRoute>}
               /> 
            </>
          )}
          

        </Routes>
      </div>
      {/* {loading && <Loader />} Show loader when loading is true */}
      <div className="footer">
        <Footer isLoggedIn={isLoggedIn} user={user}/>
      </div>
    </div>
  );
}



export default App;
