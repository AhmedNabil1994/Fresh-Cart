import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(
    Cookies.get("token") && Cookies.get("token")
  );
  const parsedUserDataFromCookies =
    Cookies?.get("username-email") &&
    JSON?.parse(Cookies?.get("username-email"));
  const [userData, setUserData] = useState(parsedUserDataFromCookies);

  console.log(userData, "user data in context");

  // console.log(userToken);
  useEffect(() => {
    userData &&
      Cookies.set("username-email", JSON.stringify(userData), {
        expires: 1 / 24,
      });
  }, [userData]);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}
