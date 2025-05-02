import Favourite from "./Favourite/Favourite";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";
import toast from "react-hot-toast";
import MetaTags from "../MetaTags/MetaTags";
import useQueryWishlist from "../../hooks/wishlist/useQueryWishlist";

export default function Wishlist() {
  const {  deleteWishlistItem } =
    useContext(WishlistContext);
  const { data: wishlistItems, isLoading, isError, error } = useQueryWishlist();

  // console.log("wishlistItems in wishlist comp", wishlistItems);

  const deleteWishlistUserItem = async (id) => {
    const toastId = toast.loading("Deleting product from wishlist...");
    const data = await deleteWishlistItem(id);
    if (data.status === "success") {
      setWishlistItems((prevWishlist) =>
        prevWishlist?.filter((item) => data.data.includes(item.id))
      );
      // console.log(data, "data in delete");
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

  return (
    <>
      <MetaTags metaTitle="Wishlist" />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : (
        wishlistItems && (
          <>
            {wishlistItems.length > 0 ? (
              <>
                <h2 className="mb-16 text-xl dark:text-white">
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
