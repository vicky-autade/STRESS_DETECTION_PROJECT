import React, { useState, useEffect } from "react";
import "../style/FeedbackPageStyle.css";
import FeedbackImage from "../assets/feedback.png"; // Placeholder for your image path
import { FaStar } from "react-icons/fa";
import axios from "axios";

const FeedbackPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
  

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [improvementSuggestion, setImprovementSuggestion] = useState("");
  const [feedbackType, setFeedbackType] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      console.log("Feedback Data: "); 
      const feedbackData = {
        category:feedbackType,
       whatyouLoved: feedback,
       improvementNeeded: improvementSuggestion,
        rating,
      };
      
      console.log("Cookies: ", localStorage.getItem("jwt"));
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/feedback`,feedbackData, {
        withCredentials: true, // Include cookies
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add token if required
        },
      });
      console.log("Profile Data: ", response.data);
      // Update user state with the new profile data
    } catch (error) {
      console.error("Error fetching profile:", error);
      // toast.error("Failed to load profile data.");
    }
  };

  return (
    <div className="feedback-page-container">
      {/* Left Section */}
      <div className="feedback-left-section">
        <h1>Feel free to drop us your feedback.</h1>
        <img src={FeedbackImage} alt="Feedback Illustration" className="feedback-image" />
      </div>

      {/* Right Form Section */}
      <div className="feedback-form-section">
        <form onSubmit={handleSubmit}>
          {/* Feedback Type Selection */}
          <div className="feedback-type-section">
            <label>Type of Feedback:</label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
            >
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General">General</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Feedback Text Area */}
          <div className="feedback-textarea-section">
            <label>Please tell us your reasons for giving this score:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts..."
            />
          </div>

          {/* Improvement Suggestion Section */}
          <div className="feedback-improvement-section">
            <label>What can we improve?</label>
            <textarea
              value={improvementSuggestion}
              onChange={(e) => setImprovementSuggestion(e.target.value)}
              placeholder="Suggest improvements..."
            />
          </div>

          {/* Star Rating Section */}
          <div className="rating-section">
            <label>How satisfied are you with our service?</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`star ${star <= (hoverRating || rating) ? "filled-star" : ""}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="send-feedback-btn">
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;