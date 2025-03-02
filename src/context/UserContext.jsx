import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(
    Cookies.get("token") && Cookies.get("token")
  );
  const parsedUserDataFromCookies =
    Cookies?.get("username-email") &&
    JSON?.parse(Cookies?.get("username-email"));
  const [userData, setUserData] = useState(parsedUserDataFromCookies);
  const [userId, setUserId] = useState(null);

  // console.log(userData, "user data in context");
  // console.log(userToken);

  const getUserId = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
        headers: { token: userToken },
      })
      .then(({ data }) => {
        // console.log(data.decoded.id, "userid");
        setUserId(data.decoded.id);
      })
      .catch((error) => error);
  };
  useEffect(() => {
    userData &&
      Cookies.set("username-email", JSON.stringify(userData), {
        expires: 1 / 24,
      });
  }, [userData]);

  useEffect(() => {
    getUserId();
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
