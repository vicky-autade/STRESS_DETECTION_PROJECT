import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosClient } from '../api/axiosClient';
import { Navigate } from "react-router-dom";
const First = () => {

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


  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      fontSize: "24px", 
      fontWeight: "bold" 
    }}>
      Welcome to Stress Detection System
      <button onClick={handleClick}>
        handleChange
      </button>
    </div>
  );
};

export default First;
