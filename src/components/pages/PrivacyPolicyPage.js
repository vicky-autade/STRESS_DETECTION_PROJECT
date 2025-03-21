import React, { useEffect } from "react";
import { Lock, Shield, Database, User, Share, Key } from "lucide-react"; // Icons for sections
import privacyImage from "../assets/about-header1.jpg"; // Add an image for the header
import dataProtectionImage from "../assets/data-protection.jpg"; // Add an image for the Data Protection section
import thirdPartyImage from "../assets/third-party.jpg"; // Add an image for the Third-Party Sharing section
import "../style/PrivacyPolicyStyle.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  // Expanded data sections with additional details and icons
  const sections = [
    {
      icon: <Database size={40} className="section-icon" />,
      title: "Information We Collect",
      text: "We collect data including sleep patterns, physiological parameters, and user input to analyze stress levels. This information is used solely for research and analytical purposes. Our system also logs device information and app usage to continuously improve our services.",
      additionalInfo:
        "We ensure that all data collection complies with global privacy standards such as GDPR and CCPA.",
    },
    {
      icon: <User size={40} className="section-icon" />,
      title: "How We Use Your Information",
      text: "The data collected is used to improve the accuracy of our stress detection model, provide personalized insights, and deliver targeted health tips. We also use aggregated data for research, trend analysis, and enhancing our product features over time.",
      additionalInfo:
        "Your data is anonymized before being used for research purposes.",
    },
    {
      icon: <Shield size={40} className="section-icon" />,
      title: "Data Protection",
      text: "We implement robust security measures, including encryption, access controls, and secure data storage protocols to protect your information from unauthorized access, alteration, or disclosure.",
      image: dataProtectionImage,
      additionalInfo:
        "Our security protocols are regularly audited by third-party experts.",
    },
    {
      icon: <Share size={40} className="section-icon" />,
      title: "Third-Party Sharing",
      text: "We do not sell your personal data. In certain cases, we may share anonymized or aggregated data with trusted partners to further research and improve our services, but we never share your identifiable personal information.",
      image: thirdPartyImage,
      additionalInfo:
        "All third-party partners are vetted for compliance with privacy laws.",
    },
    {
      icon: <Key size={40} className="section-icon" />,
      title: "Your Rights",
      text: "You have the right to access, update, or delete your personal data. For any concerns or to exercise your rights, please contact us at privacy@stressdetector.com.",
      additionalInfo: "We respond to all data requests within 30 days.",
    },
  ];

  return (
    <div className="privacy-policy-container">
      {/* Header Section */}
      <div className="privacy-header">
        <img src={privacyImage} alt="Privacy Policy" className="header-image" />
        <div className="header-overlay"></div>{" "}
        {/* Overlay for better readability */}
        <div className="header-content">
          <Lock className="privacy-icon" />
          <h2 className="privacy-policy-title">Privacy Policy</h2>
          <p className="privacy-policy-subtitle">
            Your data is safe with us. Learn how we protect your information.
          </p>
        </div>
      </div>

      {/* Timeline Layout for Sections */}
      <div className="timeline-container">
        {sections.map((section, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">{section.icon}</div>
            <div className="timeline-content">
              <h2 className="timeline-title">{section.title}</h2>
              <p className="timeline-text">{section.text}</p>
              {section.additionalInfo && (
                <p className="timeline-additional-info">
                  {section.additionalInfo}
                </p>
              )}
              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  className="timeline-image"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
