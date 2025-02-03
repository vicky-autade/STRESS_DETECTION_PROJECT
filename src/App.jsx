import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
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



const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setupAxiosInterceptors(navigate, setIsLoggedIn);
  }, [navigate]);

  return (
    <div className="app-container">
      <div className="header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      </div>
      <div>    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/first" element={<PrivateRoute isLoggedIn={isLoggedIn}><First setIsLoggedIn={setIsLoggedIn} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn}><Profile user={user} setUser={setUser}/></PrivateRoute>} /> 
          <Route path="/input-data" element={<PrivateRoute isLoggedIn={isLoggedIn}><InputData/></PrivateRoute>} /> 
          <Route path="/recommandation" element={<PrivateRoute isLoggedIn={isLoggedIn}><Recommandation/></PrivateRoute>} /> 
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
