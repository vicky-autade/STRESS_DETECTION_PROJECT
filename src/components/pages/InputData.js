import React, { useState, useEffect } from "react";
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
    hoursOfSleep: "",
    heartRate: "",
  });

  const [stressLevel, setStressLevel] = useState(0);
  const [inputMethod, setInputMethod] = useState("file");
  const [fileData, setFileData] = useState(null); // State for file data display

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          setFormData(jsonData);
          setFileData(jsonData); // Store file data for display
        } catch (error) {
          alert("Invalid file format. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedStress = Math.random() * 4;
    setStressLevel(Math.floor(calculatedStress));
  };

  const recommandationShow = () => {
    navigate("/recommandation");
  };

  return (
    <div className="form-container">
      <div className="input-container">
        <h2>Health Data Input</h2>

        {/* Input Method Selection */}
        <div className="input-method-selection">
          <button
            className={`input-btn ${inputMethod === "file" ? "active" : ""}`}
            onClick={() => setInputMethod("file")}
          >
            Import from File
          </button>
          <button
            className={`input-btn ${inputMethod === "manual" ? "active" : ""}`}
            onClick={() => setInputMethod("manual")}
          >
            Enter Manually
          </button>
        </div>

        <form className="input-form" onSubmit={handleSubmit}>
          {/* File Upload Section */}
          {inputMethod === "file" && (
            <div className="form-group">
              <label htmlFor="fileInput">Upload Health Data (JSON)</label>
              <input
                type="file"
                id="fileInput"
                accept=".json"
                className="file-upload-btn"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {/* Manual Input Section */}
          {inputMethod === "manual" && (
            <>
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
            </>
          )}

          {/* Common Submit Button */}
          <button type="submit" className="recommendation-btn btn">
            Submit
          </button>
        </form>

        {/* Display Uploaded JSON Data */}
        {fileData && (
          <div className="uploaded-data">
            <h3>Uploaded Data:</h3>
            <pre>{JSON.stringify(fileData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Stress Level Display */}
      <div className="stress-container">
        <div className="stress-level">
          <h3>Stress Level: {stressLevel}</h3>
          <div className="stress-image">
            <img src={meter} alt="Stress level illustration" />
          </div>
          <button className="recommendation-btn" onClick={recommandationShow}>
            See Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputData;
