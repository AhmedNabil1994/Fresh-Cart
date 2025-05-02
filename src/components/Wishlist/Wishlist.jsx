import Favourite from "./Favourite/Favourite";
import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";
import toast from "react-hot-toast";
import MetaTags from "../MetaTags/MetaTags";
import useQueryWishlist from "../../hooks/wishlist/useQueryWishlist";
import useMutationWishlist from "../../hooks/wishlist/useMutationWishlist";
import { useQueryClient } from "@tanstack/react-query";

export default function Wishlist() {
  const { data: wishlistItems, isLoading, isError, error } = useQueryWishlist();
  const { deleteFromWishlist } = useMutationWishlist();
  const queryClient = useQueryClient();

  const deleteWishlistUserItem = async (id) => {
    const toastId = toast.loading("Deleting product from wishlist...");
    deleteFromWishlist.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["wishlist-items"],
        });

        toast.success("Product deleted successfully.", {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          duration: 3000,
          id: toastId,
        });
      },
      onError: () => {
        toast.error("Error during deleting, try again.", {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          id: toastId,
        });
      },
    });
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
