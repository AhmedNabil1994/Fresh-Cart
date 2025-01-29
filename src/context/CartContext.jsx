import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const headers = { token: Cookies.get("token") };

  const addToCart = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          console.log(data);
          setCart(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const getLoggedUserCart = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then(({ data }) => {
        if (data.status === "success") {
          setCart(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const updateCartProductQty = async (productId, newCount) => {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          // console.log(data);
          setCart(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const deleteCartItem = async (productId) => {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          setCart(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const clearCart = async () => {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then(({ data }) => {
        if (data.message === "success") {
          setCart(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getLoggedUserCart,
        updateCartProductQty,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
