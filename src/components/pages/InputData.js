import React, { useState } from "react";
import "../style/inputDataStyle.css";

const InputData = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="form-container">
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
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default InputData;
