import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const [cart, setCart] = useState(null);
  // console.log(cart);

  const getLoggedUserCart = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          setCart(data);
        }
        return data;
      })
      .catch((error) => {
        throw error;
      });
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
          // console.log(data, "cash");
        }
        return data;
      })
      .catch((error) => error);
  };

  const onlinePayment = async (formData) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://fresh-cart-hazel.vercel.app/`,
        // `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        { shippingAddress: formData },
        { headers }
      )
      .then(({ data }) => {
        // console.log(data,"online");
        if (data.status === "success") {
          return data;
        }
      })
      .catch((error) => error);
  };

  useEffect(() => {
    if (userToken) {
      getLoggedUserCart();
    }
  }, [userToken]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cashPayment,
        onlinePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
