import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/RecommandationStyle.css";

const RecommendationPage = () => {
  const location = useLocation();
  // const recommendations = location.state?.recommendations || [];
  const storedRecommendations = localStorage.getItem("latestRecommendations");
  const recommendations = storedRecommendations ? JSON.parse(storedRecommendations) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("recommandation page->>>>>>>>>>>" + recommendations);

  return (
    <div className="recommendation-page">
      <h1 className="recommendation-title">Recommendations for a Healthier Life</h1>
      <div className="recommendation-container">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <div className="recommendation-card" key={index}>
              <h3>Tip {index + 1}</h3>
              <p>{recommendation}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available. Please try submitting your data again.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
