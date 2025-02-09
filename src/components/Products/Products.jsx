// css module
// import style from "./Products.module.css";

import ApiError from "../shared/ApiError/ApiError";
import Loader from "../shared/Loader/Loader";
import Product from "./Product/Product";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import { useEffect, useRef, useState } from "react";
import Search from "../Search/Search";
import useProducts from "../../hooks/useProducts";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 20;
  useScrollToTop();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts(
    `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`,
    "allProducts",
    currentPage
  );
  // console.log(products, "products res");

  const totalPages = Math.ceil(products?.results / itemsPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const filteredProducts = products?.data.filter((product) =>
    search.toLowerCase() === ""
      ? product
      : product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <MetaTags metaTitle="Products" />
      <SectionHeader
        title="All Products"
        subtitle="Explore Our All Products"
        hasArrow
        handlePrev={prevPage}
        handleNext={nextPage}
        lastPage={totalPages}
        currentPage={currentPage}
      />
      <Search search={search} setSearch={setSearch} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : (
        <>
          {filteredProducts && (
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
                </>
              ) : (
                <section className="my-20 text-center flex justify-center items-center flex-col">
                  <h2 className="font-medium text-xl sm:text-2xl text-secondary">
                    No Matched Products With This Name.
                  </h2>
                </section>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
