import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/RecommandationStyle.css";
import Loader from "./Loader";

const RecommendationPage = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/reccomdation/getLatestRecommendation`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        const rec = response.data.recommendation;
        console.log(">>>>>>>>>>>>>>"+rec);
        // Only show recommendations if actionRequired is true
        if (rec ) {
          setRecommendations(rec.recommendationText || []);
        } else {
          // Otherwise, clear any recommendations
          setRecommendations([]);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendation-page">
      <h1 className="recommendation-title">Recommendations for a Healthier Life</h1>
      <div className="recommendation-container" disabled={loading}>
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
      {loading && <Loader />}
    </div>
  );
};

export default RecommendationPage;
