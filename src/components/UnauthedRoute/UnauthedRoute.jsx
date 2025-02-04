import { useState } from "react";

// css module
// import style from "./UnauthedRoute.module.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function UnauthedRoute({ children }) {
  return Cookies.get("token") ? <Navigate to="/" /> : children;
}
