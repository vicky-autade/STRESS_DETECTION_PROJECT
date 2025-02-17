import React, { useState, useEffect } from "react";
import "../style/inputDataStyle.css";
import meter from "../assets/trend.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Loader from './Loader'; 

const InputData = ({user}) => {
  const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    weight:"",
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
  const [fileData, setFileData] = useState(null); 
  const [ stressGiven,setStressGiven] = useState("Not Yet Given");

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
                console.log("Parsed JSON Data:", jsonData);

                // Ensure required fields exist
                const requiredFields = [
                    "snoring_range", "respiration_rate", "body_temperature",
                    "limb_movement", "blood_oxygen", "heart_rate",
                    "sleep_duration", "weight"
                ];
                
                for (const field of requiredFields) {
                    if (!(field in jsonData)) {
                        alert(`Missing field: ${field} in file.`);
                        return;
                    }
                }

                // if (!jsonData.age) {
                //   jsonData.age = user.age;
                // }

                setFileData(jsonData); // Store parsed data
                setFormData(jsonData); // Auto-fill form
            } catch (error) {
                alert("Invalid file format. Please upload a valid JSON file.");
                console.error("File parsing error:", error);
            }
        };
        reader.readAsText(file);
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  let requestData;
 
  if (inputMethod === "file") {
      if (!fileData) {
          alert("Please upload a file before submitting.");
          return;
      }

      requestData = {
          ...fileData, 
          source: "File Upload"
      };
  } else {
      // Manual Entry Handling
      for (const key in formData) {
          if (formData[key] === "") {
              alert(`Please fill in all fields before submitting.`);
              return;
          }
      }
      
      requestData = {
          snoring_range: parseFloat(formData.snoringRange),
          respiration_rate: parseFloat(formData.respirationRate),
          body_temperature: parseFloat(formData.bodyTemperature),
          limb_movement: parseInt(formData.limbMovement, 10),
          blood_oxygen: parseFloat(formData.bloodOxygenLevels),
          heart_rate: parseInt(formData.heartRate, 10),
          sleep_duration: parseFloat(formData.hoursOfSleep),
          age:user.age,
          weight: parseFloat(formData.weight),
          source: "Manual Entry"
      };
  }

  await submitData(requestData);

};


const submitData = async (requestData) => {
    console.log("Sending Data:", requestData);
    setIsLoading(true);
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}api/parameters`,
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                withCredentials: true, 
            }
        );

        console.log("API Response:", response.data);
        if (response.data && response.data.stressLevel !== undefined) {
          const levelMapping = ["Normal", "Medium-Normal", "Medium", "Medium-High", "High"];
          setStressLevel(response.data.stressLevel);
          setStressGiven(levelMapping[response.data.stressLevel] || "Unknown");
      } else {
          alert("Error: Invalid response from the server.");
      }
    } catch (error) {
        console.error("Error submitting data:", error.response ? error.response.data : error);
        alert("Failed to get stress level. Please try again.");
    }finally{
      setIsLoading(false);
    }
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
                <label htmlFor="weight">Weight (10.0 Kg - 180.0 Kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                />
              </div>

              <div className="form-group">
                <label htmlFor="snoringRange">Snoring Range (0.0 DB - 100.0 DB)</label>
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
                <label htmlFor="respirationRate">Respiration Rate (10.0 BPM - 25.0 BPM)</label>
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
                <label htmlFor="bodyTemperature">Body Temperature (35.0 °C - 38.0 °C)</label>
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
                <label htmlFor="limbMovement">Limb Movement (0 PLMI - 50 PLMI)</label>
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
                <label htmlFor="bloodOxygenLevels">Blood Oxygen Levels (80.0 % - 100.0 %)</label>
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
                <label htmlFor="hoursOfSleep">Hours of Sleep (1 hr - 18 hr)</label>
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
                <label htmlFor="heartRate">Heart Rate (40 BPM - 120 BPM)</label>
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
          <button type="submit" className="recommendation-btn btn" disabled={isLoading}>
            Submit
          </button>
        </form>

        {/* Display Uploaded JSON Data */}
        {inputMethod === "file" && fileData && (
        <div className="uploaded-data">
          <h3>Uploaded Data:</h3>
          <table className="data-table">
            <tbody>
              {Object.entries(fileData).map(([key, value]) => (
                <tr key={key}>
                  <td className="table-key">{key}</td>
                  <td className="table-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {/* Stress Level Display */}
      <div className="stress-container">
        <div className="stress-level">
          <h3>Stress Level:<br></br> {stressGiven}</h3>
          <div className="stress-image">
            <img src={meter} alt="Stress level illustration" />
          </div>
          <button className="recommendation-btn" onClick={recommandationShow}>
            See Recommendations
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default InputData;
