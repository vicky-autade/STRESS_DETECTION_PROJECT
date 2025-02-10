import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminPageStyle.css";
import usersImage from "../assets/users.png";
import statsImage from "../assets/stats.png";
import trainModelImage from "../assets/train_model.png";
import axios from "axios";

const AdminHomePage = () => {

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

            // Correctly access the response data
            const usersData = response.data;
            console.log("Fetched Users Data:", usersData);

            // Navigate to the user list page and pass the fetched users
            navigate("/AllUserList", { state: { users: usersData.users } });
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Failed to fetch user data. Please try again.");
        }
    };

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
                        <button className="admin-button-primary">View Statistics</button>
                        <img src={statsImage} alt="Statistics" className="admin-section-image" />
                    </div>

                    {/* Train Model Section */}
                    <div className="admin-data-section">
                        <h2>Train Model</h2>
                        <p>Train and improve the machine learning model.</p>
                        <button className="admin-button-primary">Train Model</button>
                        <img src={trainModelImage} alt="Train Model" className="admin-section-image" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminHomePage;
