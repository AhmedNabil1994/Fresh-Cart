import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import Loader from "../shared/Loader/Loader";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import MetaTags from "../MetaTags/MetaTags";
import ApiError from "../shared/ApiError/ApiError";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Orders() {
  const { userId } = useContext(UserContext);

  const getAllUserOrders = async () => {
    if (!userId) return [];
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    return response.data;
  };

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: getAllUserOrders,
  });

  return (
    <>
      <MetaTags metaTitle="Orders" />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : orders?.length > 0 ? (
        <>
          <SectionHeader title="Orders" subtitle="View All Orders" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center">
              <thead className="bg-white text-base capitalize">
                <tr>
                  <th scope="col" className="px-6 py-3 font-normal">
                    <span className="">Order Number</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    <span className=""> Type</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    <span className="">Product</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal text-center">
                    <span className="">Product Qty</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Ordered On
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*
                    Removes rows of no images
                    check if there is at least one cart item with image
                      --using some method
                    return it using filter
                    return array of orders each one has cart items of an image
                    map this array and render the row
                  */}
                {orders
                  .filter((order) =>
                    order.cartItems.some(
                      (cartItem) => cartItem.product?.imageCover
                    )
                  )
                  .map((order, idx) => (
                    <tr
                      className="bg-white border-b border-gray-200 text-base font-normal"
                      key={order._id}
                    >
                      <td className="px-6 py-4">
                        <span>{idx + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span>{order.paymentMethodType}</span>
                      </td>

                      <td className="px-6 py-4">
                        {order.cartItems.map((cartItem) => (
                          <div
                            className="flex items-center space-x-2"
                            key={cartItem._id}
                          >
                            <img
                              src={cartItem.product.imageCover}
                              className="w-14 aspect-square"
                              alt={cartItem.product.title}
                            />
                            <span className="line-clamp-2 lg:line-clamp-1 w-40">
                              {cartItem.product.title}
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {order.cartItems
                          .filter((cartItem) => cartItem.product?.imageCover)
                          .map((cartItem) => (
                            <div
                              key={cartItem._id}
                              className="h-14 flex justify-center items-center"
                            >
                              <span>{cartItem.count}</span>
                            </div>
                          ))}
                      </td>

                      <td className="px-6 py-4">
                        <span className="me-2">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                          ,
                        </span>
                        <span>
                          {new Date(order.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-900">
                        ${order.totalOrderPrice}
                      </td>

                      <td className="px-6 py-4 text-gray-900">
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <section className="text-center">
          <h2 className="mt-10 md:mt-0 mb-10 font-medium text-4xl sm:text-6xl md:text-7xl dark:text-white">
            Your orders are Empty
          </h2>
          <p className="mb-8">
            <Link to="/products" className="text-secondary font-semibold me-2">
              Add products
            </Link>
            <span className="dark:text-white">to cart to make an order</span>
          </p>
        </section>
      )}
    </>
  );
}
