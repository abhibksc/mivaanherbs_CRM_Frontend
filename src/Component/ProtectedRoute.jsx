// Components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
const isAuthenticated = localStorage.getItem("Admin_token") ? true : false;
console.log(isAuthenticated);
console.log(children);



  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
