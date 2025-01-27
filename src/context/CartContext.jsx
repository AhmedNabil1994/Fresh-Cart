import axios from "axios";
import { createContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";


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
        // toast.loading("Adding to cart")
      .then(({ data }) => data)
      .catch((error) => error);
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
