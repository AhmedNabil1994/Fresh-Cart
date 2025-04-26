import { useParams } from "react-router-dom";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import StarRatings from "react-star-ratings";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { CartContext } from "../../../context/CartContext";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { WishlistContext } from "../../../context/WishlistContext";
import useProducts from "../../../hooks/useProducts";
import MetaTags from "../../MetaTags/MetaTags";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function ProductDetails() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageIdx, setImageIdx] = useState(null);
  const { addToCart } = useContext(CartContext);
  let { id } = useParams();
  const { addToWishlist, deleteWishlistItem, wishlist } =
    useContext(WishlistContext);

  useScrollToTop(id);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProducts({
    apiUrl: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    queryKey: "product-details",
    id,
  });

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
    setIsInWishlist(
      wishlist?.data?.some((item) => item?.id === product?.data.id) ||
        wishlist?.data?.some((item) => item === product?.data.id)
    );
    if (product?.data?.imageCover) {
      setSelectedImage(product?.data.imageCover);
      setImageIdx(null);
    }
  }, [product?.data?.id]);

  return (
    <>
      <MetaTags metaTitle="Product Details" />
      <section>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ApiError error={error.response?.data.message} />
        ) : (
          <>
            {product.data && (
              <div className="row justify-between gap-y-4 mb-[140px]">
                <div className="w-full md:w-2/12">
                  <div className="row flex-row md:flex-col justify-evenly md:justify-center items-end gap-y-4">
                    {product.data.images.map((img, idx) => (
                      <img
                        src={img}
                        alt={product.data.title}
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
                      src={
                        selectedImage ? selectedImage : product.data.imageCover
                      }
                      alt={product.data.title}
                      className="object-cover w-full md:w-[500px] aspect-[500/600] mx-auto"
                    />
                  </div>
                </div>
                <div className="w-full md:w-4/12 dark:text-white">
                  <div>
                    <h2 className="text-2xl font-semibold font-inter">
                      {product.data.title}
                    </h2>
                    <div className="row my-4 gap-x-2">
                      <div className="-mt-[2px]">
                        <StarRatings
                          rating={product.data.ratingsAverage}
                          starRatedColor="#FFAD33"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                      </div>
                      <p className=" opacity-50">
                        ({product.data.ratingsQuantity} Reviews)
                      </p>
                      <p>
                        <span className="opacity-50">|</span>
                        <span className="ms-4 text-sm text-[#00FF66] opacity-60">
                          {product.data.quantity > 0 && "In Stock"}
                        </span>
                      </p>
                    </div>
                    <p className="text-2xl">${product.data.price}</p>
                    <p className="relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-gray-500 after:mt-6 mt-6 ">
                      {product?.data.description}
                    </p>
                    <div className="flex justify-between mt-6 items-center">
                      <button
                        onClick={() => handleAddToCart(product?.data.id)}
                        className="capitalize w-4/5 font-medium bg-secondary text-white rounded py-2 px-12 hover:bg-opacity-90 transition duration-500"
                      >
                        {btnLoading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "add to cart"
                        )}
                      </button>
                      <button onClick={() => handleWishlist(product?.data.id)}>
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
      </section>
    </>
  );
}
