import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons
import axios from "axios";
import "../style/UserDetailPageStyle.css";

const UserDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDeleteUser = () => {
    alert(`User ${user.username} deleted successfully!`);
  };

  const viewUserAnalytics = () => {
    alert(`Viewing analytics for ${user.username}`);
  };

  const viewUserFeedback = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/admin/particularUserFeedback`,
        { userId: user._id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to fetch user feedback");
      }

      setFeedbackData(response.data.feedbacks || []);
      setShowFeedback(true);
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      alert("Failed to fetch user feedback. Please try again.");
    }
  };

  // Function to render stars for rating
  const renderStars = (rating) => {
    const maxStars = 5;
    return (
      <span className="star-rating">
        {Array.from({ length: maxStars }).map((_, index) =>
          index < rating ? (
            <FaStar key={index} color="#FFD700" size={25} />
          ) : (
            <FaRegStar key={index} color="#ccc" size={25} />
          )
        )}
      </span>
    );
  };

  return (
    <main className="admin-detail-container">
      <h2 className="admin-detail-title">{user.username}'s Details</h2>
      <div className="admin-profile-card">
        <div className="admin-profile-photo-container">
          <img
            src={user.profileImage}
            alt={`${user.username}'s profile`}
            className="admin-profile-photo"
          />
        </div>

        <div className="admin-detail-table-container">
          <table className="admin-detail-table">
            <tbody>
              <tr>
                <td className="admin-detail-title">First Name:</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Last Name:</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Email Id:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Gender:</td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Date of Birth:</td>
                <td>{new Date(user.DateOfBirth).toLocaleDateString("en-IN")}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Contact Number:</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div className="feedback-card">
          <h3>{user.username}'s Feedback</h3>
          <div>
            {feedbackData.length > 0 ? (
              feedbackData.map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <p className="rating-container"><strong>Feedback Category:</strong> {feedback.category || "N/A"}</p>
                  <p className="rating-container"><strong>What they Liked:</strong> {feedback.whatyouLoved || "N/A"}</p>
                  <p   className="rating-container"><strong>Improvement Needed:</strong> {feedback.improvementNeeded || "N/A"}</p>
                  <p className="rating-container"><strong>Rating Given:</strong> {renderStars(feedback.rating || 0)}</p>
                </div>
              ))
            ) : (
              <p className="no-feedback-message">No feedback available.</p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="admin-action-buttons">
        <button className="admin-delete-btn" onClick={handleDeleteUser}>
          Delete User
        </button>
        <button className="admin-analytics-btn" onClick={viewUserAnalytics}>
          View Analytics
        </button>
        <button className="admin-analytics-btn" onClick={viewUserFeedback}>
          View Feedback
        </button>
      </div>
    </main>
  );
};

export default UserDetailPage;
