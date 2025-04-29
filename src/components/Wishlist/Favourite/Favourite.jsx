import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useMutationCart from "../../../hooks/cart/useMutationCart";

export default function Favourite({ favourite, handleDelete }) {
  const { add } = useMutationCart();
  const { isLoading, mutate } = add;
  // console.log(favourite, "favourite");

  const handleAddToCart = async (e, id) => {
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

  return (
    favourite && (
      <>
        <section className="relative w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mb-[60px] group px-[15px] group">
          <Link
            to={`/productdetails/${favourite.id}/${favourite.category.name}`}
          >
            <div className="relative rounded mb-4 bg-gray-300 overflow-hidden">
              <img
                src={favourite.imageCover}
                alt={favourite.title}
                className="object-cover aspect-square p-2 group-hover:scale-105 transition duration-500"
              />
              <button
                onClick={(e) => handleAddToCart(e, favourite.id)}
                className="absolute inset-x-0 bottom-0 capitalize bg-black text-white text-center w-full py-2 hover:bg-secondary transition duration-500 flex justify-center items-center gap-x-2"
              >
                <IoCartOutline size={30} className="cursor-pointer" />
                <p>
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "add to cart"
                  )}
                </p>
              </button>
            </div>
          </Link>
          <button
            onClick={handleDelete}
            className="absolute top-3 end-6 bg-secondary px-1 py-2 rounded-full hover:bg-opacity-85 transition duration-500"
          >
            <i className="fa-regular fa-trash-can p-2 fa-lg text-white"></i>
          </button>
          {favourite.priceAfterDiscount && (
            <span className="absolute top-5 start-6 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded">
              -
              {Math.ceil(
                100 * (1 - favourite.priceAfterDiscount / favourite.price)
              )}
              %
            </span>
          )}
          <h3 className="font-semibold text-base mb-2 line-clamp-1 text-black dark:text-white">
            {favourite.title}
          </h3>
          <div className="flex justify-between sm:justify-start font-medium">
            {favourite.priceAfterDiscount && (
              <span className="text-secondary me-2">
                ${favourite.priceAfterDiscount}
              </span>
            )}
            <span
              className={`me-2 ${
                favourite.priceAfterDiscount
                  ? "text-slate-500 line-through dark:text-white dark:text-opacity-75"
                  : "text-secondary no-underline"
              }`}
            >
              ${favourite.price}
            </span>
          </div>
        </section>
      </>
    )
  );
}
