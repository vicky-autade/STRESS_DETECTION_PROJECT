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
    setLoading(false);
  }, []); // Ensures loading is updated once on mount

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

      {/* Show loading spinner */}
      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : (
        <>
          {/* Search Bar */}
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search across all fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <p className="user-list-empty">No users found.</p>
          ) : (
            <div className="user-list-container">
              {filteredUsers.map((user) => (
                <div key={user.id} className="user-list-card">
                  <img
                    src={user.profileImage}
                    alt={`${user.username}'s profile`}
                    className="user-list-profile-photo"
                  />
                  <p className="user-list-username">{user.username}</p>
                  <button
                    className="user-details-button"
                    onClick={() => handleUserClick(user)}
                  >
                    View Details
                  </button>
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
