import { useEffect, useState } from "react";

// css module
// import style from "./Wishlist.module.css";
import Favourite from "./Favourite/Favourite";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  // const queryClient = new QueryClient();
  const { getLoggedUserWishlist, deleteWishlistItem, wishlist,setWishlist } =
    useContext(WishlistContext);
  const userToken = Cookies.get("token");
  // console.log("wishlist in wishlist comp", wishlist);
  // console.log("wishlistItems in wishlist comp", wishlistItems);

  // const getWishlistItems = async () => {
  //   return await getLoggedUserWishlist();
  // };

  // const {
  //   data: wishlistItems,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["wishlistItems"],
  //   queryFn: getWishlistItems,
  //   select: (items) => items.data,
  // });
  // console.log(wishlistItems, "Wishlist Items");
  // console.log(error, "error");

  const getWishlistItems = async () => {
    setIsLoading(true);
    const data = await getLoggedUserWishlist();
    console.log(data.data);
    if (data.status === "success") {
      setIsLoading(false);
      setWishlistItems(data.data);
      setIsError(false);
      setError(null);
    } else {
      setIsLoading(false);
      setIsError(true);
      setError(data);
    }
  };

  const deleteWishlistUserItem = async (id) => {
    const toastId = toast.loading("Deleting product from wishlist...");
    const data = await deleteWishlistItem(id);
    if (data.status === "success") {
      setWishlistItems((prevWishlist) =>
        prevWishlist?.filter((item) => data.data.includes(item.id))
      );
      console.log(data, "data in delete");
      toast.success("Product deleted successfully.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
    } else {
      toast.error("Error during deleting, try again.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, [userToken]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        wishlistItems && (
          <>
            {wishlistItems.length > 0 ? (
              <>
                <h2 className="mb-16 text-xl">
                  Wishlist ({wishlistItems.length})
                </h2>
                <section className="row mx-[-15px]">
                  {wishlistItems.map((item) => (
                    <Favourite
                      favourite={item}
                      key={item.id}
                      handleDelete={() => deleteWishlistUserItem(item.id)}
                    />
                  ))}
                </section>
              </>
            ) : (
              <EmptyCart msg1="wishlist" msg2="to your wishlist." />
            )}
          </>
        )
      )}
    </>
  );
}
