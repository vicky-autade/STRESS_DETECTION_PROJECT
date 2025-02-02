import React, { useState ,useEffect} from "react";
import "../style/ProfilePageStyle.css";

const ProfilePage = () => {

  
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
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleImageClick = () => {
    document.getElementById("profileImage").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile data submitted successfully!");
  };

  return (
    <main className="profile-page">
      <header className="page-header">
        <h1>Profile</h1>
      </header>
      <form className="profile-form" onSubmit={handleSubmit}>
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
              className="change-photo-btn "
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
                onChange={handleInputChange}
                placeholder="Enter email"
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
          <button type="submit" className="submit-btn1">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProfilePage;
