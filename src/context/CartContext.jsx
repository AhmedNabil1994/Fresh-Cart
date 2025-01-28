import axios from "axios";
import { createContext } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = { token: Cookies.get("token") };

  const addToCart = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then(({ data }) => data)
      .catch((error) => error);
  };

  const getLoggedUserCart = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then(({ data }) => data)
      .catch((error) => error);
  };

  return (
    <CartContext.Provider value={{ addToCart, getLoggedUserCart }}>
      {children}
    </CartContext.Provider>
  );
}
