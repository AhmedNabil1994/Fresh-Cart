import { useState } from "react";
import ApiError from "../shared/ApiError/ApiError";
import Loader from "../shared/Loader/Loader";
import Product from "./Product/Product";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Search from "../Search/Search";
import useProducts from "../../hooks/useProducts";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Dropdown } from "flowbite-react";
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const itemsPerPage = 20;
  useScrollToTop();

  const getApiUrl = () => {
    let url = `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`;
    // if (sort) {
    //   url += `&sort=${sort}`;
    // }
    sort && (url += `&sort=${sort}`);
    return url;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts(getApiUrl(), "allProducts", sort, currentPage);
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

  const handleSort = (order) => {
    setSort(order);
  };

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
      <div className="flex flex-col lg:flex-row items-center justify-between gap-x-3 lg:gap-x-0">
        <Search search={search} setSearch={setSearch} />
        <div className="flex items-center gap-x-6 lg:gap-x-0 mb-4 lg:mb-0">
          <Dropdown
            label={
              <button
                className={`p-2 rounded-full transition bg-red-500 text-white -mt-[30px]`}
              >
                <IoFilter size={25} />
              </button>
            }
            className="bg-[#a19da2] rounded-lg shadow-sm p-2"
            arrowIcon={false}
            inline
          >
            <Dropdown.Item
              onClick={() => handleSort("-price")}
              icon={FaSortAmountDown}
              className="text-white hover:bg-transparent focus:bg-transparent"
            >
              High to Low
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSort("price")}
              icon={FaSortAmountUp}
              className="text-white hover:bg-transparent focus:bg-transparent"
            >
              Low to High
            </Dropdown.Item>
          </Dropdown>
          <p className="-mt-[30px] ms-2 font-medium text-lg text-black">
            Sort By
          </p>
        </div>
      </div>
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
