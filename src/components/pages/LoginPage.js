import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Form submitted:', formData);
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="login-wrapper">
          <div className="login-image">
            <img src="/images/meditation.svg" alt="Peaceful meditation illustration" />
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your stress management journey</p>
            </div>

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
            <div className="form-group animate-in">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-options animate-in">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="submit-btn animate-in">Login</button>
          </form>
        </div>

        <p className="signup-link animate-in">
          New to Stress Research Analyzer? <Link to="/signup">Create an account</Link>
        </p>
      </div>

      <style jsx>{`
        .page-content {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          animation: fadeInDown 0.8s ease-out;
        }

        .form-header p {
          color: #7f8c8d;
          font-size: 1.1rem;
          animation: fadeIn 1s ease-out;
        }

        .login-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .login-image {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #3498db, #2c3e50);
        }

        .login-image img {
          max-width: 100%;
          height: auto;
          animation: fadeIn 1.2s ease-out;
        }

        .login-form {
          padding: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
        }

        .forgot-password {
          color: #3498db;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: #2980b9;
          text-decoration: underline;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #3498db, #2c3e50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
        }

        .signup-link {
          margin-top: 1.5rem;
          text-align: center;
          color: #7f8c8d;
          animation: fadeIn 1s ease-out;
        }

        .signup-link a {
          color: #3498db;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .signup-link a:hover {
          color: #2980b9;
          text-decoration: underline;
        }

        .animate-in {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .login-wrapper {
            grid-template-columns: 1fr;
          }

          .login-image {
            padding: 1.5rem;
          }

          .login-form {
            padding: 1.5rem;
          }

          .form-header h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .content-container {
            padding: 1rem;
          }

          .form-header h2 {
            font-size: 1.75rem;
          }

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}

export default LoginPage;
