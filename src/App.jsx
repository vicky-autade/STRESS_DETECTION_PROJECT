import React, { useState, useEffect } from 'react';
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


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const userRole = localStorage.getItem("userRole"); // Get role from localStorage
  const [fcmToken, setFcmToken] = useState(null);
  // useEffect(() => {
  //   setupAxiosInterceptors(navigate, setIsLoggedIn);
  // }, [navigate]);
 // Restore user session on refresh
 useEffect(() => {
  const token = localStorage.getItem("jwt");
  // const storedUser = localStorage.getItem("user");

  if (token) {
    setIsLoggedIn(true);
    setUser(JSON.parse(storedUser)); // Restore user data

    // Restore last visited page (excluding login/signup)
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage && !["/login", "/signup"].includes(lastPage)) {
      navigate(lastPage);
    }
  }
}, []);

// Track last visited page
useEffect(() => {
  if (isLoggedIn) {
    localStorage.setItem("lastPage", location.pathname);
  }
}, [location, isLoggedIn]);


  return (
    <div className="app-container">
      <div className="header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      </div>
      <div>    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage  fcmToken={fcmToken}  setFcmToken={setFcmToken}  isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}  user={user} setUser={setUser}/>} />
          <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn}><Profile user={user} setUser={setUser}/></PrivateRoute>} /> 

          {/* Routes for Normal Users */}
          {userRole === "nonAdmin" && (
            <>
              <Route path="/first" element={<PrivateRoute isLoggedIn={isLoggedIn}><First setIsLoggedIn={setIsLoggedIn} /></PrivateRoute>} />
              <Route path="/input-data" element={<PrivateRoute isLoggedIn={isLoggedIn}><InputData/></PrivateRoute>} /> 
              <Route path="/recommandation" element={<PrivateRoute isLoggedIn={isLoggedIn}><Recommandation/></PrivateRoute>} />
              <Route path="/feedback" element={<PrivateRoute isLoggedIn={isLoggedIn}><Feedback/></PrivateRoute>} />  
            </>
          )}

          {/* Routes for Admins */}
          {userRole === "admin" && (
            <>
              <Route path="/admin" element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminHomePage/></PrivateRoute>} /> 
              <Route path="/AllUserList" element={<PrivateRoute isLoggedIn={isLoggedIn}><UserListPage/></PrivateRoute>} /> 
              <Route path="/UserDetailPage" element={<PrivateRoute isLoggedIn={isLoggedIn}><UserDetailPage/></PrivateRoute>} /> 
            </>
          )}

        </Routes>
      </div>
      <div className="footer">
        <Footer isLoggedIn={isLoggedIn}/>
      </div>
    </div>
  );
}

export default App;
