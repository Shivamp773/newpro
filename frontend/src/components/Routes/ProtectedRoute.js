import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/auth/current-user");
        if (data?.success) {
          dispatch(getCurrentUser(data));
        } else {
          localStorage.clear();
        }
      } catch (error) {
        console.log("User fetch failed →", error);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
