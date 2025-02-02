import Product from "../Product/Product";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Search from "../../Search/Search";
import { useEffect, useState } from "react";
// css module
// import style from "./RecentProducts.module.css";

export default function RecentProducts() {
  const [search, setSearch] = useState("");

  const getRecentProducts = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=20`
    );
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getRecentProducts,
    select: (products) => products.data.data,
  });
  // console.log(products,"recent products");

  const filteredProducts = products?.filter((product) =>
    search.toLowerCase() === ""
      ? product
      : product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        filteredProducts && (
          <>
            {filteredProducts.length > 0 ? (
              <>
              <section className="row mx-[-15px]">
                  {filteredProducts.map((product) => (
                    <Product
                      product={product}
                      key={product.id}
                      search={search}
                    />
                  ))}
                </section>
                <Link to="/products">
                  <button className="mx-auto block w-full md:w-1/3 lg:w-[30%] capitalize mt-2 rounded bg-secondary text-white px-12 py-4 font-medium hover:bg-opacity-90 transition-colors duration-500">
                    View All Products
                  </button>
                </Link>
              </>
            ) : (
              <section className="my-20 text-center flex justify-center items-center flex-col">
                <h2 className="font-medium text-xl sm:text-2xl text-secondary">
                  No Matched Products With This Name.
                </h2>
              </section>
            )}
          </>
        )
      )}
    </>
  );
}
