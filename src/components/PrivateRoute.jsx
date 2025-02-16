import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children }) => {
  const token = localStorage.getItem("jwt"); // Check for stored token

  return token && isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
