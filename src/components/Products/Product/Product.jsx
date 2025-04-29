import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import { WishlistContext } from "../../../context/WishlistContext";
import useMutationCart from "../../../hooks/cart/useMutationCart";

const highlightMatch = (titleText, search) => {
  if (!search) return titleText;
  /*
    () in regex is a capturing group
    to extract and show the searhed text when we split the title
  */
  const regex = new RegExp(`(${search})`, "gi");
  return titleText.split(regex).map((match, index) =>
    match.toLowerCase() === search.toLowerCase() ? (
      <span key={index} className="text-emerald-500 font-bold">
        {match}
      </span>
    ) : (
      match
    )
  );
};

export default function Product({ product, search }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToWishlist, deleteWishlistItem, wishlist } =
    useContext(WishlistContext);
  const { add } = useMutationCart();
  const { isLoading, mutate } = add;

  const highlightedTitle = useMemo(
    () => highlightMatch(product.title, search),
    [product.title, search]
  );

  const handleAddToCart = async (e, id) => {
    // prevent link behavior in add to cart
    e.preventDefault();
    e.stopPropagation();
    const toastId = toast.loading("Adding product to cart...");
    mutate(id, {
      onSuccess: (data) => {
        toast.success(data.message, {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          duration: 3000,
          id: toastId,
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          id: toastId,
        });
      },
    });
  };

  const handleAddToWishlist = async (id) => {
    const toastId = toast.loading("Adding product to wishlist...");
    const data = await addToWishlist(id);
    // console.log("heart clicked", data);
    if (data.status === "success") {
      toast.success("Product added successfully.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
    } else {
      toast.error("Error in adding to wishlist, try again.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
      setIsInWishlist(false);
    }
  };

  const handleDeleteWishlistItem = async (id) => {
    const toastId = toast.loading("Deleting product from wishlist...");
    const data = await deleteWishlistItem(id);
    if (data.status === "success") {
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

  const handleWishlist = (id) => {
    setIsInWishlist(!isInWishlist);
    isInWishlist ? handleDeleteWishlistItem(id) : handleAddToWishlist(id);
  };

  useEffect(() => {
    setIsInWishlist(
      wishlist?.data?.some((item) => item?.id === product?.id) ||
        wishlist?.data?.some((item) => item === product?.id)
    );
  }, [wishlist]);

  return (
    <>
      <div className="relative w-full md:w-1/2  xl:w-1/3 mb-[60px] group px-[15px]">
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          <div>
            <div className="bg-[#F5F5F5] relative rounded mb-4">
              <img
                src={product.imageCover}
                alt={product.title}
                className="p-8 group-hover:scale-105 transition duration-500"
              />
              <button
                onClick={(e) => handleAddToCart(e, product.id)}
                className="absolute inset-x-0 bottom-0 capitalize bg-black text-white text-center w-full py-2 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 hover:bg-secondary transition duration-500"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "add to cart"
                )}
              </button>
            </div>
            <h3 className="font-semibold text-xl text-secondary mb-2 line-clamp-1">
              {product.category.name}
            </h3>
            <div className="flex justify-between">
              <h3 className="font-medium mb-2 line-clamp-1 dark:text-white">
                {highlightedTitle}
              </h3>
              <span className="opacity-50 dark:text-white">
                ({product.quantity})
              </span>
            </div>
            <div className="flex justify-between sm:justify-start dark:text-white">
              <span className="text-secondary me-2">${product.price}</span>
              <div className="flex">
                <div className="shrink-0 -mt-[2px]">
                  <StarRatings
                    rating={product.ratingsAverage}
                    starRatedColor="#FFAD33"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </div>
                <span className="ms-2">
                  (
                  <span className="text-secondary">
                    {product.ratingsAverage}
                  </span>
                  )
                </span>
              </div>
            </div>
          </div>
        </Link>
        <button
          onClick={() => handleWishlist(product.id)}
          className="absolute top-3 end-3"
        >
          <i
            className={`${
              isInWishlist ? "fa-solid text-secondary" : "fa-regular"
            }  fa-heart p-2 fa-xl`}
          ></i>
        </button>
      </div>
    </>
  );
}
