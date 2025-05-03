import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useQueryCart() {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const { setCart } = useContext(CartContext);

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

  useEffect(() => {
    if (userToken) {
      getLoggedUserCart();
    }
  }, [userToken]);

  return useQuery({
    queryKey: ["cart-items"],
    queryFn: getLoggedUserCart,
    select: (items) => items.data,
  });
}
