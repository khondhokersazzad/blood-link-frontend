import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, status , roleLoading} = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || status !== "active") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
