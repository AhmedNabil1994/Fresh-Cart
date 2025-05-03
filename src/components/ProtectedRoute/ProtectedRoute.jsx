import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  return Cookies.get("token") ? children : <Navigate to={"/login"} />;
}
