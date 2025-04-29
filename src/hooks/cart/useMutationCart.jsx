import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

export default function useMutationCart() {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const { setCart } = useContext(CartContext);

  const addToCart = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
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
      .catch((error) => {
        throw error;
      });
  };

  const add = useMutation({ mutationFn: addToCart });
  const deleteFromCart = useMutation({ mutationFn: deleteCartItem });

  return { add, deleteFromCart };
}
