import React, { useState } from "react";
import "../style/FeedbackPageStyle.css";
import FeedbackImage from "../assets/feedback.png"; // Placeholder for your image path
import { FaStar } from "react-icons/fa";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [improvementSuggestion, setImprovementSuggestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Rating: ${rating}\nFeedback: ${feedback}\nImprovement: ${improvementSuggestion}`);
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
