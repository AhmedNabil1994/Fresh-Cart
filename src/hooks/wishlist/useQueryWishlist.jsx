import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useQuery } from "@tanstack/react-query";

export default function useQueryWishlist() {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const { setWishlist } = useContext(WishlistContext);

  const getLoggedUserWishlist = async () => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          setWishlist(data);
        }
        return data;
      })
      .catch((error) => error);
  };
  return useQuery({
    queryKey: ["wishlist-items"],
    queryFn: getLoggedUserWishlist,
    select: (items) => items.data,
  });
}
