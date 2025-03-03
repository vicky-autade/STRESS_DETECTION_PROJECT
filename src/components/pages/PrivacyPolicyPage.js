import React, { useEffect } from "react";
import '../style/PrivacyPolicyStyle.css';

const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const sections = [
    {
      title: 'Information We Collect',
      text: 'We collect data including sleep patterns, physiological parameters, and user input to analyze stress levels. This information is solely used for research and analytical purposes.'
    },
    {
      title: 'How We Use Your Information',
      text: 'The data collected is used to improve the accuracy of our stress detection model and to provide insights into stress patterns for better health outcomes.'
    },
    {
      title: 'Data Protection',
      text: 'We take appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.'
    }
  ];

  return (
    <div className="privacy-policy-container">
      <h2 className="privacy-policy-title">Privacy Policy</h2>
      <div className="privacy-policy-grid">
        {sections.map((section, index) => (
          <div key={index} className="privacy-policy-box">
            <h2>{section.title}</h2>
            <p className="privacy-policy-text">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;