import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };

  const getLoggedUserWishlist = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          setWishlist(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const deleteWishlistItem = async (productId) => {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          setWishlist(data);
          // console.log("data in delete", wishlist);
        }
        return data;
      })
      .catch((error) => error);
  };

  useEffect(() => {
    if (userToken) {
      getLoggedUserWishlist();
    }
  }, [userToken]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        getLoggedUserWishlist,
        deleteWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
