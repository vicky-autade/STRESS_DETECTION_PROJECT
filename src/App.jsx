import React from 'react';
import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
// Import your page components
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignUpPage';
//import Header from './components/pages/layout/Layout';
import HomePage from './components/pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import First from './components/pages/First';
import Header from './components/pages/layout/Header';
import Footer from './components/pages/layout/Footer';





// App Component
//commit by vicky
const App=()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="app-container">
      <div className="header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div>    
           <Routes>
                  <Route path="/" element={<HomePage/>}></Route>   
                  <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="/first" element={<PrivateRoute isLoggedIn={isLoggedIn}><First/></PrivateRoute>}/>
          </Routes>
             
      </div>
     <div className="footer">
          <Footer /> 
    </div>
    </div>
  );
}

export default App;

