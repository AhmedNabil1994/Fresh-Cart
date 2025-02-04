import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Loader from "../shared/Loader/Loader";

// css module
// import style from "./Orders.module.css";

export default function Orders() {
  const { cart } = useContext(CartContext);
  console.log(cart?.data?.cartOwner, "owner id");

  const getAllUserOrders = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cart?.data?.cartOwner}`
      // `https://ecommerce.routemisr.com/api/v1/orders/user/67a25424518151d803bbc0bf`
    );
  };

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllUserOrders(),
    select: (orders) => orders.data,
  });
  console.log(orders, "orders");

  return (
    // <>
    //   <section className="flex justify-center items-center h-[30vh]">
    //     Orders
    //   </section>
    // </>

    <>
      {isLoading ? (
        <Loader />
      ) : (
        orders && (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center">
                <thead className="text-base capitalize">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-normal">
                      <span className="">Order Number</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-normal">
                      <span className="">Product</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-normal text-center"
                    >
                      <span className="">Order Qty</span>
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
                  {orders.map((order, idx) => (
                    <tr
                      className="bg-white border-b border-gray-200 text-base font-normal"
                      key={order._id}
                    >
                      <td className="px-6 py-4 ">
                        <span>{idx + 1}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        {/* <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        /> */}
                        {/* <span>{product.product.title}</span> */}
                        <span>sth</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span>
                          {order.cartItems.reduce(
                            (sum, item) => sum + item.count,
                            0
                          )}
                        </span>
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
                      <td className="px-6 py-4  text-gray-900 ">
                        ${order.totalOrderPrice}
                      </td>
                      <td className="px-6 py-4  text-gray-900 ">
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </>
  );
}
