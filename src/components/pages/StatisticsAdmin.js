import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "../style/AdminStatistics.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import Loader from "./Loader";

const AdminStatistics = () => {
  const [ratingData, setRatingData] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [avgRating, setAvgRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState({ "Bug Report": [], "Feature Request": [], "General": [], "Other": [] });
  const [selectedFeedback, setSelectedFeedback] = useState("Bug Report");
  const [genderData, setGenderData] = useState({ Male: 0, Female: 0, Other: 0 });
  const [stressData, setStressData] = useState([]);
  const [loading, setLoading] = useState(false);

  const stressLabels = ["Normal", "Medium-Normal", "Medium", "Medium-High", "High"];
  const stressColors = ["#4CAF50", "#FFC107", "#FF9800", "#FF5722", "#D32F2F"];

  useEffect(() => {
    setLoading(true);
    const fetchFeedback = axios.get("https://stress-detection-backend.vercel.app/api/admin/getFeedbackStats");
    const fetchGender = axios.get("https://stress-detection-backend.vercel.app/api/admin/getUserGenderCount");
    const fetchStress = axios.get("https://stress-detection-backend.vercel.app/api/admin/getsimilarstressedusers");

    Promise.all([fetchFeedback, fetchGender, fetchStress])
      .then(([feedbackRes, genderRes, stressRes]) => {
        if (feedbackRes.data && feedbackRes.data.ratingCount) {
          setRatingData(feedbackRes.data.ratingCount);
          const total = Object.entries(feedbackRes.data.ratingCount).reduce((sum, [rating, count]) => sum + Number(rating) * count, 0);
          const countTotal = Object.values(feedbackRes.data.ratingCount).reduce((sum, count) => sum + count, 0);
          setAvgRating(countTotal ? (total / countTotal).toFixed(1) : 0);
          
          const feedbackCategories = { "Bug Report": [], "Feature Request": [], "General": [], "Other": [] };
          feedbackRes.data.latestFeedback.forEach((item) => {
            if (feedbackCategories[item.category]) {
              feedbackCategories[item.category].push(item);
            } else {
              feedbackCategories["Other"].push(item);
            }
          });
          setUserFeedback(feedbackCategories);
        }

        if (genderRes.data && genderRes.data.counts) {
          setGenderData(genderRes.data.counts);
        }

        if (stressRes.data && stressRes.data.stressLevels) {
          setStressData(stressRes.data.stressLevels);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const renderChart = (data, title) => (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      {data.length > 0 ? (
        <>
          <PieChart data={data} animate animationDuration={800} radius={45} />
          <div className="chart-legend-container">
            {data.map((entry, index) => (
              <div key={index} className="legend-item-box">
                <span className="legend-color-box" style={{ backgroundColor: entry.color }}></span>
                <strong>{entry.title}</strong>:<b> {entry.value}</b>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );

  const ratingColors = {
    1: "#FF3D00", // Red
    2: "#FF9800", // Orange
    3: "#FFC107", // Yellow
    4: "#8BC34A", // Light Green
    5: "#4CAF50", // Dark Green
  };
  
  const ratingChart = Object.entries(ratingData)
    .filter(([_, count]) => count > 0)
    .map(([rating, count]) => ({
      title: `Rating ${rating}`,
      value: count,
      color: ratingColors[rating] || "#CCCCCC", // Default gray if rating is unexpected
    }));

  const genderChart = Object.entries(genderData).filter(([_, count]) => count > 0).map(([gender, count]) => ({
    title: gender,
    value: count,
    color: gender === "Male" ? "#007bff" : gender === "Female" ? "#ff69b4" : "#a9a9a9",
  }));

  const stressChart = stressData.filter((level) => level.count > 0).map((level) => ({
    title: stressLabels[level.stressLevel],
    value: level.count,
    color: stressColors[level.stressLevel],
  }));


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} color="#FFD700" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} color="#FFD700" />
        ))}
      </div>
    );
  };


  return (
    <div className="admin-stats-container">
      <h2>User Data Statistics</h2>
      <div className="avg-rating-display">
        <h3>Average Rating: {avgRating}</h3>
        {renderStars(avgRating)}
      </div>
      <div className="pie-chart-section">
        {renderChart(ratingChart, "Ratings Distribution")}
        {renderChart(genderChart, "Gender Distribution")}
        {renderChart(stressChart, "Stress Level Distribution")}
      </div>
      <div className="stats-section">
        <h3>Feedback Categories</h3>
        <div className="feedback-buttons-container">
          {Object.keys(userFeedback).map((category) => (
            <button key={category} onClick={() => setSelectedFeedback(category)}>{category}</button>
          ))}
        </div>
        <div className="feedback-list-container">
          {userFeedback[selectedFeedback].length > 0 ? userFeedback[selectedFeedback].map((item, index) => (
            <div key={index} className="feedback-card-box">
              <p><strong>What you loved:</strong> {item.whatyouLoved}</p>
              <p><strong>Improvement needed:</strong> {item.improvementNeeded}</p>
            </div>
          )) : <p>No feedback available for {selectedFeedback}</p>}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default AdminStatistics;
