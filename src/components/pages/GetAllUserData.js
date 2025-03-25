import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/GetAllUserDataStyle.css";

const AllUserListPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const users = location.state?.users || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUserClick = (user) => {
    navigate("/UserDetailPage", { state: { user } });
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <main className="user-list-page-wrapper">
      <h2 className="user-list-title">Users Details</h2>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <p className="user-list-empty">No users found</p>
          ) : (
            <div className={`user-list-container ${filteredUsers.length === 1 ? "single-user" : ""}`}>
              {filteredUsers.map((user) => (
                <div 
                  key={user._id} 
                  className={`user-list-card ${filteredUsers.length === 1 ? "single-user-card" : ""}`}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="card-image-container">
                    <img
                      src={user.profileImage}
                      alt={`${user.username}'s profile`}
                      className="user-list-profile-photo"
                    />
                  </div>
                  <div className="card-content">
                    <p className="user-list-username">{user.username}</p>
                    {filteredUsers.length === 1 && (
                      <div className="additional-details">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                      </div>
                    )}
                    <button 
                      className="user-details-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(user);
                      }}
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default AllUserListPage;