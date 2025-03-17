"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import "../style/FirstPageStyle.css"
import graph from "../assets/trend.png"
import quiz from "../assets/quiz.png"
import wave from "../assets/wave.png"
import daily from "../assets/daily.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const First = () => {
  const [healthTrackingEnabled, setHealthTrackingEnabled] = useState(false)
  const [showActivationInput, setShowActivationInput] = useState(false)
  const [height, setHeight] = useState("")

  const navigate = useNavigate()

  // On mount, check the current activation status
  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchHealthStatus = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/health-tracking/getHealthTrackingActivatedStatus`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        if (res.data.isHealthTrackingActivated) {
          setHealthTrackingEnabled(true)
        } else {
          setHealthTrackingEnabled(false)
        }
      } catch (error) {
        console.error("Error fetching health tracking status:", error)
      }
    }
    fetchHealthStatus()
  }, [])

  const inputFieldsShow = () => {
    navigate("/input-data")
  }
  const recommandationShow = () => {
    navigate("/recommandation")
  }
  const userStatisticsShow = () => {
    navigate("/userStatistics")
  }

  // Disable tracking by sending false to activation endpoint
  const disableTracking = async () => {
    try {
      const disableRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/health-tracking/activate`,
        { isHealthTrackingActivated: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      if (disableRes.data && disableRes.data.isHealthTrackingActivated === false) {
        toast.error("Daily Health Tracking Disabled")
        setHealthTrackingEnabled(false)
      }
    } catch (error) {
      console.error("Error disabling health tracking:", error)
      toast.error("Error disabling health tracking")
    }
  }

  const toggleHealthTracking = () => {
    if (!healthTrackingEnabled) {
      // Show the height input field for activation
      setShowActivationInput(true)
    } else {
      // Call API to disable tracking
      disableTracking()
    }
  }

  const submitHealthData = async () => {
    if (height) {
      try {
        // Call the activation API to enable tracking
        const activateRes = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/health-tracking/activate`,
          { isHealthTrackingActivated: true },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )

        if (activateRes.data.isHealthTrackingActivated) {
          // Update height via updateHeight API
          const updateRes = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}api/health-tracking/updateHeight`,
            { height_cm: height },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          )
          toast.success("Health tracking activated with height updated")
          setHealthTrackingEnabled(true)
          setShowActivationInput(false)
        } else {
          toast.error("Activation failed")
        }
      } catch (error) {
        console.error("Error during activation:", error)
        toast.error("Error activating health tracking")
      }
    } else {
      toast.error("Please provide your height")
    }
  }

  return (
    <main className="page-container">
      <div className="content-wrapper">
        <div className="section-group">
          <div className="data-section">
            <h2>Input Data</h2>
            <p>Provide the necessary data to analyze your stress levels.</p>
            <button className="button-primary" onClick={inputFieldsShow}>
              Input Data
            </button>
            <img src={wave || "/placeholder.svg"} alt="Input Data" className="section-image" />
          </div>

          <div className="data-section">
            <h2 className="text-center">Recommendation</h2>
            <p>View recommendations based on your input data.</p>
            <button className="button-primary" onClick={recommandationShow}>
              See Recommendations
            </button>
            <img src={quiz || "/placeholder.svg"} alt="Recommendation" className="section-image" />
          </div>

          <div className="data-section">
            <h2>Show Analytics</h2>
            <p>View analytics and trends based on your data.</p>
            <button className="button-primary" onClick={userStatisticsShow}>
              Show Analytics
            </button>
            <img src={graph || "/placeholder.svg"} alt="Analytics" className="section-image" />
          </div>
        </div>

        <div className="health-tracking data-section">
          <h2>Health Tracking</h2>
          <p>
            Enable tracking to get personalized insights and maintain your daily wellness goals.
          </p>
          <button className="button-primary" onClick={toggleHealthTracking}>
            {healthTrackingEnabled ? "Disable Health Tracking" : "Enable Health Tracking"}
          </button>

          {showActivationInput && (
            <div className="health-inputs-wrapper">
              <div className="health-inputs">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input-field"
                />
                <button className="button-primary sub" onClick={submitHealthData}>
                  Submit
                </button>
              </div>
              <img src={daily || "/placeholder.svg"} alt="Health Tracking" className="health-image" />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default First
