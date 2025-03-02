import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons
import axios from "axios";
import "../style/UserDetailPageStyle.css";
import Loader from "./Loader";
import toast from "react-hot-toast";

const UserDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [latestParameters, setLatestParameters] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(false);
  const stressLabels = ["Normal", "Medium-Normal", "Medium", "Medium-High", "High"];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".analytics-card") && !event.target.closest(".feedback-card") && !event.target.closest(".admin-action-buttons")) {
        setShowFeedback(false);
        setShowAnalytics(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const getAllUsersData = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}api/admin/getUsers`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            }
        );

        if (response.status !== 200) {
            throw new Error("Failed to fetch user data");
        }

        const usersData = response.data;
        console.log("Fetched Users Data:", usersData);
        // toast.success("Users Fetched Successfully!", {
        //     position: "top-center",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //   });
        navigate("/AllUserList", { state: { users: usersData.users } });
    } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
};


  const handleDeleteUser = async () => {
    if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
      setLoading(true);
      console.log(user._id);
      let userid = user._id;

      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}api/admin/deleteUser`,
          {
            data: { id: userid },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to delete user");
        }
        toast.success("User Deleted Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getAllUsersData();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const viewUserFeedback = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/admin/particularUserFeedback`,
        { userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to fetch user feedback");
      }

      setFeedbackData(response.data.feedbacks || []);
      setShowFeedback(true);
      setShowAnalytics(false);
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      alert("Failed to fetch user feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const viewUserAnalytics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/admin/getLatestUserParameters`,
        {
          withCredentials: true, // Include credentials if required
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      
      if (response.status !== 200 || !response.data.latestParameters) {
        throw new Error("Failed to fetch user analytics");
      }

      // Find analytics for the selected user
      const userAnalytics = response.data.latestParameters.find(
        (param) => param.userId === user._id
      );

      if (userAnalytics) {
        setLatestParameters(userAnalytics.latestParameter);
        setShowAnalytics(true);
        setShowFeedback(false);
      } else {
        setLatestParameters(null); // No data available
        setShowAnalytics(true); // Show the message instead of an alert
        setShowFeedback(false);
      }
    } catch (error) {
      console.error("Error fetching user analytics:", error);
      alert("Failed to fetch user analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to render stars for rating
  const renderStars = (rating) => {
    const maxStars = 5;
    return (
      <span className="star-rating">
        {Array.from({ length: maxStars }).map((_, index) =>
          index < rating ? (
            <FaStar key={index} color="#FFD700" size={20} />
          ) : (
            <FaRegStar key={index} color="#ccc" size={20} />
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
                <td>{user.firstName ?? "- -"} </td>
              </tr>
              <tr>
                <td className="admin-detail-title">Last Name:</td>
                <td>{user.lastName  ?? "- -"}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Age:</td>
                <td>{user.age  ?? "- -"}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Email Id:</td>
                <td>{user.email  ?? "- -"}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Gender:</td>
                <td>{user.gender  ?? "- -"}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Date of Birth:</td>
                <td>{new Date(user.DateOfBirth).toLocaleDateString("en-IN")  ?? "- -"}</td>
              </tr>
              <tr>
                <td className="admin-detail-title">Contact Number:</td>
                <td>{user.phone  ?? "- -"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div className="feedback-card">
          <h3>{user.username}'s Feedback</h3>
          {loading ? (
            <Loader /> // Show loader when fetching feedback
          ) : feedbackData.length > 0 ? (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Feedback No.</th>
                  <th>Category</th>
                  <th>What They Liked</th>
                  <th>Improvement Needed</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr key={index} className={index === feedbackData.length - 1 ? "latest-feedback" : ""}>

                    <td>
                      {index + 1}{" "}
                      {index === feedbackData.length - 1 && <span className="latest-indicator">Latest</span>}
                    </td>
                    <td>{feedback.category || "N/A"}</td>
                    <td>{feedback.whatyouLoved || "N/A"}</td>
                    <td>{feedback.improvementNeeded || "N/A"}</td>
                    <td>{renderStars(feedback.rating || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-analytics-message">No feedback available.</p>
          )}
        </div>
      )}



      {/* Analytics Section */}
      {showAnalytics && (
        <div className="analytics-card">
          <h3>{user.username}'s Latest Stress Data</h3>
          {loading ? (
            <Loader /> // Show loader when fetching analytics
          ) : latestParameters ? (
            <table className="feedback-table abc">
              <tbody>
                <tr>
                  <th>Parameters</th>
                  <th>Values</th>
                </tr>
                <tr>
                  <td className="analytics-key">Snoring Range:</td>
                  <td>{latestParameters.snoring_range} DB</td>
                </tr>
                <tr>
                  <td className="analytics-key">Respiration Rate:</td>
                  <td>{latestParameters.respiration_rate} BPM</td>
                </tr>
                <tr>
                  <td className="analytics-key">Body Temperature:</td>
                  <td>{latestParameters.body_temperature} °C</td>
                </tr>
                <tr>
                  <td className="analytics-key">Limb Movement:</td>
                  <td>{latestParameters.limb_movement} PLMI</td>
                </tr>
                <tr>
                  <td className="analytics-key">Blood Oxygen:</td>
                  <td>{latestParameters.blood_oxygen} %</td>
                </tr>
                <tr>
                  <td className="analytics-key">Heart Rate:</td>
                  <td>{latestParameters.heart_rate} BPM</td>
                </tr>
                <tr>
                  <td className="analytics-key">Sleep Duration:</td>
                  <td>{latestParameters.sleep_duration} hours</td>
                </tr>
                <tr>
                  <td className="analytics-key">Weight:</td>
                  <td>{latestParameters.weight} Kg</td>
                </tr>
                <tr>
                  <td className="analytics-key">Stress Level:</td>
                  <td>{stressLabels[latestParameters.stress_level]}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="no-analytics-message">No stress data available.</p>
          )}
        </div>
      )}



      {/* Action Buttons */}
      <div className="admin-action-buttons">
        <button className="admin-delete-btn" onClick={handleDeleteUser} disabled={loading}>
          Delete User
        </button>
        <button className="admin-analytics-btn" onClick={viewUserAnalytics}>
          View Latest Stress Data
        </button>
        <button className="admin-analytics-btn" onClick={viewUserFeedback}>
          View Feedback
        </button>
      </div>
    </main>
  );
};

export default UserDetailPage;
