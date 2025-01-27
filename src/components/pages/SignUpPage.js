import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../assets/signup.png';
import '../style/SignUpPageStyle.css';

function SignUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    dob: '',
    gender: '',
  });

  const [isEmailPasswordEntered, setIsEmailPasswordEntered] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email' || name === 'password') {
      // Check if both email and password are entered
      if (formData.email && formData.password) {
        setIsEmailPasswordEntered(true);
      } else {
        setIsEmailPasswordEntered(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailPasswordEntered && !isConfirming) {
      setIsConfirming(true);  // Switch to confirm step
    } else {
      // Submit the form when confirming
      console.log('Form submitted:', formData);
    }
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="signup-wrapper">
          <div className="signup-image">
            <img src={signupImage} alt="Peaceful meditation illustration" />
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
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="form-group animate-in">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="gender-select"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group animate-in">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of birth"
                required
              />
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

            {/* Conditional rendering of confirm email field */}
            {isConfirming && (
              <div className="form-group animate-in">
                <input
                  type="text"
                  name="confirmEmail"
                  placeholder="Enter verification code"
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-btn animate-in">
              {isConfirming ? 'Create Account' : 'Confirm Email'}
            </button>

            <p className="login-link animate-in">
              Already have an account? <Link to="/login" className='link'>Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
