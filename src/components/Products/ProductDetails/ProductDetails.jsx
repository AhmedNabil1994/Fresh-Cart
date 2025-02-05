import axios from "axios";
import { useParams } from "react-router-dom";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import StarRatings from "react-star-ratings";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { CartContext } from "../../../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WishlistContext } from "../../../context/WishlistContext";

// css module
// import style from "./ProductDetails.module.css";

export default function ProductDetails() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageIdx, setImageIdx] = useState(null);
  const { addToCart } = useContext(CartContext);
  let { id } = useParams();
  const { addToWishlist, deleteWishlistItem, wishlist } =
    useContext(WishlistContext);

  const getProductDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    select: (product) => product.data.data,
  });

  console.log(product, "product");

  const handleAddToCart = async (id) => {
    setBtnLoading(true);
    const toastId = toast.loading("Adding product to cart...");
    const data = await addToCart(id);
    // console.log("data", data);
    if (data.status === "success") {
      setBtnLoading(false);
      toast.success(data.message, {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
    } else {
      setBtnLoading(false);
      toast.error(data.message, {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  const handleAddToWishlist = async (id) => {
    const toastId = toast.loading("Adding product to wishlist...");
    const data = await addToWishlist(id);
    // console.log("heart clicked", data);
    if (data.status === "success") {
      toast.success("Product deleted successfully.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
    } else {
      toast.error(data.message, {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  const handleDeleteWishlistItem = async (id) => {
    const toastId = toast.loading("Deleting product from wishlist...");
    const data = await deleteWishlistItem(id);
    if (data.status === "success") {
      // setWishlistItems(data.data);
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

  const handleImageClick = (img, idx) => {
    setSelectedImage(img);
    setImageIdx(idx);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setIsInWishlist(
      wishlist?.data?.some((item) => item?.id === product?.id) ||
        wishlist?.data?.some((item) => item === product?.id)
    );
    if (product?.imageCover) {
      setSelectedImage(product?.imageCover);
      setImageIdx(null);
    }
  }, [product?.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        <>
          {product && (
            <div className="row justify-between gap-y-4 mb-[140px]">
              <div className="w-full md:w-2/12">
                <div className="row flex-row md:flex-col justify-evenly md:justify-center items-end gap-y-4">
                  {product.images.map((img, idx) => (
                    <img
                      src={img}
                      alt={product.title}
                      key={idx}
                      className={`w-[170px] aspect-[170/138] cursor-pointer transition duration-200 border-2 ${
                        imageIdx === idx
                          ? " border-secondary scale-105"
                          : "opacity-85 border-slate-400 "
                      }`}
                      onClick={() => handleImageClick(img, idx)}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-5/12">
                <div>
                  <img
                    src={selectedImage ? selectedImage : product.imageCover}
                    alt={product.title}
                    className="object-cover w-full md:w-[500px] aspect-[500/600] mx-auto"
                  />
                </div>
              </div>
              <div className="w-full md:w-4/12">
                <div>
                  <h2 className="text-2xl font-semibold font-inter">
                    {product.title}
                  </h2>
                  <div className="row my-4 gap-x-2">
                    <div className="-mt-[2px]">
                      <StarRatings
                        rating={product.ratingsAverage}
                        starRatedColor="#FFAD33"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    </div>
                    <p className=" opacity-50">
                      ({product.ratingsQuantity} Reviews)
                    </p>
                    <p>
                      <span className="opacity-50">|</span>
                      <span className="ms-4 text-sm text-[#00FF66] opacity-60">
                        {product.quantity > 0 && "In Stock"}
                      </span>
                    </p>
                  </div>
                  <p className="text-2xl">${product.price}</p>
                  <p className="relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-gray-500 after:mt-6 mt-6 ">
                    {product?.description}
                  </p>
                  {/* <div className="row justify-between items-center mt-6 gap-y-2">
                    <div className="rounded flex">
                      <button className=" text-3xl px-3 border-2 rounded-l">
                        -
                      </button>
                      <p className="text-xl px-[34px] border-y-2 leading-8">
                        2
                      </p>
                      <button className=" text-3xl px-3 border-2 border-secondary bg-secondary text-white rounded-r">
                        +
                      </button>
                    </div>
                    <button className="font-medium bg-secondary text-white rounded py-2 px-12">
                      Buy Now
                    </button>
                    <i className="fa fa-regular fa-heart border-2 border-slate-400 opacity-75 rounded text-xl p-1"></i>
                  </div> */}
                  <div className="flex justify-between mt-6 items-center">
                    <button
                      onClick={() => handleAddToCart(product?.id)}
                      className="capitalize w-4/5 font-medium bg-secondary text-white rounded py-2 px-12 hover:bg-opacity-90 transition duration-500"
                    >
                      {btnLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "add to cart"
                      )}
                    </button>
                    <button onClick={() => handleWishlist(product?.id)}>
                      <i
                        className={` ${
                          isInWishlist
                            ? "fa-solid text-secondary"
                            : "fa-regular"
                        } fa fa-heart border-2 border-slate-400  rounded text-2xl p-1`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <RelatedProducts />
        </>
      )}
    </>
  );
}
