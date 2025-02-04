import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  // const cartFromCookies = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : null;
  // const [cart, setCart] = useState(cartFromCookies);
  // const userToken = Cookies.get("token");
  const { userToken } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const headers = { token: userToken };
  const getHeaders = () => {
    return userToken ? { token: userToken } : null;
  };
  console.log(cart, "cart in cart context file");
  // console.log(cartFromCookies, "cart stored in session");

  const addToCart = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: getHeaders() }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          setCart(data);
          // Cookies.set("cart", JSON.stringify(data), { expires: 1 / 24 });
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
        // `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=fresh-cart-hazel.vercel.app`,
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
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
          // Cookies.set("cart", JSON.stringify(data), { expires: 1 / 24 });
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
          // Cookies.remove("cart");
        }
        return data;
      })
      .catch((error) => error);
  };

  useEffect(() => {
    if (userToken) {
      getLoggedUserCart();
      // addToCart();
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
