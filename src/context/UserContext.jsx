import { createContext, useState } from "react";
import Cookies from "js-cookie";


export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    Cookies
  const [userToken, setUserToken] = useState(
    Cookies.get("token") && Cookies.get("token")
  );

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
