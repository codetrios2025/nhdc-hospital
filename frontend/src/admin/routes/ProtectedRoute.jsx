import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingScreen from "../components/common/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { loading, initialized, token } = useSelector((state) => state.auth);

  // Wait until auth restoration completes
  if (!initialized) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
