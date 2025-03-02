import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../style/FirstPageStyle.css";
import graph from "../assets/trend.png";
import quiz from "../assets/quiz.png";
import wave from "../assets/wave.png";
import { useNavigate } from "react-router-dom";

const First = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();



    // Check if passwords match
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match.");
    //   return;
    // }
    // const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get("token");
    try {
      // Send the password and token to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/profile`,{method:'GET',credential:'include'});
      if(!response.ok){
        throw new Error("unauthorized or session errios");
      }
      const data = await response.json();
      console.log(data);

      
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later."+error.message);
      window.location.href = '/login';
    }
  };

  const inputFieldsShow =()=>{
      navigate("/input-data");
  }
  const recommandationShow =()=>{
    navigate("/recommandation");
  }
  
  const userStatisticsShow =()=>{
    navigate("/userStatistics");
}

  // Rough work
 

  //////////////////////////////

  return (
    <main className="page-container">
      <div className="content-wrapper">
        <div className="section-group">
          {/* Input Data Section */}
          <div className="data-section">
            <h2>Input Data</h2>
            <p>Provide the necessary data to analyze your stress levels.</p>
            <button className="button-primary" onClick={inputFieldsShow}>Input Data</button>
            <img src={wave} alt="Input Data" className="section-image" />
          </div>
  
          {/* See Recommendation Section */}
          <div className="data-section">
            <h2 className="text-center">Recommendation</h2>
            <p>View recommendations based on your input data.</p>
            <button className="button-primary" onClick={recommandationShow}>See Recommendations</button>
            <img src={quiz} alt="Recommendation" className="section-image" />
          </div>
  
          {/* Show Analytics Section */}
          <div className="data-section">
            <h2>Show Analytics</h2>
            <p>View analytics and trends based on your data.</p>
            <button className="button-primary" onClick={userStatisticsShow}>Show Analytics</button>
            <img src={graph} alt="Analytics" className="section-image" />
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default First;



