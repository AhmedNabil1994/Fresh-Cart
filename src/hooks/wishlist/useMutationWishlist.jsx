import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationWishlist() {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const { setWishlist } = useContext(WishlistContext);

  const addToWishlist = async (productId) => {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then(({ data }) => {
        if (data.status === "success") {
          setWishlist(data);
        }
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  const addWishlist = useMutation({ mutationFn: addToWishlist });

  return { addWishlist };
}
