import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import Loader from "./Loader";
import "../style/AdminStatistics.css";

const AdminStatistics = () => {
  const [ratingData, setRatingData] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [avgRating, setAvgRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState({ 
    "Bug Report": [], 
    "Feature Request": [], 
    "General": [], 
    "Other": [] 
  });
  const [selectedFeedback, setSelectedFeedback] = useState("Bug Report");
  const [genderData, setGenderData] = useState({ Male: 0, Female: 0, Other: 0 });
  const [stressData, setStressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStressUsers, setSelectedStressUsers] = useState([]);

  const stressLabels = ["Normal", "Medium-Normal", "Medium", "Medium-High", "High"];
  const stressColors = ["#4CAF50", "#FFC107", "#FF9800", "#FF5722", "#D32F2F"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const feedbackRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/admin/getFeedbackStats`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        
        if (feedbackRes.data?.ratingCount) {
          setRatingData(feedbackRes.data.ratingCount);
          const total = Object.entries(feedbackRes.data.ratingCount).reduce(
            (sum, [rating, count]) => sum + Number(rating) * count,
            0
          );
          const countTotal = Object.values(feedbackRes.data.ratingCount).reduce((sum, count) => sum + count, 0);
          setAvgRating(countTotal ? (total / countTotal).toFixed(1) : 0);

          const feedbackCategories = { "Bug Report": [], "Feature Request": [], "General": [], "Other": [] };
          feedbackRes.data.latestFeedback.forEach((item) => {
            feedbackCategories[item.category] 
              ? feedbackCategories[item.category].push(item)
              : feedbackCategories["Other"].push(item);
          });
          setUserFeedback(feedbackCategories);
        }

        const genderRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/admin/getUserGenderCount`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (genderRes.data?.counts) setGenderData(genderRes.data.counts);

        const stressRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/admin/getsimilarstressedusers`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (stressRes.data?.stressLevels) setStressData(stressRes.data.stressLevels);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStressLevelClick = (stressLevel) => {
    const selectedUsers = stressData.find(level => level.stressLevel === stressLevel)?.users || [];
    setSelectedStressUsers(selectedUsers);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="#FFD700" />)}
        {hasHalfStar && <FaStarHalfAlt color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="#FFD700" />)}
      </div>
    );
  };

  const renderChart = (data, title) => (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      {data.length > 0 ? (
        <>
          <div className="chart-wrapper">
            <PieChart
              data={data}
              animate
              animationDuration={800}
              radius={45}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{ fontSize: '6px', fill: '#fff' }}
            />
          </div>
          <div className="chart-legend-container">
            {data.map((entry, i) => (
              <div key={i} className="legend-item-box">
                <span className="legend-color-box" style={{ backgroundColor: entry.color }} />
                <strong>{entry.title}</strong>: <b>{entry.value}</b>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-data-placeholder">
          <p>No data available</p>
        </div>
      )}
    </div>
  );

  const StressLevelItem = ({ level }) => (
    <div 
      className="stress-level-item"
      onClick={() => handleStressLevelClick(level.stressLevel)}
    >
      <div className="stress-level-bar" style={{
        backgroundColor: stressColors[level.stressLevel],
        width: `${(level.count / Math.max(...stressData.map(l => l.count), 1) * 100)}%`
      }} />
      <span className="stress-level-label">
        {stressLabels[level.stressLevel]}: {level.count}
      </span>
    </div>
  );

  // Prepare chart data
  const ratingChart = Object.entries(ratingData)
    .filter(([_, count]) => count > 0)
    .map(([rating, count]) => ({
      title: `${rating} Star`,
      value: count,
      color: ["#FF3D00", "#FF9800", "#FFC107", "#8BC34A", "#4CAF50"][rating-1]
    }));

  const genderChart = Object.entries(genderData)
    .filter(([_, count]) => count > 0)
    .map(([gender, count]) => ({
      title: gender,
      value: count,
      color: gender === "Male" ? "#007bff" : gender === "Female" ? "#ff69b4" : "#a9a9a9"
    }));

  const stressChart = stressData
    .filter(level => level.count > 0)
    .map(level => ({
      title: stressLabels[level.stressLevel],
      value: level.count,
      color: stressColors[level.stressLevel]
    }));

  return (
    <div className="admin-stats-container">
      <h2 className="stats-title">User Data Statistics</h2>

      <div className="avg-rating-display">
        <div className="rating-box">
          <h3>Average Rating</h3>
          <div className="rating-value">{avgRating}/5</div>
          {renderStars(avgRating)}
        </div>
      </div>

      <div className="charts-grid">
        {renderChart(ratingChart, "Ratings Distribution")}
        {renderChart(genderChart, "Gender Distribution")}
        {renderChart(stressChart, "Stress Levels")}
      </div>

      <div className="feedback-section">
        <h3>User Feedback</h3>
        <div className="category-selector">
          {Object.keys(userFeedback).map(category => (
            <button
              key={category}
              className={`category-btn ${selectedFeedback === category ? 'active' : ''}`}
              onClick={() => setSelectedFeedback(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="feedback-grid">
          {userFeedback[selectedFeedback].length > 0 ? (
            userFeedback[selectedFeedback].map((item, i) => (
              <div key={i} className="feedback-card">
                <div className="feedback-header">
                  <span className="user-badge">{item.username}</span>
                  <div className="rating-badge">
                    {Array(5).fill().map((_, i) => (
                      <FaStar 
                        key={i}
                        color={i < item.rating ? '#FFD700' : '#ddd'}
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <div className="feedback-content">
                  <p><strong>Liked:</strong> {item.whatyouLoved}</p>
                  <p><strong>Improve:</strong> {item.improvementNeeded}</p>
                </div>
                <div className="feedback-date">
                  {new Date(item.submittedAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="no-feedback">
              No feedback available for {selectedFeedback}
            </div>
          )}
        </div>
      </div>

      <div className="stress-section">
        <h3>User Stress Levels</h3>
        <div className="stress-levels-container">
          {stressData.filter(l => l.count > 0).map(level => (
            <StressLevelItem key={level.stressLevel} level={level} />
          ))}
        </div>
        
        {selectedStressUsers.length > 0 && (
          <div className="users-grid">
            {selectedStressUsers.map(user => (
              <div key={user.userId} className="user-card">
                <img 
                  src={user.profileImage} 
                  alt={user.username}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h4>{user.username || user.firstname}</h4>
                  <p>{user.email}</p>
                  <div className="user-meta">
                    <span>{user.gender}</span>
                    <span>·</span>
                    <span>Lv.{user.stressLevel + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default AdminStatistics;