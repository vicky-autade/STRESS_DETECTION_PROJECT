import React, { useState, useEffect } from "react";
import "../style/RecommandationStyle.css";

const RecommendationPage = () => {
 useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="recommendation-page">
      <h1 className="recommendation-title">Recommendations for a Healthier Life</h1>
      <div className="recommendation-container">
        <div className="recommendation-card">
          <h3>Tip 1</h3>
          <p>Ensure you get at least 7-8 hours of sleep every night.</p>
        </div>
        <div className="recommendation-card">
          <h3>Tip 2</h3>
          <p>Maintain a balanced diet with plenty of fruits and vegetables.</p>
        </div>
        <div className="recommendation-card">
          <h3>Tip 3</h3>
          <p>Exercise regularly to reduce stress and improve sleep patterns.</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
