import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// css module
// import style from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children }) {
  return Cookies.get("token") ? children : <Navigate to={"/login"} />;
}
