import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
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
    console.log('Form submitted:', formData);
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="signup-wrapper">
          <div className="signup-image">
            <img src="/images/meditation.svg" alt="Peaceful meditation illustration" />
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Start your stress management journey today</p>
            </div>

            <div className="form-columns">
              <div className="form-group animate-in">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group animate-in">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
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

            <div className="form-group animate-in">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            <button type="submit" className="submit-btn animate-in">
              Create Account
            </button>
          </form>
        </div>

        <p className="login-link animate-in">
          Already have an account? <Link to="/login">Login here</Link>
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

        .signup-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .signup-image {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #3498db, #2c3e50);
        }

        .signup-image img {
          max-width: 100%;
          height: auto;
          animation: fadeIn 1.2s ease-out;
        }

        .signup-form {
          padding: 2.5rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          animation: fadeInDown 0.8s ease-out;
        }

        .form-header p {
          color: #7f8c8d;
          font-size: 1.1rem;
          animation: fadeIn 1s ease-out;
        }

        .form-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
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
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .login-link {
          margin-top: 1.5rem;
          text-align: center;
          color: #7f8c8d;
          animation: fadeIn 1s ease-out;
        }

        .login-link a {
          color: #3498db;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-link a:hover {
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
          .signup-wrapper {
            grid-template-columns: 1fr;
          }

          .signup-image {
            padding: 1.5rem;
          }

          .signup-form {
            padding: 1.5rem;
          }

          .form-header h2 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .content-container {
            padding: 1rem;
          }

          .form-columns {
            grid-template-columns: 1fr;
          }

          .form-header h2 {
            font-size: 1.5rem;
          }

          .form-group input {
            padding: 0.875rem;
          }
        }
      `}</style>
    </main>
  );
}

export default SignUpPage;

