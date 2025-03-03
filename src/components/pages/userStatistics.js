import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../style/UserStatisticsStyle.css";
import Loader from "./Loader";

const UserStatistics = () => {
    const [parameters, setParameters] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://stress-detection-backend.vercel.app/api/parameters/latest");
                if (response.data && response.data.parameters) {
                    setParameters(response.data.parameters);
                }
            } catch (error) {
                console.error("Error fetching parameters: ", error);
            }
        };

        const fetchHistory = async () => {
            try {
                const response = await axios.get("https://stress-detection-backend.vercel.app/api/parameters/history");
                if (response.data && response.data.parameters) {
                    setHistory(response.data.parameters);
                }
            } catch (error) {
                console.error("Error fetching historical parameters:", error);
            }
        };

        Promise.all([fetchData(), fetchHistory()]).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!history || history.length === 0) {
        return <div className="user-statistics-container">No data available</div>;
    }

    const formatData = (key) => {
        return history.map((entry) => ({
            name: new Date(entry.recordedAt).toLocaleString(),
            value: entry[key] !== undefined ? entry[key] : 0,
        })).reverse();
    };

    const getStatus = (key, value) => {
        const ranges = {
            snoring_range: [0, 30, 60],
            respiration_rate: [12, 20, 30],
            body_temperature: [36.1, 37.2, 38],
            limb_movement: [0, 10, 20],
            blood_oxygen: [90, 95, 100],
            heart_rate: [60, 100, 110],
            sleep_duration: [4, 7, 9]
        };

        if (!ranges[key]) return "N/A";
        if (value <= ranges[key][0]) return "Low";
        if (value <= ranges[key][1]) return "Normal";
        return "High";
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Low": return "status-low";
            case "Normal": return "status-normal";
            case "High": return "status-high";
            default: return "";
        }
    };

    const parametersList = [
        "snoring_range",
        "respiration_rate",
        "body_temperature",
        "limb_movement",
        "blood_oxygen",
        "heart_rate",
        "sleep_duration",
        "weight"
    ];

    const tableParameters = [...parametersList, "stress_level", "weight"];

    return (
        <div className="user-statistics-container">
            <h2 className="user-statistics-title">User Statistics</h2>
            {parameters ? (
                <table className="user-statistics-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Latest Value</th>
                             <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(parameters)
                            .filter(([key]) => tableParameters.includes(key))
                            .map(([key, value]) => {
                                const status = getStatus(key, value);
                                return (
                                    <tr key={key}>
                                        <td><strong>{key.replace(/_/g, " ").toUpperCase()}</strong></td>
                                        <td className="latVal">{value}</td>
                                        <td><span className={`status-box ${getStatusClass(status)}`}>{status}</span></td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}

            <div className="charts-section">
                {parametersList.map((param, index) => (
                    <div key={param} className={`chart-wrapper ${index % 2 === 0 ? "even-chart" : "odd-chart"}`}>
                        <div className="chart-container">
                            <h1>{param.replace(/_/g, " ").toUpperCase()}</h1>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={formatData(param)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" hide={true} interval={0} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#3498db" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserStatistics;