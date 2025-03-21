import React, { useEffect } from "react";
import { HeartPulse, Brain, Shield, ArrowRight } from "lucide-react"; // Icons for sections
import "../style/AboutPageStyle.css";
import aboutHeaderImage from "../assets/about-header1.jpg"; // Header image
import aboutImage from "../assets/web_logo.jpg"; // Existing image

const About = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  return (
    <div className="about-container">
      {/* Header Section with Image and Text Overlay */}
      <div className="about-header">
        <img src={aboutHeaderImage} alt="About Us" className="header-image" />
        <div className="header-overlay"></div>
        <div className="header-content">
          <h2 className="about-title">About Us</h2>
          <p className="about-subtitle">
            Innovating for a healthier, stress-free life.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="about-content">
        <div className="about-image-container">
          <img src={aboutImage} alt="About Us" className="about-image" />
        </div>
        <div className="about-text-container">
          <p className="about-text">
            Welcome to the Stress Research Analyzer, an innovative solution designed to analyze sleep patterns and physiological parameters to classify stress levels. Our system uses advanced machine learning algorithms to provide accurate and insightful stress analysis based on real-time data.
          </p>
          <p className="about-text">
            Our mission is to assist individuals in better understanding their stress patterns and improving overall well-being by leveraging technology and scientific research.
          </p>
          <p className="about-text">
            Join us in our journey to promote mental health and a balanced lifestyle.
          </p>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="about-features">
        <div className="feature-item">
          <HeartPulse size={40} className="feature-icon" />
          <h3 className="feature-title">Health Monitoring</h3>
          <p className="feature-text">
            Track your sleep and stress levels with precision.
          </p>
        </div>
        <div className="feature-item">
          <Brain size={40} className="feature-icon" />
          <h3 className="feature-title">Advanced Algorithms</h3>
          <p className="feature-text">
            Powered by cutting-edge machine learning.
          </p>
        </div>
        <div className="feature-item">
          <Shield size={40} className="feature-icon" />
          <h3 className="feature-title">Data Security</h3>
          <p className="feature-text">
            Your data is protected with top-tier encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;