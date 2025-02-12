import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../style/ProfilePageStyle.css";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "./Loader";

const ProfilePage = (props) => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    dob: "",
    phone: "",
    profileImage: null, // Stores the file
    profileImageUrl: "", // Stores the image URL
  });
  let user = props.user;
  let setUser = props.setUser;

  const [loading, setLoading] = useState(false);
  // Fetch profile data when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loading
      try {
        console.log("Cookies: ", localStorage.getItem("jwt"));
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/profile`, {
          withCredentials: true, // Include cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add token if required
          },
        });
        console.log("Profile Data: ", response.data);
        // Update user state with the new profile data
        setUser(response.data);
        const formattedDOB = response.data.DateOfBirth
        ? new Date(response.data.DateOfBirth).toISOString().split("T")[0]
        : "";
        setFormData({
          userName: response.data.username || "",
          email: response.data.email || "",
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          age: response.data.age || "",
          gender: response.data.gender || "",
          dob: formattedDOB || "",
          phone: response.data.phone || "",
          profileImage: null, // File remains null
          profileImageUrl: response.data.profileImage || "", // Image URL from backend
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data.");
      }finally {
        setLoading(false); // End loading
      }
    };
    window.scrollTo(0, 0);
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleImageClick = () => {
    document.getElementById("profileImage").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] && key !== "profileImageUrl") {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/profile`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
      });
      // Update user state with the new profile data
      setUser(response.data);
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log("Profile Updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);

      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }finally {
      setLoading(false); // End loading
    }
  };

  return (
    <main className="profile-page">
      <header className="page-header">
        <h1>Profile</h1>
      </header>
      <form className="profile-form" >
        <div className="form-section-container">
          {/* Profile Image Section */}
          <div className="section profile-section">
            <div className="image-picker" onClick={handleImageClick}>
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Preview"
                  className="profile-img"
                />
              ) : formData.profileImageUrl ? (
                <img
                  src={formData.profileImageUrl}
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <div className="image-placeholder">Click to Pick Image</div>
              )}
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleInputChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
            <button
              type="button"
              className="change-photo-btn"
              onClick={handleImageClick}
            >
              Change Photo
            </button>
          </div>

          {/* First Set of Text Fields */}
          <div className="section input-section">
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter username"
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Second Set of Text Fields */}
          <div className="section input-section">
             <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                disabled // Email should be non-editable
              />
             </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            
          </div>
        </div>
        <div className="form-footer1">
          <button type="submit" onClick={handleSubmit} className="submit-btn1" disabled={loading}>
              {loading ? "Updating ..." : "Update Profile"}
          </button>
          
          <button type="submit"  className="submit-btn2" disabled={loading}>
              {loading ? "Deleting ..." : "Delete Profile"}
          </button>
        </div>
      </form>
      {loading && <Loader />} {/* Show loader when loading is true */}
    </main>
  );
};

export default ProfilePage;


