import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const userToken = Cookies.get("token");
  const headers = { token: userToken };
  const getHeaders = () => {
    const userToken = Cookies.get("token");
    return userToken ? { token: userToken } : {};
  };
  // console.log(userToken);

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

  const cashPayment = async (formData) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress: formData },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          console.log(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const onlinePayment = async (formData) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=fresh-cart-hazel.vercel.app`,
        { shippingAddress: formData },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          console.log(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  const getLoggedUserCart = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: getHeaders(),
      })
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

  useEffect(() => {
    if (userToken) {
      getLoggedUserCart();
      // console.log("token here");
    }
  }, [userToken]);

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
        cashPayment,
        onlinePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
