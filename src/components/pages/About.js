import React, { useEffect } from "react";
import '../style/AboutPageStyle.css';
import aboutImage from '../assets/web_logo.jpg';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <div className="about-content">
        <img src={aboutImage} alt="About Us" className="about-image" />
        <p className="about-text">
          Welcome to the Stress Research Analyzer, an innovative solution designed to analyze sleep patterns and physiological parameters to classify stress levels.
          Our system uses advanced machine learning algorithms to provide accurate and insightful stress analysis based on real-time data.
        </p>
        <p className="about-text">
          Our mission is to assist individuals in better understanding their stress patterns and improving overall well-being by leveraging technology and scientific research.
        </p>
        <p className="about-text">
          Join us in our journey to promote mental health and a balanced lifestyle.
        </p>
      </div>
    </div>
  );
};

export default About;
