import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { profile, isLoading, isAuthenticated, hasCheckedAuth } = UseAuthStore();

  useEffect(() => {
    profile();
  }, [profile]);

  if (!hasCheckedAuth || isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export default ProtectedRoute;
