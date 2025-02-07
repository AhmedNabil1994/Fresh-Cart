// import style from "./Cart.module.css";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Loader from "../shared/Loader/Loader";
import toast from "react-hot-toast";
import EmptyCart from "./EmptyCart/EmptyCart";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import MetaTags from "../MetaTags/MetaTags";
import { useQuery } from "@tanstack/react-query";

export default function Cart() {
  const userToken = Cookies.get("token");

  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { getLoggedUserCart, updateCartProductQty, deleteCartItem, clearCart } =
    useContext(CartContext);

  /*
    with react-query 
  */

  // const getCartItems = async () => {
  //   return await getLoggedUserCart();
  // };

  // const {
  //   data: cartDetails,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["get-user-cart"],
  //   queryFn: getCartItems,
  //   select: (res) => res.data,
  // });

  /* 
   -----------------------------------
  */

  const getCartItems = async () => {
    setIsLoading(true);
    const res = await getLoggedUserCart();
    console.log(res.data);
    if (res.status === "success") {
      setIsLoading(false);
      setCartDetails(res.data);
    }
  };

  const updateProduct = async (id, count) => {
    const toastId = toast.loading("Updating product in cart...");
    if (count === 0) {
      deleteItem(id);
    } else {
      const data = await updateCartProductQty(id, count);
      console.log(data);
      if (data.status === "success") {
        setCartDetails(data.data);
        toast.success("Product updated successfully.", {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          duration: 3000,
          id: toastId,
        });
      } else {
        toast.error("An error occured try again.", {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          id: toastId,
        });
      }
    }
  };

  const deleteItem = async (id) => {
    const toastId = toast.loading("Deleting product from cart...");
    const res = await deleteCartItem(id);
    if (res.status === "success") {
      console.log(res.data, "data delete cart");
      setCartDetails(res.data);
      toast.success("Product deleted successfully from cart", {
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

  const clearUserCart = async () => {
    setBtnLoading(true);
    const toastId = toast.loading("Clearing your cart...");
    const res = await clearCart();
    console.log(res, "clear cart response");
    if (res.message === "success") {
      setBtnLoading(false);
      setCartDetails({ products: [] });
      toast.success("Your cart cleared successfully", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
    } else {
      setBtnLoading(false);
      toast.error("Error during clearing, try again.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  useEffect(() => {
    getCartItems();
  }, [userToken]);

  return (
    <>
      <MetaTags metaTitle="Cart" />
      {isLoading ? (
        <Loader />
      ) : (
        cartDetails && (
          <>
            {cartDetails.products.length > 0 ? (
              <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-base capitalize">
                      <tr>
                        <th scope="col" className="px-6 py-3 font-normal">
                          <span className="">Image</span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 font-normal text-center"
                        >
                          <span className="">Product</span>
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal">
                          Subtotal
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartDetails.products.map((product) => (
                        <tr
                          className="bg-white border-b border-gray-200 text-base font-normal"
                          key={product._id}
                        >
                          <td className="px-6 py-4 ">
                            <img
                              src={product.product.imageCover}
                              className="w-16 md:w-32 max-w-full max-h-full"
                              alt={product.product.title}
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span>{product.product.title}</span>
                          </td>
                          <td className="px-6 py-4  text-gray-900 ">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-between items-center bg-gray-50 w-24 border border-slate-400 text-gray-900 text-sm rounded-lg px-3 py-[6px] ">
                              <span>
                                {product.count < 10
                                  ? `0${product.count}`
                                  : product.count}
                              </span>
                              <div className="flex flex-col">
                                <i
                                  onClick={() =>
                                    updateProduct(
                                      product.product.id,
                                      product.count + 1
                                    )
                                  }
                                  className="mb-2 text-xs cursor-pointer fa-solid fa-chevron-up"
                                ></i>
                                <i
                                  onClick={() =>
                                    updateProduct(
                                      product.product.id,
                                      product.count - 1
                                    )
                                  }
                                  className="mt-2 text-xs cursor-pointer fa-solid fa-chevron-down"
                                ></i>
                              </div>
                            </div>
                          </td>
                          {/* <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <input
                                  type="number"
                                  id={`product_${product._id}`}
                                  className="bg-gray-50 w-14 border border-slate-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                                  placeholder={product.count}
                                  min="1"
                                />
                              </div>
                            </div>
                          </td> */}
                          <td className="px-6 py-4  text-gray-900 ">
                            ${product.price * product.count}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              onClick={() => deleteItem(product.product._id)}
                              className="font-medium text-red-600 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row justify-between">
                  {/* <button
                    className="w-full sm:w-auto capitalize mt-6 rounded border border-slate-400 px-12 py-4 font-medium hover:bg-slate-100 transition-colors duration-300"
                  >
                    update cart
                  </button> */}
                  <button
                    onClick={clearUserCart}
                    className="w-full md:w-1/4 lg:w-1/5 capitalize mt-6 rounded bg-secondary text-white px-12 py-4 font-medium hover:bg-opacity-90 transition-colors duration-500"
                  >
                    {btnLoading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "clear cart"
                    )}
                  </button>
                </div>
                <div className="flex flex-col md:items-end ">
                  <div className="rounded border-2 border-black mt-20 lg:w-1/3 py-8 px-6">
                    <h2 className="font-medium text-xl mb-6">Cart Total</h2>
                    <div className="flex flex-col justify-between mb-4 relative after:content-[''] after:w-full after:h-[2px] after:bg-slate-200 after:mt-4">
                      <div className="flex justify-between">
                        <p>Subtotal:</p>
                        <p>${cartDetails?.totalCartPrice}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between mb-4 relative after:content-[''] after:w-full after:h-[2px] after:bg-slate-200 after:mt-4">
                      <div className="flex justify-between">
                        <p>Shipping:</p>
                        <p>Free</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Total:</p>
                      <p>${cartDetails.totalCartPrice}</p>
                    </div>
                    <Link to="/checkout">
                      <button className=" mt-6 rounded bg-secondary sm:px-12 py-4 font-medium hover:bg-opacity-90  transition-colors duration-500 text-white w-full sm:w-auto mx-auto block">
                        Procees to checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <EmptyCart msg1="cart" msg2="to view items." />
              </>
            )}
          </>
        )
      )}
    </>
  );
}
