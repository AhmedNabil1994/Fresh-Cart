// css module
// import style from "./Products.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ApiError from "../shared/ApiError/ApiError";
import Loader from "../shared/Loader/Loader";
import Product from "./Product/Product";
import axios from "axios";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import { useState } from "react";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const getAllProducts = (page) => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`
    );
  };

  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getAllProducts(currentPage),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  });
  console.log(res);

  const totalPages = Math.ceil(res?.results / itemsPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <SectionHeader
        title="All Products"
        subtitle="Explore Our All Products"
        hasArrow
        handlePrev={prevPage}
        handleNext={nextPage}
        lastPage={totalPages}
        currentPage={currentPage}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        <>
          {res.data && (
            <section className="row mx-[-15px]">
              {res.data.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
}
