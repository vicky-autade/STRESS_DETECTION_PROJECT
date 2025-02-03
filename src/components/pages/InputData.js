import React, { useState,useEffect } from "react";
import "../style/inputDataStyle.css";
import meter from "../assets/trend.png";
import { useNavigate } from "react-router-dom";

const InputData = () => {
  
  const navigate = useNavigate();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const [formData, setFormData] = useState({
    snoringRange: "",
    respirationRate: "",
    bodyTemperature: "",
    limbMovement: "",
    bloodOxygenLevels: "",
    eyeMovement: "",
    hoursOfSleep: "",
    heartRate: "",
  });

  const recommandationShow =()=>{
    navigate("/recommandation");
}
  const [stressLevel, setStressLevel] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Logic to calculate stress level based on input data (for demonstration)
    let calculatedStress = Math.random() * 4; // Random stress level between 0 and 4
    setStressLevel(Math.floor(calculatedStress)); // Update stress level state
  };

  return (
    <div className="form-container">
     <div className="input-container">
        <h2>Health Data Input</h2>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="snoringRange">Snoring Range</label>
            <input
              type="number"
              id="snoringRange"
              name="snoringRange"
              value={formData.snoringRange}
              onChange={handleInputChange}
              placeholder="Enter snoring range"
            />
          </div>
          <div className="form-group">
            <label htmlFor="respirationRate">Respiration Rate</label>
            <input
              type="number"
              id="respirationRate"
              name="respirationRate"
              value={formData.respirationRate}
              onChange={handleInputChange}
              placeholder="Enter respiration rate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bodyTemperature">Body Temperature (°C)</label>
            <input
              type="number"
              id="bodyTemperature"
              name="bodyTemperature"
              value={formData.bodyTemperature}
              onChange={handleInputChange}
              placeholder="Enter body temperature"
            />
          </div>
          <div className="form-group">
            <label htmlFor="limbMovement">Limb Movement</label>
            <input
              type="number"
              id="limbMovement"
              name="limbMovement"
              value={formData.limbMovement}
              onChange={handleInputChange}
              placeholder="Enter limb movement"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodOxygenLevels">Blood Oxygen Levels (%)</label>
            <input
              type="number"
              id="bloodOxygenLevels"
              name="bloodOxygenLevels"
              value={formData.bloodOxygenLevels}
              onChange={handleInputChange}
              placeholder="Enter blood oxygen levels"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eyeMovement">Eye Movement</label>
            <input
              type="number"
              id="eyeMovement"
              name="eyeMovement"
              value={formData.eyeMovement}
              onChange={handleInputChange}
              placeholder="Enter eye movement"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hoursOfSleep">Hours of Sleep</label>
            <input
              type="number"
              id="hoursOfSleep"
              name="hoursOfSleep"
              value={formData.hoursOfSleep}
              onChange={handleInputChange}
              placeholder="Enter hours of sleep"
            />
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate (bpm)</label>
            <input
              type="number"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              placeholder="Enter heart rate"
            />
          </div>
          <button type="submit" className="recommendation-btn  btn">Submit</button>
        </form>
      </div>
      {/* Right side - Stress Level Display */}
      <div className="stress-container">
        <div className="stress-level">
          <h3>Stress Level: {stressLevel}</h3>
          <div className="stress-image">
            <img src={meter} alt="Stress level illustration" />
          </div>
          <button className="recommendation-btn" onClick={recommandationShow}>See Recommendations</button>
        </div>
      </div>
    </div>
  );
};

export default InputData;
