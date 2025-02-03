import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const userToken = Cookies.get("token");
  const headers = { token: userToken };
  const getHeaders = () => {
    const userToken = Cookies.get("token");
    return userToken ? { token: userToken } : {};
  };

  const addToWishlist = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          // console.log(data,"data when add  wishlist");
          setWishlist(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const getLoggedUserWishlist = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: getHeaders(),
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
 
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        getLoggedUserWishlist,
        deleteWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
