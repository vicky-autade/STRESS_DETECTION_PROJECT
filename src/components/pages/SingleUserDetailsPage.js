import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/UserDetailPageStyle.css";
import axios from "axios";

const UserDetailPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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
      // console.log(await response.data);
      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to fetch user feedback");
      }


      setFeedbackData(response.data.feedbacks || []);
      setShowPopup(true); // Show pop-up after fetching data

      // Auto-close the pop-up after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      alert("Failed to fetch user feedback. Please try again.");
    }
  };

  return (
    <main className="admin-detail-container">
      <h1 className="admin-detail-title">User Details</h1>
      <div className="admin-profile-card">
        <div className="admin-profile-photo-container">
          <img
            src={user.profileImage}
            alt={`${user.username}'s profile`}
            className="admin-profile-photo"
          />
          <br />
          <h2 className="admin-detail-name">{user.username}</h2>
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

      {/* Feedback Pop-up */}
      {showPopup && (
        <div className="feedback-popup">
          <h2>User Feedback</h2>
          <div>
            {feedbackData.length > 0 ? (
              feedbackData.map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <p>
                    <strong>Category:</strong> {feedback.category || "N/A"}
                  </p>
                  <p>
                    <strong>What You Loved:</strong>{" "}
                    {feedback.whatyouLoved || "N/A"}
                  </p>
                  <p>
                    <strong>Improvement Needed:</strong>{" "}
                    {feedback.improvementNeeded || "N/A"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {feedback.rating || "N/A"} / 5
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <p className="no-feedback-message">No feedback available.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default UserDetailPage;
