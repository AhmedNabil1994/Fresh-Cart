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
  const [allProducts, setAllProducts] = useState([]);

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

  useEffect(() => {
    if (products) setAllProducts(products);
  }, [products]);

  return (
    <>
      <Search allProducts={allProducts} setAllProducts={setAllProducts} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        allProducts && (
          <>
            <section className="row mx-[-15px]">
              {allProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </section>
            <Link to="/products">
              <button className="mx-auto block w-full md:w-1/3 lg:w-[30%] capitalize mt-2 rounded bg-secondary text-white px-12 py-4 font-medium hover:bg-opacity-90 transition-colors duration-500">
                View All Products
              </button>
            </Link>
          </>
        )
      )}
    </>
  );
}
