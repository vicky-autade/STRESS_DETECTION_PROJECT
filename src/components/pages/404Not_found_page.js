import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Activity,
  Info,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Leaf,
} from "lucide-react";
import "./Notfound.css";

export default function NotFound(props) {
  const user = props.user;
  const isLoggedIn = props.isLoggedIn;
  const location = useLocation();
  const navigate = useNavigate();
  const [breathePhase, setBreathePhase] = useState("inhale");
  const [counter, setCounter] = useState(4);
  const [colorIndex, setColorIndex] = useState(0);
  const [phaseChange, setPhaseChange] = useState(false);
  let path = location.pathname.split("/")[1];

  const colors = [
    "from-blue-400 to-purple-500",
    "from-green-400 to-teal-500",
    "from-pink-400 to-rose-500",
    "from-amber-400 to-orange-500",
  ];

  // Scroll to top when page is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Trigger counter and phase change with pulse effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          setBreathePhase((currentPhase) => {
            let newPhase =
              currentPhase === "inhale"
                ? "hold"
                : currentPhase === "hold"
                ? "exhale"
                : "inhale";
            // Trigger pulse animation on phase change
            setPhaseChange(true);
            setTimeout(() => setPhaseChange(false), 500);
            return newPhase;
          });
          return breathePhase === "inhale" ? 4 : breathePhase === "hold" ? 7 : 8;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [breathePhase]);

  // Change background color index (if needed)
  useEffect(() => {
    const colorTimer = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 5000);
    return () => clearInterval(colorTimer);
  }, []);

  return (
    <div className="not-found-container">
      <div className="float-element top-20 left-1/4">
        <Sparkles className="h-12 w-12 text-white" />
      </div>
      <div className="float-element bottom-20 right-1/4">
        <Leaf className="h-16 w-16 text-white" />
      </div>

      <div className="not-found-card">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Take a deep breath</h2>
        <p className="not-found-description">
          {isLoggedIn && (path === "signup" || path === "login")
            ? "Oops! You seem to be logged in. Please navigate to another page."
            : "The page you're looking for seems to have wandered off. Let's help you find your way back."}
        </p>

        <div className="flex-container">
          <div className={`breathe-circle ${breathePhase} ${phaseChange ? "phase-change" : ""}`}>
            <span>{breathePhase}</span>&nbsp;
            <div className="text-2xl font-bold">{counter}</div>
          </div>
        </div>

        <div className="not-found-buttons">
          <button className="btn-home" onClick={() => navigate("/")}>
            <Home className="icon" /> Home
          </button>
          <button
            className="btn-dashboard"
            onClick={() =>
              user.role === "admin" ? navigate("/admin") : navigate("/first")
            }
          >
            <Activity className="icon" /> Dashboard
          </button>
          <button className="btn-about" onClick={() => navigate("/about")}>
            <Info className="icon" /> About
          </button>
          <button className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft className="icon" /> Go Back
          </button>
        </div>

        <p className="not-found-footer">
          © {new Date().getFullYear()} Stress Detector
        </p>
      </div>
    </div>
  );
}
