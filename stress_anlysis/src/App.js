import React,{useState} from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

// Import your page components
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignUpPage';
import Header from './components/pages/layout/Layout';
import HomePage from './components/pages/HomePage';


// const [isLoggedIn, setIsLoggedIn] = useState(false);
// 
// Layout Component
const Layout = Header;
// Home Page Component
const HomePages = HomePage;


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePages/></Layout>
  },
  {
    path: "/login",
    element: <Layout><LoginPage/></Layout>
  },
  {
    path: "/signup",
    element: <Layout><SignupPage/></Layout>
  }
]);

// App Component
function App() {
  return (
    <>
    {/* <Header/> */}
      <RouterProvider router={router} />
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h1 {
          margin: 0;
          font-size: 1.5rem;
          color: #2c3e50;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
        }

        .nav-link {
          text-decoration: none;
          color: #3498db;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background: #f8f9fa;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          background: #f8f9fa;
        }

        .home-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 2rem;
        }

        .home-content h1 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .home-content p {
          color: #7f8c8d;
          font-size: 1.1rem;
        }

        .footer {
          background: white;
          padding: 1rem;
          text-align: center;
          color: #7f8c8d;
          box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .nav-links {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
      {/* <Footer/> */}
    </>
  );
}

export default App;

