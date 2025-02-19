import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminPageStyle.css";
import usersImage from "../assets/users.png";
import statsImage from "../assets/stats.png";
import trainModelImage from "../assets/train_model.png";
import notificationImage from "../assets/notification.png";
import axios from "axios";

const AdminHomePage = () => {
    const [notification, setNotification] = useState({
        title: "",
        body: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const getAllUsersData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}api/admin/getUsers`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error("Failed to fetch user data");
            }

            const usersData = response.data;
            console.log("Fetched Users Data:", usersData);
            navigate("/AllUserList", { state: { users: usersData.users } });
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Failed to fetch user data. Please try again.");
        }
    };

    const sendNotification = async () => {
        if (!notification.title || !notification.body) {
            alert("Please enter both title and message.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}api/send-notification`,
                notification,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Notification sent:", response.data);
            alert("Notification sent successfully!");
            setNotification({ title: "", body: "" });
        
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Failed to send notification.");
           
        }
    };

    const AdminStatistic =()=>{
        navigate("/adminStatistics");
    }

    return (
        <main className="admin-page-container">
            <div className="admin-content-wrapper">
                <div className="admin-section-group">
                    {/* Get All Users Data Section */}
                    <div className="admin-data-section">
                        <h2>Get All Users Data</h2>
                        <p>Retrieve and view detailed information of all users.</p>
                        <button className="admin-button-primary" onClick={getAllUsersData}>
                            Get Users Data
                        </button>
                        <img src={usersImage} alt="Users Data" className="admin-section-image" />
                    </div>

                    {/* View Statistics Section */}
                    <div className="admin-data-section">
                        <h2 className="admin-text-center">Statistics</h2>
                        <p>Analyze user data and view detailed statistics.</p>
                        <button className="admin-button-primary" onClick={AdminStatistic}>View Statistics</button>
                        <img src={statsImage} alt="Statistics" className="admin-section-image" />
                    </div>

                    {/* Train Model Section */}
                    <div className="admin-data-section">
                        <h2>Train Model</h2>
                        <p>Train and improve the machine learning model.</p>
                        <button className="admin-button-primary">Train Model</button>
                        <img src={trainModelImage} alt="Train Model" className="admin-section-image" />
                    </div>

                    {/* Send Notification Section */}
                    <div className="admin-data-section noti">
                        <h2>Send Notifications</h2>
                        <p>Send important notifications to users.</p>
                        <input
                            type="text"
                            placeholder="Notification Title"
                            value={notification.title}
                            onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                            className="admin-input"
                        />
                        <input

                            placeholder="Notification Message"
                            value={notification.body}
                            onChange={(e) => setNotification({ ...notification, body: e.target.value })}
                            className="admin-msg"
                        />
                        <button className="admin-button-primary" onClick={sendNotification}>
                            Send Notification
                        </button>
                        <img src={notificationImage} alt="Send Notification" className="admin-section-image" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminHomePage;
